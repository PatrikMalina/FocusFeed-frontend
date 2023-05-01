import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {User} from '../../util/interface';
import {API_URL} from '@env';
import {Avatar} from 'react-native-paper';
import {newFriends} from '../../services/AppService';
import {SafeAreaView} from 'react-native-safe-area-context';
import ActivityService from '../../services/ActivityService';
import store from '../../state/store';
import {FriendActionTypes} from '../../util/enums';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const CustomUser = ({user}: {user: User}) => {
  return (
    <View style={styles.item}>
      <Avatar.Image size={60} source={{uri: `${API_URL}/${user.pictureUrl}`}} />

      <View style={styles.status}>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </View>
  );
};

const CustomNewFriends = ({username}: {username: string}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    newFriends(username)
      .then(res => {
        if (res.data.data) setUsers(res.data.data);
      })
      .catch(e => {
        console.warn(e);
      });
  }, [username]);

  function SendRequest(user: User) {
    ActivityService.sendFriendRequest(user.id)
      .then(res => {
        if (res) {
          store.dispatch({
            type: FriendActionTypes.ADD_FRIENDS,
            payload: [res],
          });

          setUsers(users.filter(u => u.id !== user.id));
          Toast.show({
            type: 'success',
            text1: 'Friend Request was sent successfully!',
          });
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Friend Request could not be sent! Try again later!',
        });
      });
  }

  return (
    <View style={{width: '100%', height: '100%'}}>
      <SafeAreaView>
        <FlatList
          data={users}
          renderItem={({item}) => (
            <View style={{flexDirection: 'row', height: 60, marginBottom: 20}}>
              <TouchableOpacity
                style={{width: '100%'}}
                key={item.id}
                onPress={() =>
                  Alert.alert(
                    'Friend Request',
                    `Do you want to send a friend request to ${item.username}?`,
                    [
                      {
                        text: 'No',
                        onPress: () => null,
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => SendRequest(item),
                      },
                    ],
                    {cancelable: true},
                  )
                }>
                <CustomUser user={item} />
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </View>
  );
};

export default CustomNewFriends;

const styles = StyleSheet.create({
  status: {
    paddingLeft: '10%',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
  },

  username: {
    fontSize: 30,
    width: '50%',
  },

  item: {
    paddingHorizontal: 20,
    fontSize: 18,
    flexDirection: 'row',
  },
});

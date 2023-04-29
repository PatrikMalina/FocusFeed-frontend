import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {User} from '../../util/interface';
import {API_URL} from '@env';
import {Avatar} from 'react-native-paper';
import {newFriends} from '../../services/AppService';
import {SafeAreaView} from 'react-native-safe-area-context';
import ActivityService from '../../services/ActivityService';
import store from '../../state/store';
import {FriendActionTypes} from '../../util/enums';

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

function SendRequest(user: User) {
  ActivityService.sendFriendRequest(user.id)
    .then(res => {
      if (res) {
        store.dispatch({
          type: FriendActionTypes.ADD_FRIENDS,
          payload: [res],
        });
      }
    })
    .catch(() => {
      console.log('tost bad');
    });
}

const CustomNewFriends = ({username}: {username: string}) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    newFriends(username)
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(e => {
        console.warn(e);
      });
  }, [username]);

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
                onPress={() => SendRequest(item)}>
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

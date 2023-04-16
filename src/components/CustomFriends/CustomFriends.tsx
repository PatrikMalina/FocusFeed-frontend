import {Avatar} from 'react-native-paper';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {User} from '../../util/interface';
import {FriendshipStatus} from '../../util/enums';
import AppColors from '../../styling';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const currentUser = {
  id: 2,
  username: 'janedoe',
  picture_url: 'https://randomuser.me/api/portraits/women/2.jpg',
};

export interface Friend {
  id: number;
  sent_by: User;
  sent_to: User;
  updated_at: string;
  accepted: number;
}

interface FriendStatus {
  friend: Friend;
}

const CustomStatus = ({friend}: FriendStatus) => {
  const sentByMe = currentUser.id === friend.sent_by.id;

  return (
    <View style={{alignSelf: 'center', width: '26%'}}>
      {friend.accepted === FriendshipStatus.PENDING ? (
        <>
          {sentByMe ? (
            <Text style={[styles.text, {color: 'orange'}]}>PENDING</Text>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons.Button
                backgroundColor={AppColors.DEFAULT_BACKGROUND}
                name="check"
                size={30}
                color="green"
                onPress={() => console.log('accept')}
              />
              <MaterialIcons.Button
                backgroundColor={AppColors.DEFAULT_BACKGROUND}
                name="close"
                size={30}
                color="red"
                onPress={() => console.log('decline')}
              />
            </View>
          )}
        </>
      ) : (
        <Text
          style={[
            styles.text,
            {
              color:
                friend.accepted === FriendshipStatus.ACCEPTED ? 'green' : 'red',
            },
          ]}>
          {friend.accepted === FriendshipStatus.ACCEPTED
            ? 'ACCEPTED'
            : 'DECLINED'}
        </Text>
      )}
    </View>
  );
};

const CustomFriend = ({friend}: FriendStatus) => {
  const user =
    currentUser.id !== friend.sent_by.id ? friend.sent_by : friend.sent_to;

  return (
    <View style={styles.item}>
      <Avatar.Image size={60} source={{uri: user.picture_url}} />

      <View style={styles.status}>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </View>
  );
};

const CustomFriends = ({friends}: {friends: Friend[]}) => {
  return (
    <FlatList
      data={friends}
      renderItem={({item}) => (
        <View style={{flexDirection: 'row', height: 60, marginBottom: 20}}>
          <TouchableOpacity
            style={{width: '70%'}}
            key={item.id}
            onPress={() => console.log('clicked')}>
            <CustomFriend friend={item} />
          </TouchableOpacity>

          <CustomStatus friend={item} />
        </View>
      )}
    />
  );
};

export default CustomFriends;

const styles = StyleSheet.create({
  status: {
    paddingLeft: '10%',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
  },

  username: {
    fontSize: 20,
    width: '50%',
  },

  text: {
    fontSize: 20,
  },

  item: {
    paddingHorizontal: 20,
    fontSize: 18,
    flexDirection: 'row',
  },
});

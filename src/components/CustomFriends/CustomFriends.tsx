import {Avatar} from 'react-native-paper';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {User} from '../../util/interface';
import {FriendActionTypes, FriendshipStatus} from '../../util/enums';
import AppColors from '../../styling';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import store, {RootState} from '../../state/store';
import {API_URL} from '@env';
import {useSelector} from 'react-redux';
import ActivityService from '../../services/ActivityService';
export interface Friend {
  id: number;
  sentByUser: User;
  sentToUser: User;
  updatedAt: string;
  accepted: number;
}
interface FriendStatus {
  friend: Friend;
}

const CustomStatus = ({friend}: FriendStatus) => {
  const currentUser = useSelector((state: RootState) => state.user);
  const sentByMe = currentUser?.id === friend.sentByUser.id;

  const updateRequest = (status: FriendshipStatus) => {
    ActivityService.updateFriendRequest(friend.id, status).then(res => {
      store.dispatch({
        type: FriendActionTypes.UPDATE_FRIENDS,
        payload: [res],
      });
    });
  };

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
                onPress={() => updateRequest(FriendshipStatus.ACCEPTED)}
              />
              <MaterialIcons.Button
                backgroundColor={AppColors.DEFAULT_BACKGROUND}
                name="close"
                size={30}
                color="red"
                onPress={() => updateRequest(FriendshipStatus.DECLINED)}
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
  const currentUser = useSelector((state: RootState) => state.user);

  const user =
    currentUser?.id !== friend.sentByUser.id
      ? friend.sentByUser
      : friend.sentToUser;

  return (
    <View style={styles.item}>
      <Avatar.Image size={60} source={{uri: `${API_URL}/${user.pictureUrl}`}} />

      <View style={styles.status}>
        <Text style={styles.username}>{user.username}</Text>
      </View>
    </View>
  );
};

const CustomFriends = () => {
  const friends: Friend[] = useSelector((state: RootState) => state.friends);

  return (
    <FlatList
      data={friends}
      extraData={friends}
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

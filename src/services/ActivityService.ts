import Toast from 'react-native-toast-message';
import {Friend} from '../components/CustomFriends/CustomFriends';
import store from '../state/store';
import {FriendActionTypes, FriendshipStatus} from '../util/enums';
import {User} from '../util/interface';
import {SocketManager} from './SocketManager';

class ActivitySocketManager extends SocketManager {
  public subscribe(): void {
    this.socket.on('user:list', (onlineUsers: number) => {
      console.log('user list', onlineUsers);
    });

    this.socket.on('user:online', (user: User) => {
      console.log(user, 'online');
    });

    this.socket.on('user:offline', (user: User) => {
      console.log(user, 'offline');
    });

    this.socket.on('friendRequest', (friend: Friend) => {
      const currentUser = store.getState().user;

      if (friend.sentToUser.id !== currentUser?.id) return;

      store.dispatch({
        type: FriendActionTypes.ADD_FRIENDS,
        payload: [friend],
      });

      Toast.show({
        type: 'info',
        text1: `New friend request from ${friend.sentByUser.username}!`,
      });
    });

    this.socket.on('updateFriendRequest', (friend: Friend) => {
      const currentUser = store.getState().user;

      if (friend.sentByUser.id !== currentUser?.id) return;

      store.dispatch({
        type: FriendActionTypes.UPDATE_FRIENDS,
        payload: [friend],
      });

      Toast.show({
        type: 'info',
        text1: `${friend.sentToUser.username} has ${
          friend.accepted === FriendshipStatus.ACCEPTED
            ? 'ACCEPTED'
            : 'DECLINED'
        } your friend request!`,
      });
    });
  }

  public connectSocket() {
    this.socket.connect();
  }

  public disconnectSocket() {
    this.socket.disconnect();
  }

  public sendFriendRequest(userId: number): Promise<Friend> {
    return this.emitAsync('friendRequest', userId);
  }

  public updateFriendRequest(id: number, status: number): Promise<Friend> {
    return this.emitAsync('updateFriendRequest', id, status);
  }
}

export default new ActivitySocketManager('/');

import {Friend} from '../components/CustomFriends/CustomFriends';
import store from '../state/store';
import {FriendActionTypes} from '../util/enums';
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
}

export default new ActivitySocketManager('/');

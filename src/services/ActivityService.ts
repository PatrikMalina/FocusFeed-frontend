import Toast from 'react-native-toast-message';
import {Friend} from '../components/CustomFriends/CustomFriends';
import store from '../state/store';
import {
  ChatActionTypes,
  FriendActionTypes,
  FriendshipStatus,
  MessageActionTypes,
  OnlineActionTypes,
} from '../util/enums';
import {Chat, User} from '../util/interface';
import {SocketManager} from './SocketManager';
import ChatService from './ChatService';

class ActivitySocketManager extends SocketManager {
  public subscribe(): void {
    this.socket.on('user:list', (onlineUsers: number) => {
      store.dispatch({
        type: OnlineActionTypes.SET_LIST,
        payload: onlineUsers,
      });
    });

    this.socket.on('user:online', (user: User) => {
      store.dispatch({
        type: OnlineActionTypes.ONLINE,
        payload: [user.id],
      });
    });

    this.socket.on('user:offline', (user: User) => {
      store.dispatch({
        type: OnlineActionTypes.OFFLINE,
        payload: [user.id],
      });
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

    this.socket.on('createChat', (chat: Chat) => {
      const currentUser = store.getState().user;

      if (chat.user_2.id !== currentUser?.id) return;

      store.dispatch({
        type: ChatActionTypes.ADD_CHAT,
        payload: [chat],
      });

      store.dispatch({
        type: MessageActionTypes.SET_MESSAGES,
        payload: [],
        chatId: chat.id,
      });

      ChatService.join(chat.id);
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

  public createChat(userId: number): Promise<Chat> {
    return this.emitAsync('createChat', userId);
  }
}

export default new ActivitySocketManager('/');

import {API_URL} from '@env';
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
  }

  public connectSocket() {
    SocketManager.createManager(API_URL);
    this.socket.connect();
  }

  public disconnectSocket() {
    this.socket.disconnect();
  }
}

export default new ActivitySocketManager('/');

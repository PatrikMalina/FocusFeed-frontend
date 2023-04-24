import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Message} from '../util/interface';
import {SocketManager} from './SocketManager';
import store from '../state/store';
import {MessageActionTypes} from '../util/enums';

class ChatSocketManager extends SocketManager {
  public subscribe(): void {
    const chatId = Number(this.namespace.split('/').pop() as string);

    this.socket.on('message', (message: Message) => {
      store.dispatch({
        type: MessageActionTypes.ADD_MESSAGE,
        payload: [message],
        chatId: chatId,
      });
    });
  }

  public addMessage(message: string): Promise<Message> {
    return this.emitAsync('addMessage', message);
  }
}

class ChatService {
  private chats: Map<number, ChatSocketManager> = new Map();

  public join(chatId: number): ChatSocketManager {
    if (this.chats.has(chatId)) {
      throw new Error(`User is already in this chat!`);
    }

    // connect to given chat namespace
    const chat = new ChatSocketManager(`/chats/${chatId}`);
    this.chats.set(chatId, chat);
    chat.socket.connect();
    chat.subscribe();
    return chat;
  }

  public leave(chatId: number): boolean {
    const chat = this.chats.get(chatId);

    if (!chat) {
      return false;
    }

    // disconnect namespace and remove references to socket
    chat.destroy();
    return this.chats.delete(chatId);
  }

  public in(chatId: number): ChatSocketManager | undefined {
    return this.chats.get(chatId);
  }
}

export default new ChatService();

import {Message} from '../util/interface';
import {SocketManager} from './SocketManager';

// creating instance of this class automatically connects to given socket.io namespace
// subscribe is called with boot params, so you can use it to dispatch actions for socket events
// you have access to socket.io socket using this.socket
class ChatSocketManager extends SocketManager {
  public subscribe(): void {
    const chatId = Number(this.namespace.split('/').pop() as string);

    this.socket.on('message', (message: Message) => {
      console.log('new message', message);
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

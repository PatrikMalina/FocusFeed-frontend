import {Manager, Socket} from 'socket.io-client';
import store from '../state/store';
import {unauthorized} from '../state/action-creators';
import {DEBUG} from './Config';

export interface SocketManagerContract {
  namespace: string;
  readonly socket: Socket;
  subscribe(): void;
  destroy(): void;
}

export interface SocketManagerConstructorContract {
  new (namespace: string): SocketManagerContract;
  getManager(): Manager;
  createManager(uri: string): Manager;
  addInstance(instance: SocketManagerContract): void;
  destroyInstance(instance: SocketManagerContract): void;
}

export abstract class SocketManager implements SocketManagerContract {
  private static manager: Manager;
  private static instances: SocketManagerContract[] = [];
  private static namespaces: Set<string> = new Set();
  private static params: any | null = null;

  public static getManager() {
    if (!this.manager) {
      throw new Error(
        'Socket.io Manager not created. Please call "SocketManager.createManager(uri)".',
      );
    }

    return this.manager;
  }

  public static createManager(uri?: string): Manager {
    const manager = new Manager(uri, {autoConnect: false});
    this.manager = manager;
    return manager;
  }

  public static addInstance(instance: SocketManagerContract): void {
    if (this.namespaces.has(instance.namespace)) {
      throw new Error(
        `Duplicate socket manager created for namespace "${instance.namespace}".`,
      );
    }

    this.namespaces.add(instance.namespace);

    // if SocketManager has been already booted we can boot created instance
    if (this.params !== null) {
      this.bootInstance(instance);
    } else {
      this.instances.push(instance);
    }
  }

  public static destroyInstance(
    instance: SocketManagerContract & {$socket: Socket | null},
  ): void {
    this.instances = this.instances.filter(socket => socket !== instance);
    this.namespaces.delete(instance.namespace);
    // disconnect and clean socket
    instance.socket.disconnect();
    instance.socket.removeAllListeners();
    instance.$socket = null;
  }

  private static bootInstance(instance: SocketManagerContract): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    instance.subscribe();
    // connect socket - if it was not used in subscribe it will be created
    instance.socket.connect();
  }

  public static boot(): void {
    // call subscribe for already created instances and connect to socket
    this.instances.forEach(instance => this.bootInstance(instance));
    // clean instances
    this.instances = [];
  }

  private $socket: Socket | null = null;

  // lazily create socket
  public get socket(): Socket {
    if (!this.$socket) {
      this.$socket = this.socketWithAuth();
    }

    return this.$socket;
  }

  constructor(public namespace: string) {
    (this.constructor as SocketManagerConstructorContract).addInstance(this);
  }

  // this function returns socket.io socket for given namespace which handles auth token
  private socketWithAuth(): Socket {
    const io = (
      this.constructor as SocketManagerConstructorContract
    ).getManager();

    const socket = io.socket(this.namespace, {
      auth: {token: store.getState().session?.token},
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket.on('connect_error', (err: Error & {data?: any}) => {
      if (DEBUG) {
        console.error(
          `${this.namespace} [connect_error]`,
          err.message,
          err.data,
        );
      }

      if (err.data?.status === 401) {
        unauthorized();
      }
    });

    if (DEBUG) {
      socket.on('connect', () => {
        console.info(`${this.namespace} [connect]`);
      });

      socket.on('disconnect', reason => {
        console.info(`${this.namespace} [disconnect]`, reason);
      });

      socket.on('error', (err: Error) => {
        console.error(`${this.namespace} [error]`, err.message);
      });

      socket.onAny((event, ...args) => {
        console.info(`${this.namespace} [${event}]`, args);
      });
    }

    return socket;
  }

  /**
   * This can be used to emit server event and return promise resolved with server response
   * It is is intended to be used by child class methods
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected emitAsync<T>(event: string, ...args: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      this.socket.emit(event, ...args, (error: Error | null, response: T) => {
        error ? reject(error) : resolve(response);
      });
    });
  }

  public destroy(): void {
    (this.constructor as SocketManagerConstructorContract).destroyInstance(
      this,
    );
  }

  /*
   * This method should be overidden in child class to subscribe to this.socket events
   */
  public abstract subscribe(): void;
}

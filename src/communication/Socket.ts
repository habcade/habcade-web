import {
    HelloComposer,
    MessageHandler,
    OutgoingMessage,
    PingComposer,
} from './messages';

export class Socket {
    public static _instance: Socket;

    private _connection: WebSocket;
    private _messageHandler: MessageHandler;

    constructor() {
        this._messageHandler = new MessageHandler();
        Socket._instance = this;

        this._connection = new WebSocket('ws://localhost:1337');

        this._connection.onopen = this.onOpen.bind(this);
        this._connection.onmessage = this.onMessage.bind(this);
    }

    public static get Instance(): Socket {
        return this._instance || (this._instance = new Socket());
    }

    private onOpen() {
        this.send(new PingComposer());
        this.send(
            new HelloComposer(
                new URLSearchParams(window.location.search).get('apikey') ||
                    null,
                new URLSearchParams(window.location.search).get('uuid') || null,
                new URLSearchParams(window.location.search).get('look') || null
            )
        );
    }

    private onMessage(message: MessageEvent): void {
        this._messageHandler.handleMessage(message);
    }

    public send(msg: OutgoingMessage): void {
        this._connection.send(this._messageHandler.buildMessage(msg));
    }

    public get connection(): WebSocket {
        return this._connection;
    }

    public get messageHandler(): MessageHandler {
        return this._messageHandler;
    }
}

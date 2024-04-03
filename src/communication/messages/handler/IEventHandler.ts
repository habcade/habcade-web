import { IncomingMessage } from '../incoming/IncomingMessage';

export type EventCallback = (evt: IncomingMessage) => void;
export interface IEventHandler {
    callback: EventCallback;
    eventName: string;
}

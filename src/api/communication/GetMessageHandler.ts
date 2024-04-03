import { MessageHandler } from '../../communication';
import { GetSocket } from './GetSocket';

export const GetMessageHandler = (): MessageHandler => {
    return GetSocket().messageHandler;
};

import { Outgoing } from '../Outgoing';
import { OutgoingMessage } from '../OutgoingMessage';

export class PingComposer extends OutgoingMessage {
    constructor() {
        super(Outgoing.PING);
    }
}

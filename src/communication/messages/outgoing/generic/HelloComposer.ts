import { Outgoing } from '../Outgoing';
import { OutgoingMessage } from '../OutgoingMessage';

export class HelloComposer extends OutgoingMessage {
    constructor(key: string, uuid: string, look: string) {
        super(Outgoing.HELLO);

        this.data['key'] = key;
        this.data['uuid'] = uuid;
        this.data['look'] = look;
    }
}

export class OutgoingMessage {
    public header: string = 'laynewuzhere';
    public data: {} = {};

    constructor(header: string) {
        this.header = header;
    }
}

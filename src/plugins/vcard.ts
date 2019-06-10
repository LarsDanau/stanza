import { Agent } from '../';
import { NS_VCARD_TEMP } from '../protocol';
import { IQ, VCardTemp } from '../protocol';

declare module '../' {
    export interface Agent {
        getVCard(jid: string): Promise<IQ>;
        publishVCard(vcard: VCardTemp): Promise<IQ>;
    }
}

export default function(client: Agent) {
    client.getVCard = (jid: string) => {
        return client.sendIQ({
            to: jid,
            type: 'get',
            vcard: {
                format: NS_VCARD_TEMP
            }
        });
    };

    client.publishVCard = (vcard: VCardTemp) => {
        return client.sendIQ({
            type: 'set',
            vcard
        });
    };
}
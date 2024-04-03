import { useEffect } from 'react';
import { GetMessageHandler } from '../../api';
import { EventCallback } from '../../communication';

export const useMessage = (eventName: string, handler: EventCallback) => {
    useEffect(() => {
        GetMessageHandler().registerEvent(eventName, handler);

        return () => GetMessageHandler().removeEvent(eventName, handler);
    }, [eventName, handler]);
};

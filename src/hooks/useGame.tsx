import { useState } from "react";
import { useBetween } from "use-between";
import { ClientConfigEvent, Incoming } from "../communication";
import { HGame } from "../gameList";
import { useMessage } from "./communication";

const GameState = () => {
    const [currentGame, setCurrentGame] = useState<HGame>(null);
    const [ready, setReady] = useState<boolean>(false);
    const [imager, setImager] = useState<string>(
        "https://habbo-imaging.nitrodev.co/?figure="
    );
    const [look, setLook] = useState<string>(
        new URLSearchParams(window.location.search).get("look") || null
    );

    useMessage(Incoming.CLIENT_CONFIG, (evt: ClientConfigEvent) => {
        setImager(evt.imager);
    });

    return { currentGame, setCurrentGame, ready, setReady, imager, look };
};

export const useGame = () => useBetween(GameState);

import { useState } from "react";
import { useBetween } from "use-between";
import { HGame } from "../gameList";

const GameState = () => {
    const [currentGame, setCurrentGame] = useState<HGame>(null);

    return { currentGame, setCurrentGame };
};

export const useGame = () => useBetween(GameState);

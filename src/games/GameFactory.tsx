import { HGameKeys } from "../gameList";
import { useGame } from "../hooks";
import { LanesterView } from "./Lanester/LanesterView";

export const GameFactory = () => {
    const { currentGame, setCurrentGame } = useGame();

    switch (currentGame.key) {
        case HGameKeys.LANESTER:
            return <LanesterView />;
    }
};

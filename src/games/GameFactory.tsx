import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { HGameKeys } from "../gameList";
import { LanesterView } from "./Lanester/LanesterView";
import { useGame } from "../hooks";
import { IGameProps } from "./GameStage";

export const GameFactory = (props: IGameProps) => {
    const { currentGame, setCurrentGame } = useGame();

    switch (currentGame.key) {
        case HGameKeys.LANESTER:
            return <LanesterView {...props} />;
    }
};

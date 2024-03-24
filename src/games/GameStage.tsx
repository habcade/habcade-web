import {
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useGame } from "../hooks";
import { HGameKeys } from "../gameList";
import { LanesterView } from "./Lanester/LanesterView";
import { GameFactory } from "./GameFactory";

export const GameStage = () => {
    const { currentGame, setCurrentGame } = useGame();

    const meplz = useRef<HTMLDivElement>();
    const [height, setHeight] = useState<number>(10);
    const [ready, setReady] = useState<boolean>(false);

    useEffect(() => {
        if (!meplz || (meplz && !meplz.current)) return;
        setHeight(meplz.current.scrollHeight);
    }, [meplz]);

    return (
        <div className="flex flex-col game-stage h-full">
            <div className="border-b border-black border-t top-bar p-2 text-center">
                <div
                    className="back-btn"
                    onClick={() => setCurrentGame(null)}
                />
                <div className="text-lg">{currentGame.name || "test"}</div>
            </div>
            <div
                className="w-full h-full overflow-hidden"
                id="game-stage"
                ref={meplz}
            >
                <GameFactory
                    height={height}
                    ready={ready}
                    setReady={setReady}
                />
            </div>
        </div>
    );
};

export interface IGameProps {
    height: number;
    ready: boolean;
    setReady: Dispatch<SetStateAction<boolean>>;
}

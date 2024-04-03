import { useEffect, useRef, useState } from "react";
import { LoadingScreen } from "../habcade/LoadingScreen";
import { Logos } from "../habcade/Logo";
import { useGame } from "../hooks";
import { GameFactory } from "./GameFactory";

export const GameStage = () => {
    const { currentGame, setCurrentGame, ready, setReady } = useGame();

    const meplz = useRef<HTMLDivElement>();
    const [height, setHeight] = useState<number>(10);

    useEffect(() => {
        if (!meplz || (meplz && !meplz.current)) return;
        setHeight(meplz.current.scrollHeight);
    }, [meplz]);

    return (
        <div className="flex flex-col game-stage h-full overflow-hidden">
            <div className="border-b border-black border-t top-bar p-2 text-center z-20">
                <div
                    className="back-btn"
                    onClick={() => setCurrentGame(null)}
                />
                <div className="text-lg">{currentGame.name || "test"}</div>
            </div>
            <div
                className="w-full h-full overflow-hidden relative"
                id="game-stage"
                ref={meplz}
            >
                <GameFactory />
                <LoadingScreen ready={ready} logo={Logos.hcAnimated} />
            </div>
        </div>
    );
};

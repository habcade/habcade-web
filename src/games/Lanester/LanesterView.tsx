import { Container, Stage } from "@pixi/react";
import { Fragment, useEffect } from "react";
import { GetSounds } from "../../api";
import { useGame } from "../../hooks";
import { LSActionBubble } from "./LSActionBubble";
import { LSAvatar } from "./LSAvatar";
import { LSEnemyFactory } from "./LSEnemyFactory";
import { LSGrass } from "./LSGrass";
import { LSPaused } from "./LSPaused";
import { LSRoad } from "./LSRoad";
import { LSUI } from "./LSUI";
import { useLanester } from "./useLanester";

const MAX_LANE = 3;
const MIN_LANE = 0;
export const LanesterView = () => {
    const {
        enemies,
        resetGame,
        unloadGame,
        setPressed,
        lane,
        setLane,
        loadAssets,
        setDirOffset,
        action,
        pressed,
        running,
        speed,
        started,
        setStarted,
        setRunning,
    } = useLanester();

    const { ready } = useGame();

    useEffect(() => {
        loadAssets();
        return () => {
            unloadGame();
        };
    }, []);

    useEffect(() => {
        if (!running && pressed[" "]) {
            if (started) resetGame();
            else {
                setStarted(true);
                setRunning(true);
            }
        }
        if (!running) return;
        let newLane = lane;

        if (pressed["ArrowLeft"]) newLane -= 1;
        if (pressed["ArrowRight"]) newLane += 1;
        if (pressed["ArrowDown"] && speed > 0) GetSounds().playAudio("ls-move");

        if (newLane >= MAX_LANE) newLane = MAX_LANE;
        if (newLane <= MIN_LANE) newLane = MIN_LANE;

        if (newLane !== lane) {
            GetSounds().playAudio("ls-move", 0.5);
            if (lane < newLane) setDirOffset(2);
            if (lane > newLane) setDirOffset(0);
        }

        setLane(newLane);
    }, [pressed]);

    useEffect(() => {
        const keyDown = (event: KeyboardEvent) => {
            const key = event.key;

            setPressed((prev) => ({
                ...prev,
                [key]: true,
            }));
        };

        const keyUp = (event: KeyboardEvent) => {
            const key = event.key;

            setPressed((prev) => ({
                ...prev,
                [key]: false,
            }));
        };

        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);

        return () => {
            document.removeEventListener("keydown", keyDown);
            document.removeEventListener("keyUp", keyUp);
        };
    }, []);

    useEffect(() => {
        if (ready) GetSounds().playAudio("ls-loop", 0);
    }, [ready]);

    if (!ready) return null;

    return (
        <>
            <Stage
                height={document.getElementById("game-stage").clientHeight}
                width={document.getElementById("game-stage").clientWidth}
                options={{
                    antialias: true,
                }}
            >
                <LSEnemyFactory />
                <LSGrass />
                <Container
                    width={268}
                    x={
                        (document.getElementById("game-stage").clientWidth -
                            268) /
                        2
                    }
                    sortableChildren={true}
                >
                    <LSRoad />
                    <LSAvatar />
                    {enemies &&
                        enemies.map((val, i) => (
                            <Fragment key={val.index}>{val.element}</Fragment>
                        ))}
                    {action && <LSActionBubble />}
                </Container>
                <LSPaused />
            </Stage>
            <LSUI />
        </>
    );
};

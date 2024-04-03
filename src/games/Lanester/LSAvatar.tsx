import { useApp, useTick } from "@pixi/react";
import { Container, Sprite } from "@pixi/react-animated";
import { Texture } from "pixi.js";
import { useEffect, useMemo, useState } from "react";
import { Spring } from "react-spring";
import { GetSounds } from "../../api";
import { useInterval } from "../../hooks";
import { GameConstants } from "../GameConstants";
import { useLanester } from "./useLanester";

const MAX_SPEED = 11;
export const LSAvatar = () => {
    const {
        speed,
        setSpeed,
        pressed,
        lane,
        setDistance,
        dirOffset,
        playerCollision,
        running,
        setAction,
        avatarSprites,
    } = useLanester();
    const app = useApp();

    const [offsetX, setOffsetX] = useState<number>(-4);
    const [offsetY, setOffsetY] = useState<number>(0);

    useEffect(() => {
        setOffsetY(app.screen.bottom - GameConstants.AVATAR_HEIGHT - 81);
    }, [app]);

    useInterval(() => {
        if (running) setOffsetX((prev) => (prev > 0 ? -prev : Math.abs(prev)));
    }, 500);

    useTick(() => {
        if (!running) return;

        if (pressed["ArrowUp"]) {
            setSpeed((prev) => Math.min(prev + 0.02, MAX_SPEED));
        } else
            setSpeed((prev) =>
                Math.max(0, prev - (pressed["ArrowDown"] ? 0.07 : 0.02))
            );

        if (speed > 0) setDistance((prev) => prev + 0.01 * speed);
        if (pressed["ArrowDown"] && speed > 0) setAction("skrrt");
        else {
            setAction(null);
        }

        GetSounds().setVolume("ls-loop", (speed + 2) / 13);
    });

    const direction = useMemo(() => {
        if (dirOffset) return dirOffset;
        return 1;
    }, [dirOffset]);

    return (
        <>
            <Sprite
                texture={Texture.WHITE}
                width={49}
                height={42}
                x={8 + GameConstants.AVATAR_WIDTH * lane + 5}
                y={68 + offsetY}
                alpha={0}
                ref={playerCollision}
            />
            <Spring
                from={{
                    x: 0,
                    y: offsetY,
                }}
                to={{
                    x:
                        (running ? offsetX : 0) +
                        GameConstants.AVATAR_WIDTH * lane +
                        5,
                    y: offsetY,
                }}
            >
                {(props) => (
                    <Container
                        zIndex={GameConstants.AVATAR_HEIGHT + offsetY}
                        {...props}
                    >
                        <Sprite texture={avatarSprites[dirOffset]} />
                    </Container>
                )}
            </Spring>
        </>
    );
};

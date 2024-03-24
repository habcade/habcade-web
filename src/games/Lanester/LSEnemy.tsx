import { useApp, useTick } from "@pixi/react";
import { Container, Sprite } from "@pixi/react-animated";
import { Texture } from 'pixi.js';
import { useEffect, useMemo, useRef, useState } from "react";
import { Spring } from "react-spring";
import { useInterval } from "../../hooks";
import { GameConstants } from "../GameConstants";
import { useLanester } from "./useLanester";

export const LSEnemy = (props: { index: number }) => {
    const { index = 0 } = props;
    const app = useApp();
    const { running, speed = 0, deleteEnemy, checkCollision, crash } = useLanester();
    const [offsetX, setOffsetX] = useState<number>(-2);
    const [offsetY, setOffsetY] = useState<number>(0);
    const myspeed = 3;
    const num = useMemo(() => Math.floor(Math.random() * 4) + 1, []);
    const lane = useMemo(() => Math.floor(Math.random() * 4), []);

    const ref = useRef()

    useEffect(() => {
        setOffsetY(-GameConstants.AVATAR_HEIGHT);
    }, [app]);

    useTick(() =>
    {
        if (!running) return;

        setOffsetY((prev) => prev + (speed - myspeed));

        if (!ref || ref && !ref.current) return;

        if (checkCollision(ref?.current)) crash()
    });

    useInterval(() => {
        setOffsetX((prev) => (prev > 0 ? -prev : Math.abs(prev)));
    }, 500);

    useEffect(() => {
        if (offsetY >= app.screen.bottom + GameConstants.AVATAR_HEIGHT)
            deleteEnemy(index);
    }, [offsetY]);

    return (
        <Spring
            from={{
                x: GameConstants.AVATAR_WIDTH * lane + 5,
            }}
            to={{
                x: (running ? offsetX : 0) + GameConstants.AVATAR_WIDTH * lane + 5,
            }}
        >
            {(props) => (
                <Container y={offsetY} zIndex={GameConstants.AVATAR_HEIGHT + offsetY} {...props}>
                    <Sprite image={`ls-n${num}`} />
                    <Sprite texture={Texture.WHITE} width={45} height={35} x={11} y={66} alpha={0} ref={ ref } />
                </Container>
            )}
        </Spring>
    );
};

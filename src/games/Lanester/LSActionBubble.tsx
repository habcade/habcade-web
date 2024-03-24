import { Container, useApp } from '@pixi/react';
import { Sprite } from "@pixi/react-animated";
import { Assets } from "pixi.js";
import { useEffect, useState } from 'react';
import { Spring } from "react-spring";
import { GameConstants } from '../GameConstants';
import { useLanester } from './useLanester';

export const LSActionBubble = () =>
{
    const app = useApp();
    const { action, lane } = useLanester();

    const [offsetX, setOffsetX] = useState<number>(-4);
    const [offsetY, setOffsetY] = useState<number>(0);

    useEffect(() => {
        setOffsetY(app.screen.bottom - GameConstants.AVATAR_HEIGHT - 81);
    }, [app]);

    if (!action) return null;

    return (
        <Container y={offsetY} x={ GameConstants.AVATAR_WIDTH * lane } zIndex={99999999}>
            <Spring
                from={{
                    y: 81,
                }}
                to={{
                    y: action == 'skrrt' ? 61 : 0,
                }}
                config={{ mass: 2, tension: 3000, friction: 50 }}
            >
                {(props) => (
                    <Sprite
                        x={-40}
                        texture={Assets.get("ls-" + action)}
                        {...props}
                    />
                )}
            </Spring>
        </Container>
    );
};

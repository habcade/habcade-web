import { TilingSprite, useApp, useTick } from "@pixi/react";
import { Assets } from "pixi.js";
import { useEffect, useState } from "react";
import { useLanester } from "./useLanester";

export const LSGrass = () => {
    const { speed = 0 } = useLanester();
    const app = useApp();

    const [y, setY] = useState<number>(0);

    useEffect(() => {
        app.ticker.maxFPS = 60;
    }, []);

    useTick(() => {
        setY((prev) => prev + speed);
    });

    return (
        <>
            <TilingSprite
                tilePosition={{ x: 0, y: y }}
                texture={Assets.get("ls-grass")}
                height={app.screen.height}
                width={app.screen.width}
            />
        </>
    );
};

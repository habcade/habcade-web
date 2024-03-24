import { TilingSprite, useApp, useTick } from "@pixi/react";
import { Assets } from "pixi.js";
import { useEffect, useState } from "react";
import { useLanester } from "./useLanester";

export const LSRoad = () => {
    const { speed = 0 } = useLanester();
    const app = useApp();

    const [y, setY] = useState<number>(0);

    useTick(() => {
        setY((prev) => prev + speed);
    });

    return (
        <>
            <TilingSprite
                tilePosition={{ x: 0, y: y }}
                texture={Assets.get("ls-road")}
                height={app.screen.height}
                width={268}
                zIndex={0}
            />
        </>
    );
};

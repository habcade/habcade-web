import { useTick } from "@pixi/react";
import { useState } from "react";
import { LSEnemy } from "./LSEnemy";
import { useLanester } from "./useLanester";

let ind = 0;
export const LSEnemyFactory = () => {
    const {
        running = false,
        pressed = {},
        setEnemies = null,
        speed = 0,
    } = useLanester();
    const [ticks, setTicks] = useState<number>(0);

    useTick(() => {
        setTicks((prev) => {
            let newp = prev + 1;

            if (
                newp ==
                    (speed > 4
                        ? 120 - Math.floor(speed * (0.8 * speed))
                        : 120) &&
                pressed["ArrowUp"]
            ) {
                if (running && speed > 0) {
                    setEnemies((prev) => {
                        ind++;
                        const newEnemies = [
                            ...prev,
                            { index: ind, element: <LSEnemy index={ind} /> },
                        ];
                        return newEnemies;
                    });
                }
                return 0;
            }

            if (newp >= 120) return 0;
            return newp;
        });
    });

    return null;
};

import { Sprite } from "@pixi/react-animated";
import { Texture } from "pixi.js";
import { Spring } from "react-spring";
import { useLanester } from "./useLanester";

export const LSPaused = () => {
    const { started, running } = useLanester();
    return (
        <Spring
            from={{
                alpha: 0.5,
            }}
            to={{
                alpha: !started || (!running && started) ? 0.5 : 0,
            }}
        >
            {(props) => (
                <Sprite
                    height={document.getElementById("game-stage").clientHeight}
                    width={document.getElementById("game-stage").clientWidth}
                    texture={Texture.WHITE}
                    tint={"#000"}
                    {...props}
                />
            )}
        </Spring>
    );
};

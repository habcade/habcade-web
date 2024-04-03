import { Assets, Sprite, Texture } from "pixi.js";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useBetween } from "use-between";
import { GetSounds } from "../../api";
import { useGame } from "../../hooks";
import { LoadAvatar } from "../../utils";

const lanesterState = () => {
    const { setReady, imager, look } = useGame();
    const [speed, setSpeed] = useState<number>(0);
    const [pressed, setPressed] = useState<{}>({});
    const [running, setRunning] = useState<boolean>(false);
    const [enemies, setEnemies] = useState<
        {
            index: number;
            element: ReactNode;
        }[]
    >([]);
    const [lane, setLane] = useState<number>(0);
    const [distance, setDistance] = useState<number>(0);
    const [dirOffset, setDirOffset] = useState<number>(-1);
    const [action, setAction] = useState<string>(null);
    const [totaled, setTotaled] = useState<number>(0);
    const [started, setStarted] = useState<boolean>(false);
    const [avatarSprites, setAvatarSprites] = useState<Texture[]>([]);

    const playerCollision = useRef<Sprite>();

    const loadAssets = async () => {
        Assets.add({ alias: "ls-grass", src: "./games/lanester/grass.png" });
        Assets.add({ alias: "ls-road", src: "./games/lanester/road.png" });
        Assets.add({ alias: "ls-n1", src: "./games/lanester/noob1.png" });
        Assets.add({ alias: "ls-n2", src: "./games/lanester/noob2.png" });
        Assets.add({ alias: "ls-n3", src: "./games/lanester/noob3.png" });
        Assets.add({ alias: "ls-n4", src: "./games/lanester/noob4.png" });
        Assets.add({ alias: "ls-skrrt", src: "./games/lanester/skrrt.png" });
        Assets.add({ alias: "ls-crash", src: "./games/lanester/crash.png" });

        await Assets.load([
            "ls-grass",
            "ls-road",
            "ls-n1",
            "ls-n2",
            "ls-n3",
            "ls-n4",
            "ls-skrrt",
            "ls-crash",
        ]);

        await GetSounds().loadAudios([
            { key: "ls-crash", url: "./games/lanester/crash.mp3" },
            { key: "ls-move", url: "./games/lanester/move.mp3" },
            { key: "ls-loop", url: "./games/lanester/loop.mp3", loop: true },
        ]);

        const url = `${imager}${look}&effect=69`;

        const left = await LoadAvatar(`${url}&direction=6`);
        const middle = await LoadAvatar(`${url}&direction=7`);
        const right = await LoadAvatar(`${url}&direction=8`);

        setAvatarSprites([left, middle, right]);

        setReady(true);
    };

    const deleteEnemy = (enemy: number) => {
        setEnemies((prev) => {
            let newPrev = prev;

            const index = newPrev.findIndex((value) => enemy === value.index);

            if (index >= 0) newPrev.splice(index, 1);

            return newPrev;
        });

        setTotaled((prev) => prev + 1);
    };

    const resetGame = () => {
        setEnemies(() => {
            setPressed({});
            setAction(null);
            setRunning(true);
            setSpeed(0);
            setDistance(0);
            setTotaled(0);
            return [];
        });
    };

    const unloadGame = () => {
        resetGame();
        setStarted(false);
        setReady(false);
        setRunning(false);
        Assets.reset();
        GetSounds().unloadAudios(["ls-crash", "ls-move", "ls-loop"]);
    };

    useEffect(() => {
        if (dirOffset == 1) return;

        setTimeout(() => {
            setDirOffset(1);
        }, 300);
    }, [dirOffset]);

    const checkCollision = (obj: Sprite): boolean => {
        if (
            !playerCollision ||
            (playerCollision && !playerCollision.current) ||
            !running
        )
            return false;

        const bounds1 = obj.getBounds();
        const bounds2 = playerCollision.current.getBounds();

        return (
            bounds1.x < bounds2.x + bounds2.width &&
            bounds1.x + bounds1.width > bounds2.x &&
            bounds1.y < bounds2.y + bounds2.height &&
            bounds1.y + bounds1.height > bounds2.y
        );
    };

    const crash = () => {
        setRunning(false);
        setSpeed(0);
        setAction("crash");
        GetSounds().playAudio("ls-crash");
        GetSounds().setVolume("ls-loop", 0.1);
    };

    return {
        loadAssets,
        speed,
        setSpeed,
        pressed,
        setPressed,
        running,
        setRunning,
        enemies,
        setEnemies,
        lane,
        setLane,
        deleteEnemy,
        distance,
        setDistance,
        resetGame,
        unloadGame,
        dirOffset,
        setDirOffset,
        playerCollision,
        checkCollision,
        crash,
        action,
        setAction,
        totaled,
        started,
        setStarted,
        avatarSprites,
    };
};

export const useLanester = () => useBetween(lanesterState);

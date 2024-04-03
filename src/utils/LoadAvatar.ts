import { Texture } from 'pixi.js';

export const LoadAvatar = async (url: string) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.src = url;

    await new Promise((resolve) => {
        img.onload = () => {
            resolve(img);
        };
    });

    return Texture.from(img);
};

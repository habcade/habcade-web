import { Howl } from "howler";

interface Sound {
    key: string;
    sound: Howl;
}

export class SoundManager
{
    public static _instance: SoundManager;
    private sounds: Sound[];

    constructor()
    {
        SoundManager._instance = this;
        this.sounds = [];
    }

    public static get Instance() {
        return this._instance || (this._instance = new SoundManager());
    }

    public async loadAudio(key: string, url: string, loop: boolean = false): Promise<void> {
        if (this.getSound(key)) return;

        const sound = new Howl({
            src: url,
            loop: loop
        });

        await new Promise<void>((resolve) => {
            sound.once("load", () => {
                this.sounds.push({ key, sound });
                resolve();
            });
        });
    }

    public async loadAudios(array: { key: string; url: string, loop?: boolean }[]): Promise<void> {
        await Promise.all(
            array.map(async (val) => {
                await this.loadAudio(val.key, val.url, val?.loop);
            })
        );
    }

    public playAudio(key: string, volume: number = 1): void {
        const soundObj = this.getSound(key);
        if (soundObj)
        {
            soundObj.sound.volume(volume)
            soundObj.sound.play();
        }
    }

    public getSound(key: string): Sound | undefined {
        return this.sounds.find((val) => val.key === key);
    }

    public unloadAudio(key: string): void {
        const soundObj = this.getSound(key);

        if (soundObj) {
            soundObj.sound.unload();
            soundObj.sound.stop();
            this.sounds = this.sounds.filter((val) => val.key !== key);
        }
    }

    public setVolume(key: string, volume: number)
    { 
        const soundObj = this.getSound(key);

        if (soundObj) soundObj.sound.volume(volume)
    }

    public unloadAudios(arr: string[]): void {
        arr.forEach(val => this.unloadAudio(val))
    }
}

import { SoundManager } from '../utils';

export const GetSounds = (): SoundManager =>
{ 
    return SoundManager.Instance;
}

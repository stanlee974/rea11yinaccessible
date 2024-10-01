import {get, writable, type Writable} from "svelte/store";
import {base} from "$app/paths";
import {headerStore} from "../HeaderStore";


export const audioStore: Writable<HTMLAudioElement> = writable();

export const changeSource = async(src: string) => {
  let audio = get(audioStore);
  if (audio) {
    await adjustVolume( 0)
    audio.src = base + src
    audio.autoplay = false
    audio.load()
    audio.volume = get(headerStore).songVolume / 100
    audioStore.set(audio)
  } else {
    let audio = new Audio(base + src);
    audio.loop = true
    audio.autoplay = false
    audio.muted = false
    audioStore.set(audio)
  }
}
export function adjustVolume(
  newVolume: number,
  {
    duration = 1000,
    easing = swing,
    interval = 13,
  }: {
    duration?: number,
    easing?: typeof swing,
    interval?: number,
  } = {},
): Promise<void> {
  let htmlAudioElement = get(audioStore);
  if (htmlAudioElement) {
    const originalVolume = htmlAudioElement.volume;
    const delta = newVolume - originalVolume;

    if (!delta || !duration || !easing || !interval) {
      htmlAudioElement.volume = newVolume;
      return Promise.resolve();
    }

    const ticks = Math.floor(duration / interval);
    let tick = 1;

    return new Promise(resolve => {
      const timer = setInterval(() => {
        htmlAudioElement.volume = originalVolume + (
            easing(tick / ticks) * delta
        );

        if (++tick === ticks + 1) {
          clearInterval(timer);
          htmlAudioElement.currentTime = 0;
          htmlAudioElement.pause()
          resolve();
        }
      }, interval);
    });
  }
  return Promise.resolve()
}

export function changeVolume(
    newVolume: number
) {
  let htmlAudioElement = get(audioStore);
  if (htmlAudioElement) {
    htmlAudioElement.volume = newVolume
  }
}

function swing(p: number) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}

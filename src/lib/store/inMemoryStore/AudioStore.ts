import { get, writable, type Writable } from "svelte/store";
import { base } from "$app/paths";
import { getVolume } from "$lib/store/VolumeStore";


export const audioStore: Writable<HTMLAudioElement> = writable();

export const changeSource = async(src: string) => {
  let audio = get(audioStore);
  if (audio) {
    await adjustVolume(audio, 0)
    audio.src = base + src
    audio.autoplay = true
    audio.load()
    audio.volume = getVolume()
  } else {
    let audio = new Audio(base + src);
    audio.loop = true
    audio.autoplay = true
    audio.muted = false
    audioStore.set(audio)
  }
}
function adjustVolume(
  element: HTMLMediaElement,
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
  const originalVolume = element.volume;
  const delta = newVolume - originalVolume;

  if (!delta || !duration || !easing || !interval) {
    element.volume = newVolume;
    return Promise.resolve();
  }

  const ticks = Math.floor(duration / interval);
  let tick = 1;

  return new Promise(resolve => {
    const timer = setInterval(() => {
      element.volume = originalVolume + (
        easing(tick / ticks) * delta
      );

      if (++tick === ticks + 1) {
        clearInterval(timer);
        element.currentTime = 0;
        resolve();
      }
    }, interval);
  });
}

function swing(p: number) {
  return 0.5 - Math.cos(p * Math.PI) / 2;
}

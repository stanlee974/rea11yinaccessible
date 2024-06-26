{#if !audio}
    <div style="text-indent: -9999px;"> bind:this={audio}</div>
{/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { getVolume } from "$lib/store/VolumeStore";

  let audio: HTMLAudioElement;
  export let src: string = ""
  export let fadeOutVolume: number = 0
  export let onpause: Function | undefined = undefined
  export let pause: boolean = false
  export let autoplay: boolean = false
  export let play: boolean = false

  onMount(() => {
    audio = new Audio(base + src)
    audio.loop = true
    audio.autoplay = autoplay
    const interval = setInterval(() => {
      audio.volume = getVolume()
      if (play && !autoplay) {
        audio.play()
      }
      if (pause) {
        adjustVolume(audio, fadeOutVolume)
        if (onpause) {
          onpause();
        }
        clearInterval(interval)
      }
    }, 100)
  })

  async function adjustVolume(
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
          element.pause()
          element.currentTime = 0;
          resolve();
        }
      }, interval);
    });
  }

  function swing(p: number) {
    return 0.5 - Math.cos(p * Math.PI) / 2;
  }
</script>


{#if !audio}
    <div style="text-indent: -9999px;"> bind:this={audio}</div>
{/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { base } from "$app/paths";
  import { onDestroy, onMount } from "svelte";
  import { getVolume } from "$lib/store/SoundVolumeStore";

  let audio: HTMLAudioElement;
  export let src: string = ""
  export let play: Function | undefined = undefined
  export let loop: boolean = false
  let interval: number;
  onMount(() => {
    audio = new Audio(base + src)
    audio.loop = loop
    interval = setInterval(() => {
      audio.volume = getVolume()
      if (play) {
        audio.play()
        play()
      }
    }, 1000)
  })

  onDestroy(() => clearInterval(interval))
</script>


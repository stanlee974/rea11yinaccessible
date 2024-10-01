<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { base } from "$app/paths";
  import { onDestroy, onMount } from "svelte";
  import {headerStore} from "../store/HeaderStore";

  let audio: HTMLAudioElement;
  export let src: string = ""
  export let postPlay: Function | undefined = undefined
  let interval: number;
  onMount(() => {
    audio = new Audio(base + src)
    audio.loop = false
    interval = setInterval(() => {
      audio.volume = $headerStore.soundVolume / 100
      if (postPlay) {
        audio.play()
        postPlay()
      } else {
        audio.pause()
      }
    }, 1200)
  })

  onDestroy(() => {
    if (audio) {
      audio.pause()
    }
    clearInterval(interval)})
</script>
{#if !audio}
    <div style="text-indent: -9999px;" aria-hidden={true} > bind:this={audio}</div>
{/if}

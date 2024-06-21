<div style="text-indent: -9999px;"> bind:this={audio}</div>

<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { base } from "$app/paths";
  import { onMount } from "svelte";

  let audio: HTMLAudioElement;
  export let src: string = ""
  export let volume: number = 0.1
  export let fire: Function | undefined = undefined
  export let destroy: boolean = false

  onMount(() => {
    audio = new Audio(base + src)
    audio.volume = volume
    const interval = setInterval(() => {
      if (fire) {
        audio.play()
      }
      if (destroy) {
        clearInterval(interval)
      }
    }, 10)
  })
</script>


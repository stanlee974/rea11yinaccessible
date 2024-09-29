
<script lang="ts">
  import { base } from "$app/paths";
  import { onMount } from "svelte";
  import { Loading } from "carbon-components-svelte";

  let audio: HTMLAudioElement;
  export let onclose: Function | undefined = undefined;

  onMount(() => {
    audio = new Audio(base + "/sound/spinner.mp3")
    audio.volume = 0.1
    audio.loop = true
    audio.autoplay = true
    const interval = setInterval(() => {
      audio.pause()
      if (onclose) {
        onclose();
      }
      clearInterval(interval)
    }, 1000)
  })

</script>
<div style="text-indent: -9999px;"> bind:this={audio}</div>
<Loading style="zindex: 10000"></Loading>
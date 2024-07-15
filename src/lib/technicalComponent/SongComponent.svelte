{#if !audio}
    <div style="text-indent: -9999px;"> bind:this={audio}</div>
{/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { onDestroy, onMount } from "svelte";
  import { checkVolume, getVolumeStore, initVolumeStore } from "$lib/store/VolumeStore";
  import { type Unsubscriber } from "svelte/store";
  import { audioStore, makePause } from "$lib/store/inMemoryStore/AudioStore";

  let audio: HTMLAudioElement;

  let audioUnsubscriber: Unsubscriber = () => {};
  onMount(() => {
    if (!checkVolume()) {
      let INITIAL_VOLUME = "2";
      initVolumeStore(INITIAL_VOLUME)
    }
    audioUnsubscriber = audioStore.subscribe((value) => {
      if (value) {
        value.play()
        getVolumeStore()?.subscribe((volume) => {
          value.volume = Number(volume) / 100
        })
      }
    })
  })

  onDestroy(() => {
    if ($audioStore) {
      makePause()
    }
  })
  onDestroy(audioUnsubscriber)
</script>


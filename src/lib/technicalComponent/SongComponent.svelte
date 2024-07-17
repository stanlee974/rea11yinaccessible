{#if !audio}
    <div style="text-indent: -9999px;"> bind:this={audio}</div>
    {#if displayPlayButton}
        <Button iconDescription={$t('common.header.audio.play')} tooltipAlignment="start" kind="ghost" icon={PlayFilledAlt} on:click={() => toggle(true)}></Button>
    {:else }
        <Button iconDescription={$t('common.header.audio.stop')} tooltipAlignment="start" kind="ghost" icon={PauseFilled} on:click={() => toggle(false)}></Button>

    {/if}
{/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { onDestroy, onMount } from "svelte";
  import { checkVolume, getVolumeStore, initVolumeStore } from "$lib/store/VolumeStore";
  import { get, type Unsubscriber } from "svelte/store";
  import { audioStore } from "$lib/store/inMemoryStore/AudioStore";
  import { Button } from "carbon-components-svelte";
  import { PauseFilled, PlayFilledAlt } from "carbon-icons-svelte";
  import { t } from "$lib";

  let audio: HTMLAudioElement;
  let displayPlayButton: boolean;

  let audioUnsubscriber: Unsubscriber = () => {};

  const toggle = (play: boolean) => {
    let htmlAudioElement = get(audioStore);
    if (play) {
      htmlAudioElement.play()
      getVolumeStore()?.subscribe((volume) => {
        htmlAudioElement.volume = Number(volume) / 100
      })
    } else {
      htmlAudioElement.pause()
    }
    displayPlayButton = !displayPlayButton
  }

  onMount(() => {
    if (!checkVolume()) {
      let INITIAL_VOLUME = "2";
      initVolumeStore(INITIAL_VOLUME)
    }
    audioUnsubscriber = audioStore.subscribe(async (value) => {
      if (value) {
        value.play()
          .then(() => {
            getVolumeStore()?.subscribe((volume) => {
              value.volume = Number(volume) / 100
            })
          }).catch(() => {
          displayPlayButton = true
        })
      }
    })
  })

  onDestroy(audioUnsubscriber)
</script>


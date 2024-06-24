{#if showMessage}
    <slot name="message"></slot>
{/if}
{#if enabled}
    <SoundEffectComponent src="/sound/click.mp3" play={playSong} onpause={pause}></SoundEffectComponent>
    <Button kind="secondary"
            style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            cursor: pointer;
            "
            autofocus={autofocus}
            on:click={onClick}><slot name="content"></slot>
</Button>
{/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button } from "carbon-components-svelte";
  import SoundEffectComponent from "$lib/SoundEffectComponent.svelte";


  export let onclick: Function | undefined = undefined
  export let enabled: boolean = true
  export let autofocus: boolean = false
  let showMessage: boolean = false
  let playSong: boolean = false
  let pause: Function |undefined = undefined

  const onClick = () => {
    if (onclick) {
      playSong = true
      showMessage = true
      setTimeout(() => {
        pause = () => playSong = false
        onclick()
        enabled = false
      }, 500)
    }
  }
</script>


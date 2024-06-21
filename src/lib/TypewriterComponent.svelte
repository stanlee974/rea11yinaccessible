<Typewriter mode={mode}
            disabled={disabled}
            delay={delay}
            on:done={doneAction}>
    <div style="width:1px; height: 1px;"> bind:this={keyboardSound}</div>
    <slot></slot>
</Typewriter>
{#if waitReading}
    <Button kind="secondary"
            style="position: layout; left: 46%; padding-right: 2.5rem; padding-left: 2.5rem;"
            autofocus
            on:click={buttonAction}>Continuer la suite
    </Button>
{/if}
<script lang="ts">

  import { onDestroy, onMount } from "svelte";
  import Typewriter from "svelte-typewriter";
  import { Button, Content } from "carbon-components-svelte";
  import { base } from "$app/paths";

  export let disabled = false;
  export let mode: string = "cascade"
  export let delay: number = 0
  export let waitReading: boolean = false
  export let parentDoneAction: Function | undefined = undefined
  export let continueButtonAction: Function | undefined = undefined

  let keyboardSound: HTMLAudioElement

  let interval: any
  let isWriting = false;
  let notWrote = true;

  const buttonAction = () => {
    if (continueButtonAction !== undefined) {
      continueButtonAction()
    }
  }
  const doneAction = () => {
    isWriting = false
    notWrote = false
    keyboardSound.pause()
    if (parentDoneAction !== undefined) {
      parentDoneAction()
    }
  }
  onMount(() => {
      keyboardSound = new Audio(base + "/sound/keyboard.mp3")
    keyboardSound.volume = 0.7
    keyboardSound.loop = true
    interval = setInterval(() => {
      if (!disabled && notWrote) {
        isWriting = true;
        keyboardSound.play()
      }
      if (isWriting) {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
      }
    }, 1000);
  })

  onDestroy(() => {() => clearInterval(interval)})
</script>

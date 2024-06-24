<Typewriter mode={mode}
            disabled={disabled}
            delay={delay}
            on:done={doneAction}>
    <div style="width:1px; height: 1px;"> bind:this={keyboardSound}</div>
    <slot></slot>
</Typewriter>
{#if waitReading && !hasNotStartedWriting && !continuePressed}
    <ButtonComponent autofocus onclick={buttonAction}><span slot="content">Continuer la suite</span></ButtonComponent>
{/if}
<script lang="ts">

  import { onMount } from "svelte";
  import Typewriter from "svelte-typewriter";
  import { base } from "$app/paths";
  import ButtonComponent from "$lib/ButtonComponent.svelte";

  export let disabled = false;
  export let mode: string = "cascade"
  export let delay: number = 0
  export let waitReading: boolean = false
  export let parentDoneAction: Function | undefined = undefined
  export let continueButtonAction: Function | undefined = undefined

  let continuePressed: boolean = false

  let keyboardSound: HTMLAudioElement

  let interval: any
  let isWriting = false;
  let hasNotStartedWriting = true;

  const buttonAction = () => {
    if (continueButtonAction !== undefined) {
      continueButtonAction()
      continuePressed = true
    }
  }
  const doneAction = () => {
    isWriting = false
    hasNotStartedWriting = false
    keyboardSound.pause()
    if (parentDoneAction !== undefined) {
      parentDoneAction()
    }
  }
  onMount(() => {
    keyboardSound = new Audio(base + "/sound/keyboard.mp3")
    keyboardSound.loop = true
    keyboardSound.volume = 0.5
    interval = setInterval(() => {
      if (!disabled && hasNotStartedWriting) {
        isWriting = true;
        keyboardSound.play()
      }
      if (isWriting) {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
      }
      if (!isWriting && !hasNotStartedWriting) {
        clearInterval(interval)
      }
    }, 1000);
  })
</script>

<script lang="ts">

  import {onMount} from "svelte";
  import Typewriter from "svelte-typewriter";
  import {base} from "$app/paths";
  import ButtonComponent from "$lib/technicalComponent/ButtonComponent.svelte";
  import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
  import {t} from "$lib";
  import {headerStore} from "../store/HeaderStore";
  import {animationStore, DISABILITY_NAME} from "../store/AnimationStore";

  export let disabled = false;
  export let mode: string = "cascade"
  export let delay: number = 0
  export let waitReading: boolean = false
  export let parentDoneAction: Function | undefined = undefined
  export let continueButtonAction: Function | undefined = undefined
  export let buttonLabel: string | undefined = $t('common.button.waiting')

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
    if (!$animationStore.disabilities.blind) {
      keyboardSound.pause()
    }
    if (parentDoneAction !== undefined) {
      parentDoneAction()
    }
  }
  
  $: if (!disabled) {
    if ($animationStore.disabilities.blind) {
      setTimeout(() => {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
        doneAction()
      }, 500);
    } else {
      if (!isWriting && !hasNotStartedWriting) {
        clearInterval(interval)
      }
    }
  }

  onMount(() => {
    keyboardSound = new Audio(base + "/sound/keyboard.mp3")
    keyboardSound.loop = true
    keyboardSound.volume = 0.3
    
    interval = setInterval(() => {
      if (!$animationStore.disabilities.blind) {
        if (!disabled && hasNotStartedWriting) {
          isWriting = true;
          keyboardSound.play()
        }
        if (isWriting) {
          window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
        }
      }
    }, 1000);
  })
</script>

<div style="text-indent: -9999px;" aria-hidden={true}> bind:this={keyboardSound}</div>
{#if (!$animationStore.disabilities.blind)}
  <Typewriter
      mode={mode}
      disabled={disabled}
      delay={delay}
      on:done={doneAction}>
      <slot></slot>
  </Typewriter>
  {#if (waitReading && !hasNotStartedWriting && !continuePressed)}
      <ButtonComponent autofocus onclick={buttonAction}><span slot="content" class="d-flex flex-row align-items-center">{buttonLabel}<ContinueFilled class="ms-2"/></span></ButtonComponent>
  {/if}
{:else}
  {#if (!disabled)}
    <slot></slot>
    {#if (waitReading)}
      <ButtonComponent autofocus onclick={buttonAction}><span slot="content" class="d-flex flex-row align-items-center">{buttonLabel}<ContinueFilled class="ms-2"/></span></ButtonComponent>
    {/if}
  {/if}
{/if}

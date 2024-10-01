<script lang="ts">

  import { onMount } from "svelte";
  import Typewriter from "svelte-typewriter";
  import { base } from "$app/paths";
  import ButtonComponent from "$lib/technicalComponent/ButtonComponent.svelte";
  import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
  import { t } from "$lib";
  import {
    getAccessibilityModeStore
  } from "$lib/store/AccessibilityModeStore.js";
  import {page} from "$app/stores";

  export let disabled = false;
  export let mode: string = "cascade"
  export let delay: number = 0
  export let waitReading: boolean = false
  export let parentDoneAction: Function | undefined = undefined
  export let continueButtonAction: Function | undefined = undefined
  export let buttonLabel: string | undefined = $t('common.button.waiting')

  let isA11yMode = false;
  let accessibilityMode = false

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
    if (!accessibilityMode) {
      keyboardSound.pause()
    }
    if (parentDoneAction !== undefined) {
      parentDoneAction()
    }
  }
  
  $: if (!disabled) {
    if (isA11yMode) {
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
    getAccessibilityModeStore().subscribe(value => {
      isA11yMode = value === 'true';
    })

    keyboardSound = new Audio(base + "/sound/keyboard.mp3")
    keyboardSound.loop = true
    keyboardSound.volume = 0.3
    
    interval = setInterval(() => {
      if (!isA11yMode) {
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
{#if (!isA11yMode)}
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

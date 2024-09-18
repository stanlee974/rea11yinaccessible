<div style="text-indent: -9999px;" aria-hidden={true}> bind:this={keyboardSound}</div>
<!--{#if accessibilityMode}-->
<!--    <slot></slot>-->
<!--    <Typewriter-->
<!--            mode={mode}-->
<!--            disabled={disabled}-->
<!--            delay={delay}-->
<!--            on:done={doneAction}>-->
<!--    </Typewriter>-->
<!--{:else }-->
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
<!--{/if}-->
<script lang="ts">

  import { onMount } from "svelte";
  import Typewriter from "svelte-typewriter";
  import { base } from "$app/paths";
  import ButtonComponent from "$lib/technicalComponent/ButtonComponent.svelte";
  import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
  import { t } from "$lib";
  import {
    getAccessibilityMode, getAccessibilityModeStore
  } from "$lib/store/AccessibilityModeStore.js";

  export let disabled = false;
  export let mode: string = "cascade"
  export let delay: number = 0
  export let waitReading: boolean = false
  export let parentDoneAction: Function | undefined = undefined
  export let continueButtonAction: Function | undefined = undefined
  export let buttonLabel: string | undefined = undefined

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
  onMount(() => {
    keyboardSound = new Audio(base + "/sound/keyboard.mp3")
    keyboardSound.loop = true
    keyboardSound.volume = 0.3
      //FIXME manage accessibilityMode
    // accessibilityMode = getAccessibilityMode()
    // getAccessibilityModeStore()?.subscribe((data) => {
    //   accessibilityMode = data === "true"
    // })

    // if (accessibilityMode) {
    //   doneAction()
    // }
    interval = setInterval(() => {
      // if (!accessibilityMode) {
      //   accessibilityMode = getAccessibilityMode()
      // }
      // if (!accessibilityMode) {
        if (!disabled && hasNotStartedWriting) {
          isWriting = true;
          keyboardSound.play()
          buttonLabel = $t('common.button.waiting')
        }
        if (isWriting) {
          window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
        }
      // }
      if (!isWriting && !hasNotStartedWriting) {
        clearInterval(interval)
      }
    }, 1000);
  })
</script>

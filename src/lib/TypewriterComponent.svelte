<Typewriter mode={mode}
            disabled={disabled}
            delay={delay}
            on:done={doneAction}>
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
  import { Button } from "carbon-components-svelte";

  export let disabled = false;
  export let mode: string = "cascade"
  export let delay: number = 0
  export let waitReading: boolean = false
  export let parentDoneAction: Function | undefined = undefined
  export let continueButtonAction: Function | undefined = undefined

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
    if (parentDoneAction !== undefined) {
      parentDoneAction()
    }
  }
  onMount(() => {
    interval = setInterval(() => {
      if (!disabled && notWrote) {
        isWriting = true;
      }
      if (isWriting) {
        window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
      }
    }, 1000);
  })

  onDestroy(() => {() => clearInterval(interval)})
</script>

<Typewriter mode={mode}
            disabled={disabled}
            delay={delay}
            on:done={doneAction}>
    <slot></slot>
</Typewriter>
<script lang="ts">

  import { onDestroy, onMount } from "svelte";
  import Typewriter from "svelte-typewriter";

  export let isWriting = false;
  export let disabled = false;
  export let mode: string = "cascade"
  export let delay: number = 0
  export let parentDoneAction: Function | undefined = undefined

  let interval: any

  const doneAction = () => {
    isWriting = false
    if (parentDoneAction !== undefined) {
      parentDoneAction()
    }
  }
  // onMount(() => {
  //   interval = setInterval(() => {
  //     if (isWriting) {
  //       window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"})
  //     }
  //   }, 1000);
  // })
  //
  // onDestroy(() => {() => clearInterval(interval)})
</script>


{#if showMessage}
    <slot name="message"></slot>
{/if}
{#if enabled}
<Button kind="secondary"
        style="position: absolute; left: 45%; padding-right: 2rem; padding-left: 2rem;" on:click={onClick}><slot name="content"></slot>
</Button>
{/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import Header from "$lib/HeaderComponent.svelte";
  import { Button, Content } from "carbon-components-svelte";
  import Typewriter from "svelte-typewriter";
  import { base } from "$app/paths";

  export let onclick: Function | undefined = undefined
  export let enabled: boolean = true
  let showMessage: boolean = false

  const onClick = () => {
    if (onclick) {
      showMessage = true;
      onclick();
    }
  }
</script>


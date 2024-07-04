<HeaderComponent title={title}/>
<Content style="margin-left: 5rem; margin-right: 5rem">
    {#if place && location}
        <Typewriter mode="scramble">
            <div class="container">
                <h1 class="neon">{place}</h1>
                <h2 class="flux">{location}</h2>
            </div>
        </Typewriter>
        <br/>
    {/if}
    <slot></slot>
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import HeaderComponent from "$lib/renderComponent/HeaderComponent.svelte";
  import { Content } from "carbon-components-svelte";
  import { Step } from "$lib";
  import Typewriter from "svelte-typewriter";

  export let place = "";
  export let title: Step;
  export let location = "";

  export let goto: Function | undefined = undefined
</script>
<style global>
    @import url(/css/app.css);
    @import url(/css/neon.css);
</style>


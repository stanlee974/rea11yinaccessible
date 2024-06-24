<Header/>
<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">{title}</h1>
            <h2 class="flux">{subtitle}</h2>
        </div>
    </Typewriter>
    <br/>
    <slot></slot>
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import Header from "$lib/HeaderComponent.svelte";
  import {Content} from "carbon-components-svelte";
  import Typewriter from "svelte-typewriter";

  export let title = "";
  export let subtitle = "";
</script>
<style global>
    @import url(/css/app.css);
    @import url(/css/neon.css);
    @import url(/css/glitch.css);
</style>


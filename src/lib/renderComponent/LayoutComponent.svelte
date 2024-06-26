<HeaderComponent title={title}/>
<Content style="margin-left: 5rem; margin-right: 5rem">
    <TypewriterComponent mode="scramble">
        <div class="container">
            <h1 class="neon">{place}</h1>
            <h2 class="flux">{location}</h2>
        </div>
    </TypewriterComponent>
    <br/>
    <slot></slot>
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import HeaderComponent from "$lib/renderComponent/HeaderComponent.svelte";
  import { Content } from "carbon-components-svelte";
  import { Step } from "$lib";
  import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";

  export let place = "";
  export let title: Step;
  export let location = "";

</script>


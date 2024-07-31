{#if $renderStore.title !== Step.FINAL}
    <ProgressIndicator
            spaceEqually
            preventChangeOnClick
            currentIndex="{currentStep}"
            style="background-color: rgb(22,22,22); position: sticky; top: 8.5rem; position: flex; flex-direction: row; padding-bottom: 0.5rem; padding-left:1rem; padding-right: 1rem">
        {#each steps as step, index}
            <ProgressStep
                    aria-hidden={index > currentStep}
                    complete
                    disabled="{index > currentStep}"
                    label={index <= currentStep ? step : "?"}
            />
        {/each}
    </ProgressIndicator>
{/if}
<Content>
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <Typewriter mode="scramble">
            <div class="container">
                <h1 style="display: flex; flex-direction: column"><span class="neon">{$renderStore.neon}</span> <span class="flux">{$renderStore.flux}</span></h1>
            </div>
        </Typewriter>
    </div>
    <br aria-hidden="true"/>
    <slot/>
</Content>

<script lang="ts">
  import { Content, ProgressIndicator, ProgressStep } from "carbon-components-svelte";
  import Typewriter from "svelte-typewriter";
  import { renderStore } from "$lib/store/inMemoryStore/RenderStore";
  import { Step, StepRoom } from "$lib";

  let currentStep = 0
  let steps = [StepRoom.ABRI_ENTRANCE, StepRoom.ABRI_COMPUTER, StepRoom.ABRI_MEDICAL, StepRoom.ABRI_SEARCHCENTER, StepRoom.SURFACE_ENTRANCE, StepRoom.SURFACE_LABORATORY, StepRoom.SURFACE_LABORATORY_AUDIOVISUALROOM, StepRoom.SURFACE_LABORATORY_SANCTUARY]

  renderStore.subscribe((value) => {
    switch (value.title) {
      case Step.ABRI_ENTRANCE:
        currentStep = 0
        break
      case Step.ABRI_COMPUTER:
        currentStep = 1
        break
      case Step.ABRI_MEDICAL:
        currentStep = 2
        break
      case Step.ABRI_SEARCHCENTER:
        currentStep = 3
        break
      case Step.SURFACE_ENTRANCE:
        currentStep = 4
        break
      case Step.SURFACE_LABORATORY:
        currentStep = 5
        break
      case Step.SURFACE_LABORATORY_AUDIOVISUALROOM:
        currentStep = 6
        break
      case Step.SURFACE_LABORATORY_SANCTUARY:
        currentStep = 7
        break
      default:
        break
    }
  })

</script>
<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);
</style>

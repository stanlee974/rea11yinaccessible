<script lang="ts">
    import {Content, ProgressIndicator, ProgressStep} from "carbon-components-svelte";
    import Typewriter from "svelte-typewriter";
    import {RenderData, renderStore, renderStoreSetData } from "$lib/store/inMemoryStore/RenderStore";
    import {setLocale, Step, t} from "$lib";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {headerStore} from "$lib/store/HeaderStore";
    import type {LayoutData} from "../../../../.svelte-kit/types/src/routes/[lang]/$types";
    import {get} from "svelte/store";

    let currentStep = 0
    let steps: string[] = []

    onMount(async () => {
        await setLocale($page.params.lang)
        steps = [
            $t('common.layout.progressRoom.shelterEntrance'),
            $t('common.layout.progressRoom.shelterComputerRoom'),
            $t('common.layout.progressRoom.shelterMedicalRoom'),
            $t('common.layout.progressRoom.shelterSearchCenterRoom'),
            $t('common.layout.progressRoom.surfaceEntrance'),
            $t('common.layout.progressRoom.surfaceLaboratoryEntrance'),
            $t('common.layout.progressRoom.audiovisualRoom'),
            $t('common.layout.progressRoom.sanctuary')
        ]
        renderStoreSetData(`common.step.${$renderStore.step}`, $t(`${$renderStore.step}.neon.title`), $t(`${$renderStore.step}.neon.subtitle`))
        renderStore.subscribe((value) => {
            document.title = t.get(`common.step.${value.step}`) + " | really inaccessible"
            switch (value.step) {
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
    })

    page.subscribe(async (data) => {
        steps = [
            $t('common.layout.progressRoom.shelterEntrance'),
            $t('common.layout.progressRoom.shelterComputerRoom'),
            $t('common.layout.progressRoom.shelterMedicalRoom'),
            $t('common.layout.progressRoom.shelterSearchCenterRoom'),
            $t('common.layout.progressRoom.surfaceEntrance'),
            $t('common.layout.progressRoom.surfaceLaboratoryEntrance'),
            $t('common.layout.progressRoom.audiovisualRoom'),
            $t('common.layout.progressRoom.sanctuary')
        ]
    })
</script>

<style lang="css">
    @import url(/css/neon.css);
</style>

{#if $renderStore.title !== $t('common.step.final')}
    <ProgressIndicator
            spaceEqually
            preventChangeOnClick
            currentIndex="{currentStep}"
            id="general-progress-indicator">
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
                <h1 style="display: flex; flex-direction: column"><span class="neon">{$renderStore.neon}</span> <span
                        class="flux">{$renderStore.flux}</span></h1>
            </div>
        </Typewriter>
    </div>
    <br aria-hidden="true"/>
    <slot/>
</Content>

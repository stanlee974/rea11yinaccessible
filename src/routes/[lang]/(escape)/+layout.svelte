<script lang="ts">
    import {Content, ProgressIndicator, ProgressStep} from "carbon-components-svelte";
    import Typewriter from "svelte-typewriter";
    import {renderStore, renderStoreSetData} from "$lib/store/inMemoryStore/RenderStore";
    import {redirect, setLocale, Step, t} from "$lib";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {animationStore} from "$lib/store/AnimationStore";

    let currentStep = 0
    let steps: string[] = []

    let glitchInput: string[] = []
    let glitchCode: string[] = []
    let glitchAvailableKeys: Set<string> = new Set<string>();

    let isKeyDownAttached: boolean = false

    onMount(async () => {
        await setLocale($page.params.lang)
        steps = [
            $t('common.layout.progressRoom.shelterEntrance'),
            $t('common.layout.progressRoom.shelterComputerRoom'),
            $t('common.layout.progressRoom.shelterMedicalRoom'),
            $t('common.layout.progressRoom.shelterSearchCenterRoom'),
            $t('common.layout.progressRoom.surfaceEntrance'),
            $t('common.layout.progressRoom.surfaceLaboratory'),
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
                case Step.OUTRO:
                    currentStep = 8
                    break
                default:
                    break
            }
            glitchInput = []
            const glitchCodeConfig = $t(`common.nextStep.${value.step}.code`);
            if (Array.isArray(glitchCodeConfig)) {
                if (!isKeyDownAttached) {
                    window.addEventListener('keydown', onKeyDown)
                }
                isKeyDownAttached = true;
                glitchCode = glitchCodeConfig
                glitchAvailableKeys = new Set(glitchCode)
            } else {
                glitchCode = []
                glitchAvailableKeys = new Set()
                isKeyDownAttached = false;
                window.removeEventListener('keydown', onKeyDown);
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
            $t('common.layout.progressRoom.surfaceLaboratory'),
            $t('common.layout.progressRoom.audiovisualRoom'),
            $t('common.layout.progressRoom.sanctuary')
        ]
    })

    const register = (key: string) => {
        glitchInput.push(key);
        if (glitchInput.length > glitchCode.length) {
            glitchInput.shift();
        }
        if (glitchCode.length > 0 && glitchInput && glitchInput.join() === glitchCode.join()) {
            goToNextPage()
        }
    }
    const onKeyDown = (e: KeyboardEvent) => {
        const key = e.key;
        if (glitchAvailableKeys.has(key)) {
            register(key)
        }
    }
    const goToNextPage = () => {
        console.log('✨ Glitch code avec flèches validé !');
        redirect($page.params.lang, $t(`common.nextStep.${$renderStore.step}.next`));
    }
</script>

<style lang="css">
    @import url(/css/neon.css);

    .erase-effect :global(> main) {
        -webkit-mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) var(--percent));
        mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) var(--percent));
    }
</style>

{#if $renderStore.title !== $t('common.step.outro')}
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
<Content
        style="{$renderStore.step === Step.SURFACE_LABORATORY_SANCTUARY ? 'display: flex; flex-direction: column; align-items: start;' : ''}">
    <div style="{$renderStore.step !== Step.SURFACE_LABORATORY_SANCTUARY ? 'display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;': ''}">
        <Typewriter mode="scramble">
            <div class="container">
                <h1 style="display: flex; flex-direction: column"><span class="neon">{$renderStore.neon}</span>
                    <span
                            class="flux">{$renderStore.flux}</span></h1>
            </div>
        </Typewriter>
    </div>
    <br aria-hidden="true"/>
    <div class="erase-effect"
         style="--percent: {$animationStore.disabilities.blind ? null : $animationStore.mask + '%'}">
        <slot/>
    </div>
</Content>

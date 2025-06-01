<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import { Button, Column, FluidForm, Grid, ImageLoader, Loading, Row, TextInput, } from "carbon-components-svelte";
    import dyslexia from "dyslexia";
    import { base } from '$app/paths';
    import { redirect, Step, t } from "$lib";
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import { onMount } from "svelte";
    import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
    import { changeSource } from "$lib/store/inMemoryStore/AudioStore";
    import { page } from "$app/stores";
    import { ESCAPEGAME_KEY } from "../constant";

    let open = true;
    let showScenario = true;
    let showForm = false;
    let showGoal = true;
    let isWaiting = false;

    let result = ""

    let hint = $t(`${ESCAPEGAME_KEY}.thirdPlace.test.sentence`)


    onMount(() => {
        changeSource("/ost/"+ ESCAPEGAME_KEY +"/step3.mp3")
        renderStore.set(new RenderData($t(`common.step.${ESCAPEGAME_KEY}.thirdPlace`), $t(`${ESCAPEGAME_KEY}.thirdPlace.neon.title`), $t(`${ESCAPEGAME_KEY}.thirdPlace.neon.subtitle`), Step.THIRD_PLACE));
    })

    $: invalidResult = !new RegExp($t(`${ESCAPEGAME_KEY}.thirdPlace.test.response`), 'i').test(result);
    const dyslexifyContent = () => {
        hint = dyslexia(hint)

    }
    const interval = setInterval(dyslexifyContent, 500)
    const validateForm = (): void => {
        if (new RegExp($t(`${ESCAPEGAME_KEY}.thirdPlace.test.response`), 'i').test(result)) {
            clearInterval(interval)
            isWaiting = true
            redirect($page.params.lang, `${ESCAPEGAME_KEY}/fourthPlace`)
        }
    }

</script>

<style>
    @import url('https://fonts.cdnfonts.com/css/harjimed');
</style>

<ModalComponent opened={open}
                parentDoneAction={() => showScenario = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/thirdPlace/dark_archives.png" alt=""
                        fadeIn={true}/>
            </Column>
            <Column>
                {#each $t(`${ESCAPEGAME_KEY}.thirdPlace.before.row`) as row}
                    <p style="font-size: 1.3rem">{row}</p>
                {/each}
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={showScenario} waitReading continueButtonAction={() => showGoal = false}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-1">{$t('common.layout.title.scenario')}</h2>
            {#each $t(`${ESCAPEGAME_KEY}.thirdPlace.scenario.row`) as row, i}
                {#if i < ($t(`${ESCAPEGAME_KEY}.thirdPlace.scenario.row`).length-1)}
                    <p>{row}</p>
                {:else}
                    <p class="quote m-3">{row}</p>
                {/if}
            {/each}
        </div>
    </div>
</TypewriterComponent>
<TypewriterComponent disabled={showGoal} parentDoneAction={() => showForm = true}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-2">{$t('common.layout.title.goal')}</h2>
            {#each $t(`${ESCAPEGAME_KEY}.thirdPlace.goal.row`) as row}
                <p>{row}</p>
            {/each}
        </div>
    </div>
</TypewriterComponent>
{#if showForm}
    <div>
        <div class="container mb-4 d-flex flex-column align-items-center justify-content-center">
            <div class="mb-3">
                <p>{hint}</p>
            </div>
            <FluidForm class="mb-3">
                <TextInput aria-label={$t(`${ESCAPEGAME_KEY}.thirdPlace.test.button.password.label`)}
                           labelText={$t(`${ESCAPEGAME_KEY}.thirdPlace.test.button.password.text`)}
                           placeholder={$t(`${ESCAPEGAME_KEY}.thirdPlace.test.button.password.placeholder`)}
                           required invalid={invalidResult}
                           invalidText={$t(`${ESCAPEGAME_KEY}.thirdPlace.test.button.password.error`)}
                           autofocus bind:value={result}/>
            </FluidForm>
            <Button kind="primary" on:click={() => validateForm()}>{$t(`${ESCAPEGAME_KEY}.thirdPlace.test.button.submit.text`)}
            </Button>
        </div>
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}

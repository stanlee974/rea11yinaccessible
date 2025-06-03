<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Column, FluidForm, Grid, ImageLoader, Loading, Row,} from "carbon-components-svelte";
    import Typewriter from 'svelte-typewriter'
    import {base} from '$app/paths';
    import {redirect, Step, t} from "$lib";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {onMount} from "svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {page} from "$app/stores";
    import { ESCAPEGAME_KEY } from "../constant";

    onMount(() => {
        changeSource("/ost/"+ ESCAPEGAME_KEY +"/trap.mp3")
        renderStore.set(new RenderData($t(`common.step.${ESCAPEGAME_KEY}.eighthPlace`), $t(`${ESCAPEGAME_KEY}.eighthPlace.neon.title`), $t(`${ESCAPEGAME_KEY}.eighthPlace.neon.subtitle`), Step.EIGHTH_PLACE));
    })

    let showTransitionModal = true;
    let showScenario = true;
    let showEnigm = false;
    let isWaiting = false;
    let showContinueButton = false;
    let showForm = true;
    let disableGoal = true;
    let question2 = ""
    let question1 = ""
    let error = ""
    $: valid1 = new RegExp($t(`${ESCAPEGAME_KEY}.eighthPlace.test.response.1.question1`), 'i').test(question1) && new RegExp($t(`${ESCAPEGAME_KEY}.eighthPlace.test.response.1.question2`), 'i').test(question2)
    $: valid2 = new RegExp($t(`${ESCAPEGAME_KEY}.eighthPlace.test.response.2.question1`), 'i').test(question1) && new RegExp($t(`${ESCAPEGAME_KEY}.eighthPlace.test.response.2.question2`), 'i').test(question2)

    const validateForm = () => {
        if (valid2
            || valid1) {
            isWaiting = true
            redirect($page.params.lang, `${ESCAPEGAME_KEY}/ninthPlace`)
        } else {
            error = $t(`${ESCAPEGAME_KEY}.eighthPlace.test.error`)
        }
    }

</script>

<style lang="css">
    label {
        font-size: 1.3em;
    }

    span {
        border: white 1px solid;
        padding: 0.3em;
    }

    body {
        display: flex !important;
        flex-direction: column !important;
        align-items: start !important;
    }

</style>

<ModalComponent opened={showTransitionModal}
                parentDoneAction={() => {showScenario = false;}}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/eighthPlace/voices.png"
                        alt=""
                        fadeIn={true}/>
            </Column>
            <Column>
                {#each $t(`${ESCAPEGAME_KEY}.eighthPlace.before.row`) as row}
                    <p class="mb-2">{row}</p>
                {/each}
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<div class="d-flex flex">
    <Typewriter disabled={showScenario} mode="cascade"
                on:done={() => setTimeout(() => showContinueButton = true, 2000)}>
        <div class="container mt-4 mb-5">
            <h2 class="mb-2">{$t('common.layout.title.scenario')}</h2>
            {#each $t(`${ESCAPEGAME_KEY}.eighthPlace.scenario.row`) as row}
                <p>{row}</p>
            {/each}
        </div>
    </Typewriter>
</div>
{#if showContinueButton}
    <Button kind="primary"
            style="padding-right: 2.5rem; padding-left: 2.5rem;"
            on:click={() => {
            showEnigm = true
            showContinueButton = false
            changeSource("/ost/"+ ESCAPEGAME_KEY +"/step8.mp3")
        }}>{$t(`${ESCAPEGAME_KEY}.eighthPlace.scenario.button.continue.text`)}
    </Button>
{/if}
<ModalComponent opened={showEnigm}
                parentDoneAction={() => disableGoal = false}>
    <div>
        <div class="d-flex flew-row align-items-center">
            <div class="half">
                <div>
                    <ImageLoader
                            src="{base}/{ESCAPEGAME_KEY}/eighthPlace/stone.png"
                            alt="" fadeIn={true}/>
                </div>
            </div>
            <div class="half m-3">
                <span class="number">1</span>
                {#each $t(`${ESCAPEGAME_KEY}.eighthPlace.scenario.modal.1.row`) as row}
                    <p class="mt-4">{row}</p>
                {/each}
            </div>
        </div>
    </div>
</ModalComponent>
<div class="d-flex flex">
    <Typewriter mode="cascade" disabled={disableGoal} on:done={() => setTimeout(() => showForm = true, 2000)}>
        {#each $t(`${ESCAPEGAME_KEY}.eighthPlace.scenario.modal.1.row`) as row}
            <p class="mt-4">{row}</p>
        {/each}
        <div class="container mb-4">
            <h2 class="mb-2">{$t('common.layout.title.goal')}</h2>
            {#each $t(`${ESCAPEGAME_KEY}.eighthPlace.goal.row`) as row}
                <p>{row}</p>
            {/each}
        </div>
    </Typewriter>
</div>
{#if showForm}
    <FluidForm style="width: 5000px; height: 5000px">
        <div style="width: 5000px; position: absolute; left: 2500px; top: 3400px; font-size: 300rem">
            <label id="question2">{$t(`${ESCAPEGAME_KEY}.eighthPlace.test.buttons.question2.text`)}</label>
            <input aria-labelledby="question2" required
                   bind:value={question2}>
        </div>
        <div style="width: 100px; position: absolute; left: 13000px; top: 10000px; font-size: 0.3rem">
            <label id="question1">{$t(`${ESCAPEGAME_KEY}.eighthPlace.test.buttons.question1.text`)}</label>
            <input aria-labelledby="question1" required
                   bind:value={question1}>
        </div>
    </FluidForm>
    <Button kind="secondary" on:click={() => validateForm()}>{$t(`${ESCAPEGAME_KEY}.eighthPlace.test.buttons.submit.text`)}</Button>
    {#if error}
        <span style="color: red; font-weight: bold">{error}</span>
    {/if}
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}

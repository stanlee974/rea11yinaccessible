<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Column, FluidForm, Grid, ImageLoader, Loading, Row, TextInput,} from "carbon-components-svelte";
    import {base} from '$app/paths';
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import {redirect, Step, t} from "$lib";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {onMount} from "svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import AudioComponent from "$lib/technicalComponent/AudioComponent.svelte";
    import {page} from "$app/stores";
    import {headerStore} from "$lib/store/HeaderStore";
    import {adjustVolume} from "$lib/store/inMemoryStore/AudioStore";
    import { ESCAPEGAME_KEY } from "../constant";

    onMount(() => {
        changeSource("/ost/"+ ESCAPEGAME_KEY +"/step7.mp3")
        renderStore.set(new RenderData($t(`common.step.${ESCAPEGAME_KEY}.seventhPlace`), $t(`${ESCAPEGAME_KEY}.seventhPlace.neon.title`), $t(`${ESCAPEGAME_KEY}.seventhPlace.neon.subtitle`), Step.SEVENTH_PLACE));
    })

    let showTransitionModal = true;
    let showScenario = true;
    let showEnigm = false;
    let showForm = false;
    let isWaiting = false;
    let disableGoal = true;
    let result = ""
    let showAudioMediumDeaf = false
    let showAudioLowDeaf = false
    let showAudioVeryLowDeaf = false

    $: invalidResult = !new RegExp($t(`${ESCAPEGAME_KEY}.seventhPlace.test.response`), 'i').test(result)
    const validateForm = () => {
        if (new RegExp($t(`${ESCAPEGAME_KEY}.seventhPlace.test.response`), 'i').test(result)) {
            isWaiting = true
            adjustVolume($headerStore.songVolume * 100)
            redirect($page.params.lang, `${ESCAPEGAME_KEY}/eighthPlace`)
        }
    }

</script>

<style lang="css">
    label {
        font-size: 1.3em;
    }

    audio {
        margin-right: 2em;
        margin-top: 1em;
    }
</style>

<ModalComponent opened={showTransitionModal}
                parentDoneAction={() => {showScenario = false}}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/seventhPlace/throne.png"
                        alt="" fadeIn={true}/>
            </Column>
            <Column>
                {#each $t(`${ESCAPEGAME_KEY}.seventhPlace.before.row`) as row}
                    <p class="mb-2" style="font-size: 1.3rem">{row}</p>
                {/each}
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={showScenario} parentDoneAction={() => setTimeout(() => {showEnigm = true}, 2000)}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-2">{$t('common.layout.title.scenario')}</h2>
            {#each $t(`${ESCAPEGAME_KEY}.seventhPlace.scenario.row`) as row}
                <p>{row}</p>
            {/each}
        </div>
    </div>
</TypewriterComponent>
<ModalComponent opened={showEnigm}
                parentDoneAction={() => disableGoal = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/seventhPlace/voice.png"
                        alt="" fadeIn={true}/>
            </Column>
            <Column>
                {#each $t(`${ESCAPEGAME_KEY}.seventhPlace.scenario.modal.1.row`) as row}
                    <p>{row}</p>
                {/each}
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={disableGoal} waitReading continueButtonAction={() => {
            showForm = true
            adjustVolume(0)
    }}>
    <div>
        <div class="container mb-5">
            <h2 class="mb-2">{$t('common.layout.title.goal')}</h2>
            {#each $t(`${ESCAPEGAME_KEY}.seventhPlace.goal.row`) as row}
                <p>{row}</p>
            {/each}
        </div>
    </div>
</TypewriterComponent>
{#if showForm}
    <div class="d-flex flex-column my-2 align-items-center">
        <Grid>
            <Row>
                <AudioComponent id="deafHigh" name={$t(`${ESCAPEGAME_KEY}.seventhPlace.test.buttons.deafHigh.text`)}
                                src="{base}/{ESCAPEGAME_KEY}/seventhPlace/{$page.params.lang}/nodeaf.mp3" volume={0.0010}
                                onEnded={() => showAudioMediumDeaf = true}></AudioComponent>
                {#if showAudioMediumDeaf}
                    <AudioComponent id="deafMedium" name={$t(`${ESCAPEGAME_KEY}.seventhPlace.test.buttons.deafMedium.text`)}
                                    src="{base}/{ESCAPEGAME_KEY}/seventhPlace/{$page.params.lang}/nodeaf.mp3"
                                    volume={0.0020} onEnded={() => showAudioLowDeaf = true}></AudioComponent>
                {/if}
                {#if showAudioLowDeaf}
                    <AudioComponent id="deafLow" name={$t(`${ESCAPEGAME_KEY}.seventhPlace.test.buttons.deafLow.text`)}
                                    src="{base}/{ESCAPEGAME_KEY}/seventhPlace/{$page.params.lang}/nodeaf.mp3"
                                    volume={0.01} onEnded={() => showAudioVeryLowDeaf = true}></AudioComponent>
                {/if}
                {#if showAudioVeryLowDeaf}
                    <AudioComponent id="deafVeryLow" name={$t(`${ESCAPEGAME_KEY}.seventhPlace.test.buttons.deafVeryLow.text`)}
                                    src="{base}/{ESCAPEGAME_KEY}/seventhPlace/{$page.params.lang}/nodeaf.mp3"
                                    volume={0.1}></AudioComponent>
                {/if}
            </Row>
        </Grid>
        <FluidForm class="my-2">
            <TextInput
                    labelText={$t(`${ESCAPEGAME_KEY}.seventhPlace.test.buttons.keyword.text`)}
                    placeholder={$t(`${ESCAPEGAME_KEY}.seventhPlace.test.buttons.keyword.placeholder`)}
                    required invalid={invalidResult} invalidText={$t(`${ESCAPEGAME_KEY}.seventhPlace.test.buttons.keyword.error`)}
                    bind:value={result}/>
        </FluidForm>
        <Button kind="primary" class="mt-4 mb-2"
                on:click={() => validateForm()}>{$t(`${ESCAPEGAME_KEY}.seventhPlace.test.buttons.submit.text`)}</Button>
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}

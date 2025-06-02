<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import { Column, Grid, ImageLoader, Row, } from "carbon-components-svelte";
    import { base } from "$app/paths";
    import { redirect, t, Step } from "$lib";
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
    import { onMount } from "svelte";
    import { adjustVolume, changeSource } from "$lib/store/inMemoryStore/AudioStore";
    import { page } from "$app/stores";
    import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
    import ButtonComponent from "$lib/technicalComponent/ButtonComponent.svelte";
    import { getElapsedTime } from "$lib/store/AnimationStore";
    import { ESCAPEGAME_KEY } from "../constant";

    let showTransitionModal = true;
    let showTrapModal = false;
    let showScenario = true;
    let goToSummary = false;
    const elapsedTime = getElapsedTime()

    onMount(() => {
        changeSource("/ost/"+ ESCAPEGAME_KEY +"/stress.mp3")
        renderStore.set(new RenderData($t(`common.step.${ESCAPEGAME_KEY}.ninthPlace`), $t(`${ESCAPEGAME_KEY}.ninthPlace.neon.title`), $t(`${ESCAPEGAME_KEY}.ninthPlace.neon.subtitle`), Step.NINTH_PLACE));
    })
</script>

<style lang="css">

    @keyframes lights {
        0% {
            color: hsl(230, 40%, 80%);
            text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.2),
            0 0 0.125em hsla(320, 100%, 60%, 0.3),
            -1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
            1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
        }

        30% {
            color: hsl(230, 80%, 90%);
            text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
            0 0 0.125em hsla(320, 100%, 60%, 0.5),
            -0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
            0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
        }

        40% {
            color: hsl(230, 100%, 95%);
            text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
            0 0 0.125em hsla(320, 100%, 90%, 0.5),
            -0.25em -0.125em 0.125em hsla(40, 100%, 60%, 0.2),
            0.25em 0.125em 0.125em hsla(200, 100%, 60%, 0.4);
        }

        70% {
            color: hsl(230, 80%, 90%);
            text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.5),
            0 0 0.125em hsla(320, 100%, 60%, 0.5),
            0.5em -0.125em 0.25em hsla(40, 100%, 60%, 0.2),
            -0.5em 0.125em 0.25em hsla(200, 100%, 60%, 0.4);
        }

        100% {
            color: hsl(230, 40%, 80%);
            text-shadow: 0 0 1em hsla(320, 100%, 50%, 0.2),
            0 0 0.125em hsla(320, 100%, 60%, 0.3),
            1em -0.125em 0.5em hsla(40, 100%, 60%, 0),
            -1em 0.125em 0.5em hsla(200, 100%, 60%, 0);
        }

    }

    body {
        margin: 0;
        font: 100% / 1.5 Raleway, sans-serif;
        color: hsl(230, 100%, 95%);
        background: linear-gradient(135deg, hsl(230, 40%, 12%), hsl(230, 20%, 7%));
        height: 100vh;
        display: flex;
    }

    .fin {
        margin: auto;
        font-size: 3.5rem;
        font-weight: 300;
        animation: lights 5s 750ms linear infinite;
        text-align: center;
        display: block;
        position: relative;
    }
</style>

<ModalComponent opened={showTransitionModal} on:open
                parentDoneAction={() => {
                    changeSource("/ost/"+ ESCAPEGAME_KEY +"/step9.mp3")
                   showTrapModal = true
               }}>
    <div>
        <div class="d-flex flew-row align-items-center">
            <div class="half">
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/ninthPlace/steles.png"
                        alt=""
                        fadeIn={true}/>
            </div>
            <div class="half m-3">
                <span class="number">1</span>
                {#each $t(`${ESCAPEGAME_KEY}.ninthPlace.modal.1.image.1.row`) as row}
                    <p class="mt-4">{row}</p>
                {/each}
            </div>
        </div>
        <div class="d-flex flew-row align-items-center">
            <div class="half m-3">
                <span class="number">2</span>
                {#each $t(`${ESCAPEGAME_KEY}.ninthPlace.modal.1.image.2.row`) as row}
                    <p class="mt-4">{row}</p>
                {/each}
            </div>
            <div class="half">
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/ninthPlace/dalle.png"
                        alt=""
                        fadeIn={true}/>
            </div>
        </div>
        <div class="d-flex flew-row align-items-center">
            <div class="half">
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/ninthPlace/voice.png"
                        alt=""
                        fadeIn={true}/>
            </div>
            <div class="half m-3">
                <span class="number">3</span>
                {#each $t(`${ESCAPEGAME_KEY}.ninthPlace.modal.1.image.3.row`) as row}
                    <p class="mt-4">{row}</p>
                {/each}
            </div>
        </div>
        <div class="d-flex flew-row align-items-center">
            <div class="half m-3">
                <span class="number">4</span>
                {#each $t(`${ESCAPEGAME_KEY}.ninthPlace.modal.1.image.4.row`) as row}
                    <p class="mt-4 mb-3">{row}</p>
                {/each}
            </div>
            <div class="half">
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/ninthPlace/voice2.png"
                        alt=""
                        fadeIn={true}/>
            </div>
        </div>
    </div>
</ModalComponent>
<ModalComponent opened={showTrapModal} on:open
                parentDoneAction={() => {
                   showScenario = false;
               }}>
    <Grid>
        <Row>
            <Column>
                <div class="glitch">
                    <ImageLoader
                            src="{base}/{ESCAPEGAME_KEY}/ninthPlace/guardian.png"
                            alt=""
                            fadeIn={true}/>
                </div>
            </Column>
            <Column>
                {#each $t(`${ESCAPEGAME_KEY}.ninthPlace.modal.2.image.1.row`) as row}
                    <p class="mb-2">{row}</p>
                {/each}
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={showScenario} parentDoneAction={() => goToSummary = true}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-2">{$t(`${ESCAPEGAME_KEY}.ninthPlace.epilogue.title`)}</h2>
            {#each $t(`${ESCAPEGAME_KEY}.ninthPlace.epilogue.row`) as row}
                <p class="mb-2">{row}</p>
            {/each}
        </div>
    </div>
</TypewriterComponent>
{#if goToSummary}

    <div>
        <div class="container mb-5">
            <span class="fin">{$t(`${ESCAPEGAME_KEY}.ninthPlace.buttons.end`)} {elapsedTime}</span>
        </div>
        <ButtonComponent onclick={() => {
            adjustVolume(0);
            redirect($page.params.lang, "summary")
        }}>
            <span slot="content"
                  class="d-flex flex-row align-items-center">
                {$t(`${ESCAPEGAME_KEY}.ninthPlace.buttons.summary`)}
                <ContinueFilled class="ms-2"/>
            </span>
        </ButtonComponent>
    </div>
{/if}

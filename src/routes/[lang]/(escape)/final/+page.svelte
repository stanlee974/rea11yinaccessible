<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Column, Grid, ImageLoader, Row,} from "carbon-components-svelte";
    import {base} from "$app/paths";
    import {Step, t} from "$lib";
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {onMount} from "svelte";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {page} from "$app/stores";
    import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
    import ButtonComponent from "$lib/technicalComponent/ButtonComponent.svelte";
    import {redirect} from "$lib";
    import {adjustVolume} from "$lib/store/inMemoryStore/AudioStore";
    import {getElapsedTime} from "$lib/store/AnimationStore";
    import {updateSongVolume} from "$lib/store/HeaderStore";

    let showTransitionModal = true;
    let showTrapModal = false;
    let showScenario = true;
    let goToSummary = false;
    const elapsedTime = getElapsedTime()

    onMount(() => {
        changeSource("/ost/stress.mp3")
        updateSongVolume(70)
        renderStore.set(new RenderData($t('common.step.outro'), $t('outro.neon.title'), $t('outro.neon.subtitle'), Step.OUTRO));
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
                  changeSource("/ost/final.mp3")
                  updateSongVolume(70)
                  showTrapModal = true
               }}>
    <div>
        <div class="d-flex flew-row align-items-center">
            <div class="half">
                <ImageLoader
                        src="{base}/final/broken_orb.jpg"
                        alt=""
                        fadeIn={true}/>
            </div>
            <div class="half m-3">
                <span class="number">1</span>
                <p class="mt-4">{$t('outro.modal.1.image.1.row.1')}</p>
            </div>
        </div>
        <div class="d-flex flew-row align-items-center">
            <div class="half m-3">
                <span class="number">2</span>
                <p class="mt-4">{$t('outro.modal.1.image.2.row.1')}</p>
            </div>
            <div class="half">
                <ImageLoader
                        src="{base}/final/man_with_syringe.jpg"
                        alt=""
                        fadeIn={true}/>
            </div>
        </div>
        <div class="d-flex flew-row align-items-center">
            <div class="half">
                <ImageLoader
                        src="{base}/final/man_reading_letter.jpg"
                        alt=""
                        fadeIn={true}/>
            </div>
            <div class="half m-3">
                <span class="number">3</span>
                <p class="mt-4">{$t('outro.modal.1.image.3.row.1')}</p>
            </div>
        </div>
        <div class="d-flex flew-row align-items-center">
            <div class="half m-3">
                <span class="number">4</span>
                <p class="mt-4 mb-3">{$t('outro.modal.1.image.4.row.1')}</p>
                <p>{$t('outro.modal.1.image.4.row.2')}</p>
            </div>
            <div class="half">
                <ImageLoader
                        src="{base}/final/man_running.jpg"
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
                            src="{base}/final/reality.jpeg"
                            alt=""
                            fadeIn={true}/>
                </div>
            </Column>
            <Column>
                <p class="mb-2">{$t('outro.modal.2.image.1.row.1')}</p>
                <p class="mb-2">{$t('outro.modal.2.image.1.row.2')}</p>
                <p class="mb-2">{$t('outro.modal.2.image.1.row.3')}</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent intervalType={80} disableTypeSound={true} delay={1000} disabled={showScenario} parentDoneAction={() => goToSummary = true}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-2">{$t('outro.epilogue.title')}</h2>
            <p class="mb-2">{$t('outro.epilogue.row.1')}</p>
            <p class="mb-2">{$t('outro.epilogue.row.2')}</p>
            <p class="mb-2">{$t('outro.epilogue.row.3')}</p>
            <p class="mb-2">{$t('outro.epilogue.row.4')}</p>
            <p class="mb-2">{$t('outro.epilogue.row.5')}</p>
        </div>
    </div>
</TypewriterComponent>
{#if goToSummary}

    <div>
        <div class="container mb-5">
            <span class="fin">{$t('outro.buttons.end')} {elapsedTime}</span>
        </div>
        <ButtonComponent onclick={() => {
            adjustVolume(0);
            redirect($page.params.lang, "summary")
        }}>
            <span slot="content"
                class="d-flex flex-row align-items-center">
                {$t('outro.buttons.summary')}
                <ContinueFilled class="ms-2"/>
            </span>
        </ButtonComponent>
    </div>
{/if}

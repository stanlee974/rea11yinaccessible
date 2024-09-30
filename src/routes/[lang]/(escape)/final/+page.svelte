<ModalComponent opened={showTransitionModal} on:open
                parentDoneAction={() => {
                    changeSource("/ost/step10.mp3")
                   showTrapModal = true
               }}>
    <div style="display: flex; flex-direction: row">
        <Grid>
            <Row>
                <Column>
                    <div>
                        <ImageLoader
                                src="{base}/final/orbe.jpg"
                                alt={$t('outro.modal.1.image.1.title')}
                                fadeIn={true}/>
                        <span class="number">2</span>
                        <p style:font-size="1.3rem">{$t('outro.modal.1.image.1.row.1')}</p>
                        <ImageLoader
                                src="{base}/final/man_with_syringe.jpg"
                                alt={$t('outro.modal.1.image.2.title')}
                                fadeIn={true}/>
                        <span class="number">4</span>
                        <p style:font-size="1.3rem">{$t('outro.modal.1.image.2.row.1')}</p>
                        <p style:font-size="1.3rem">{$t('outro.modal.1.image.2.row.2')}</p>
                    </div>
                </Column>
                <Column>
                    <span class="number">1</span>
                    <p style:font-size="1.3rem">{$t('outro.modal.1.image.3.row.1')}</p>
                    <ImageLoader
                            src="{base}/final/broken_orb.jpg"
                            alt={$t('outro.modal.1.image.3.title')}
                            fadeIn={true}/>
                    <span class="number">3</span>
                    <p style:font-size="1.3rem">{$t('outro.modal.1.image.4.row.1')}</p>
                    <ImageLoader
                            src="{base}/final/man_reading_letter.jpg"
                            alt={$t('outro.modal.1.image.4.title')}
                            fadeIn={true}/>
                </Column>
            </Row>
        </Grid>
    </div>
</ModalComponent>
<ModalComponent opened={showTrapModal} on:open
                parentDoneAction={() => {
                   showScenario = false;
               }}>
    <div style="display: flex; flex-direction: row">
        <Grid>
            <Row>
                <Column>
                    <div class="glitch">
                        <ImageLoader
                                src="{base}/final/guard.jpg"
                                alt={$t('outro.modal.2.image.1.title')}
                                fadeIn={true}/>
                    </div>
                </Column>
                <Column>
                    <p style:font-size="1.3rem">{$t('outro.modal.2.image.1.row.1')}</p>
                    <p style:font-size="1.3rem">{$t('outro.modal.2.image.1.row.2')}</p>
                    <p style:font-size="1.3rem">{$t('outro.modal.2.image.1.row.3')}</p>
                </Column>
            </Row>
        </Grid>
    </div>
</ModalComponent>
<TypewriterComponent disabled={showScenario} parentDoneAction={() => disabledFin = false}>
    <h2><u><i>{$t('outro.epilogue.title')}</i></u></h2>
    <p>{$t('outro.epilogue.row.1')}</p>
    <p>{$t('outro.epilogue.row.2')}</p>
    <p>{$t('outro.epilogue.row.3')}</p>
    <p>{$t('outro.epilogue.row.4')}</p>
    <p>{$t('outro.epilogue.row.5')}</p>
</TypewriterComponent>
<TypewriterComponent disabled={disabledFin} waitReading continueButtonAction={() => showSummary = true}
                     buttonLabel={$t('outro.buttons.summary')}>
    <span class="fin">{$t('outro.buttons.end')}</span>
</TypewriterComponent>
{#if showSummary}
    <br aria-hidden="true"/>
    <br aria-hidden="true"/>
    <br aria-hidden="true"/>
    <ExpandableTile tileExpandedLabel={$t('outro.viewLess')} tileCollapsedLabel={$t('outro.viewMore')}>
        <div slot="above">
            <h2>{$t('outro.visual.title')}</h2>
        </div>
        <div slot="below">
            <h3>{$t('outro.visual.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> {$t('outro.visual.1.disabilities.1.problem')}</p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u> {$t('outro.visual.1.disabilities.1.advice')}</p>
            <br aria-hidden="true"/>
            <h3>{$t('outro.visual.2.title')} {$t('outro.visual.2.disabilities.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> <b>{$t('outro.visual.2.disabilities.1.problem')}</b>
            </p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u> {$t('outro.visual.2.disabilities.1.advice')}
            </p>
            <br aria-hidden="true"/>
            <h3>{$t('outro.visual.3.title')} {$t('outro.visual.3.disabilities.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> <b>{$t('outro.visual.3.disabilities.1.problem')}</b>
            </p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u>
                {$t('outro.visual.3.disabilities.1.cta.1.above')}
                <a href={$t('outro.visual.3.disabilities.1.cta.1.link')} target="_blank"
                   on:click|stopPropagation={() => console.debug("go to link")}
                >
                    {$t('outro.visual.3.disabilities.1.cta.1.label')}
                </a>
                .
            </p>
            <p class="tab">{$t('outro.visual.3.disabilities.1.advice')}</p>
            <br aria-hidden="true"/>
            <h3>{$t('outro.visual.4.title')} {$t('outro.visual.4.disabilities.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> <b>{$t('outro.visual.4.disabilities.1.problem')}</b>
            </p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u> {$t('outro.visual.4.disabilities.1.advice')}
            </p>
        </div>
    </ExpandableTile>
    <br aria-hidden="true"/>
    <ExpandableTile tileExpandedLabel={$t('outro.viewLess')} tileCollapsedLabel={$t('outro.viewMore')}>
        <div slot="above">
            <h2>{$t('outro.cognitive.title')}</h2>
        </div>
        <div slot="below">
            <h3>{$t('outro.cognitive.1.title')} {$t('outro.cognitive.1.disabilities.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> {$t('outro.cognitive.1.disabilities.1.problem')}</p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u> {$t('outro.cognitive.1.disabilities.1.advice')}</p>
            <br aria-hidden="true"/>
            <h3>{$t('outro.cognitive.2.title')} {$t('outro.cognitive.2.disabilities.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> <b>{$t('outro.cognitive.2.disabilities.1.problem')}</b>
            </p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u> {$t('outro.cognitive.2.disabilities.1.advice')}
            </p>
        </div>
    </ExpandableTile>
    <br aria-hidden="true"/>
    <ExpandableTile tileExpandedLabel={$t('outro.viewLess')} tileCollapsedLabel={$t('outro.viewMore')}>
        <div slot="above">
            <h2>{$t('outro.motor.title')}</h2>
        </div>
        <div slot="below">
            <h3>{$t('outro.motor.1.title')} {$t('outro.motor.1.disabilities.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> {$t('outro.motor.1.disabilities.1.problem')}</p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u>
                {$t('outro.motor.1.disabilities.1.cta.1.above')}
                <a href={$t('outro.motor.1.disabilities.1.cta.1.link')} target="_blank"
                   on:click|stopPropagation={() => console.debug("go to link")}
                >
                    {$t('outro.motor.1.disabilities.1.cta.1.label')}
                </a>
                .
            </p>
            <p class="tab">{$t('outro.motor.2.disabilities.1.advice')}</p>
            <br aria-hidden="true"/>
            <h3>{$t('outro.motor.2.title')} {$t('outro.motor.2.disabilities.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> {$t('outro.motor.2.disabilities.1.problem')}</p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u> {$t('outro.motor.1.disabilities.1.advice')}</p>
        </div>
    </ExpandableTile>
    <br aria-hidden="true"/>
    <ExpandableTile tileExpandedLabel={$t('outro.viewLess')} tileCollapsedLabel={$t('outro.viewMore')}>
        <div slot="above">
            <h2>{$t('outro.hearing.title')}</h2>
        </div>
        <div slot="below">
            <h3>{$t('outro.hearing.1.title')} {$t('outro.hearing.1.disabilities.1.title')}</h3>
            <p class="tab"><u
                    class="italic">{$t('outro.problem')}</u> {$t('outro.hearing.1.disabilities.1.problem')}</p>
            <p class="tab"><u
                    class="italic">{$t('outro.advice')}</u> {$t('outro.hearing.1.disabilities.1.advice')}</p>
        </div>
    </ExpandableTile>
{/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Column, ExpandableTile, Grid, ImageLoader, Row, } from "carbon-components-svelte";
  import { base } from "$app/paths";
  import {Step, t} from "$lib";
  import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
  import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
  import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
  import { onMount } from "svelte";
  import { changeSource } from "$lib/store/inMemoryStore/AudioStore";

  let showTransitionModal = true;
  let showTrapModal = false;
  let showScenario = true;
  let disabledFin = true;
  let showSummary = false;

  onMount(() => {
    changeSource("/ost/stress.mp3")
    renderStore.set(new RenderData($t('common.step.final'), $t('outro.neon.title'), $t('outro.neon.subtitle'), Step.FINAL));
  })
</script>

<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);

    .number {
        border: white 1px solid;
        padding: 0.3em;
    }

    h3 {
        margin-left: 2rem;
        font-size: 1.6rem;
    }

    .tab {
        margin-left: 4rem;
        font-size: 1.3rem;
    }

    .italic {
        font-style: italic;
    }

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
        left: 38%;
        position: relative;
    }
</style>

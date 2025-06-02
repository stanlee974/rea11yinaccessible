<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {
        Button,
        Column,
        Content,
        Grid,
        ImageLoader,
        Row,
        Slider,
        ToastNotification
    } from "carbon-components-svelte";
    import { base } from '$app/paths';
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import LoadingComponent from "$lib/technicalComponent/LoadingComponent.svelte";
    import { redirect, Step, t } from "$lib";
    import { onMount } from "svelte";
    import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
    import { changeSource } from "$lib/store/inMemoryStore/AudioStore";
    import { page } from "$app/stores";
    import { animationStore } from "$lib/store/AnimationStore";
    import { ESCAPEGAME_KEY } from "../constant";

    onMount(() => {
        changeSource("/ost/"+ ESCAPEGAME_KEY +"/step1.mp3")
        renderStore.set(new RenderData($t(`common.step.${ESCAPEGAME_KEY}.firstPlace`), $t(`${ESCAPEGAME_KEY}.firstPlace.neon.title`), $t(`${ESCAPEGAME_KEY}.firstPlace.neon.subtitle`), Step.FIRST_PLACE));
    })

    const goodOrder = [3, 2, 0, 1];
    let orderTyped: number[] = [];
    let showError = false;
    let hideScenario = true;
    let hideGoal = true;
    let showButtons = false;
    let isWaiting = false;
    let contrast = 0;
    let brightness = 0;
    let firstButtonLabel = " "
    let secondButtonLabel = " "
    let thirdButtonLabel = " "
    let fourthButtonLabel = " "

    const timeout: number = 4000;
    const validOrder = (id: number) => {
        if (!orderTyped.includes(id) && !showError) orderTyped.push(id)
        if (id === 0 && !isButtonPressed(firstButtonLabel)) firstButtonLabel = displayOrder(id)
        if (id === 1 && !isButtonPressed(secondButtonLabel)) secondButtonLabel = displayOrder(id)
        if (id === 2 && !isButtonPressed(thirdButtonLabel)) thirdButtonLabel = displayOrder(id)
        if (id === 3 && !isButtonPressed(fourthButtonLabel)) fourthButtonLabel = displayOrder(id)
        if (orderTyped.length >= 4) {
            if (JSON.stringify(orderTyped) == JSON.stringify(goodOrder)) {
                isWaiting = true;
                redirect($page.params.lang, `${ESCAPEGAME_KEY}/secondPlace`)
            } else {
                showError = true;
                orderTyped = [];
            }
        }
    }

    function displayOrder(id: number) {
        let number = orderTyped.indexOf(id)
        let position = number + 1
        return position > 0 ? position.toString() : ""
    }

    function isButtonPressed(button: string) {
        return button !== " "
    }

</script>

<style>
    @import url('https://fonts.cdnfonts.com/css/harjimed');
</style>

<ModalComponent
        parentDoneAction={() => hideScenario = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/firstPlace/enter.png" alt="" fadeIn={true}/>
            </Column>
            <Column>
                {#each $t(`${ESCAPEGAME_KEY}.firstPlace.before.row`) as row}
                    <p>{row}</p>
                {/each}
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<Content>
    <div class="container">
        <div class="mb-4">
            <TypewriterComponent disabled={hideScenario} delay={3000} parentDoneAction={() => {hideGoal = false}}>
                <h2 class="mb-1">{$t('common.layout.title.scenario')}</h2>
                {#each $t(`${ESCAPEGAME_KEY}.firstPlace.scenario.row`) as row, i}
                    <p class:quote={ i === 2 || i === 5} class:m-3={ i === 2 || i === 5 }>{row}</p>
                {/each}
            </TypewriterComponent>
        </div>
        <div class="mb-4">
            <TypewriterComponent disabled={hideGoal} parentDoneAction={() => showButtons = true}>
                <h2 class="mb-1">{$t('common.layout.title.goal')}</h2>
                {#each $t(`${ESCAPEGAME_KEY}.firstPlace.goal.row`) as row}
                    <p>{row}</p>
                {/each}
            </TypewriterComponent>
        </div>
        {#if showButtons}
            <div class="d-flex flex-row justify-content-space-between align-items-center">
                <Slider
                        labelText={$t(`${ESCAPEGAME_KEY}.firstPlace.test.contrast`)}
                        min={0}
                        max={100}
                        maxLabel="100"
                        value={contrast}
                        step={1}
                        style="align-items: normal; margin-right: 2em"
                        aria-hidden={$animationStore.disabilities.blind}
                        disabled={$animationStore.disabilities.blind}
                        on:input={(value) => {{contrast = value.detail}}}
                />
                <Column sm style="display: flex; flex-direction: column; text-align: center;">
                    <span>{firstButtonLabel}</span>
                    <Button
                            style="background-color:#0E160F; filter: contrast({contrast}%) brightness({brightness}%);"
                            class="coloredButton"
                            aria-label={$t(`${ESCAPEGAME_KEY}.firstPlace.test.buttons.green`)}
                            on:click={() => validOrder(0)} aria-pressed={isButtonPressed(firstButtonLabel)}></Button>
                </Column>
                <Column sm style="display: flex; flex-direction: column; text-align: center;">
                    <span>{secondButtonLabel}</span>
                    <Button
                            style="background-color:#16110E; filter: contrast({contrast}%) brightness({brightness}%);"
                            class="coloredButton"
                            aria-label={$t(`${ESCAPEGAME_KEY}.firstPlace.test.buttons.orange`)}
                            on:click={() => validOrder(1)} aria-pressed={isButtonPressed(secondButtonLabel)}>
                    </Button>
                </Column>
                <Column sm style="display: flex; flex-direction: column; text-align: center;">
                    <span>{thirdButtonLabel}</span>
                    <Button
                            style="background-color:#161113; filter: contrast({contrast}%) brightness({brightness}%);"
                            class="coloredButton"
                            aria-label={$t(`${ESCAPEGAME_KEY}.firstPlace.test.buttons.rose`)}
                            on:click={() => validOrder(2)} aria-pressed={isButtonPressed(thirdButtonLabel)}>
                    </Button>
                </Column>
                <Column sm style="display: flex; flex-direction: column; text-align: center;">
                    <span>{fourthButtonLabel}</span>
                    <Button
                            style="background-color:#16150E; filter: contrast({contrast}%) brightness({brightness}%);"
                            class="coloredButton"
                            aria-label={$t(`${ESCAPEGAME_KEY}.firstPlace.test.buttons.yellow`)}
                            on:click={() => validOrder(3)} aria-pressed={isButtonPressed(fourthButtonLabel)}>
                    </Button>
                </Column>
                <Slider
                        labelText={$t(`${ESCAPEGAME_KEY}.firstPlace.test.brightness`)}
                        min={0}
                        max={100}
                        maxLabel="100"
                        value={brightness}
                        step={1}
                        aria-hidden={$animationStore.disabilities.blind}
                        disabled={$animationStore.disabilities.blind}
                        style="align-items: normal; margin-left: 2rem"
                        on:input={(value) => {{brightness = value.detail}}}
                />
            </div>
            {#if isWaiting}
                <LoadingComponent/>
            {/if}
        {/if}
        {#if showError}
            <ToastNotification
                    lowContrast
                    fullWidth
                    kind="error"
                    title={$t(`${ESCAPEGAME_KEY}.firstPlace.test.error.title`)}
                    subtitle={$t(`${ESCAPEGAME_KEY}.firstPlace.test.error.message`)}
                    caption={$t(`${ESCAPEGAME_KEY}.firstPlace.test.error.caption`)}
                    {timeout}
                    on:close={(e) => {
                        showError = false;
                        firstButtonLabel = " "
                        secondButtonLabel = " "
                        thirdButtonLabel = " "
                        fourthButtonLabel = " "
                      }}
            />
        {/if}
    </div>
</Content>

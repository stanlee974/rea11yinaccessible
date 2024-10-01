<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Column, FluidForm, Grid, ImageLoader, Loading, Row, TextInput,} from "carbon-components-svelte";
    import dyslexia from "dyslexia";
    import {base} from '$app/paths';
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {onMount} from "svelte";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {locale, redirect, setLocale, Step, t} from "$lib";
    import {page} from "$app/stores";

    let showScenario = true;
    let showEnigm = false;
    let disableGoal = true;
    let showForm = false;
    let isWaiting = false;
    let enigm1 = ""
    let enigm2 = ""
    let enigm3 = ""

    let overlay: HTMLElement;
    let content: HTMLElement;

    onMount(() => {
        changeSource("/ost/step4.mp3")
        renderStore.set(new RenderData($t('common.step.shelterSearchCenterRoom'), $t('shelterSearchCenterRoom.neon.title'), $t('shelterSearchCenterRoom.neon.subtitle'), Step.ABRI_SEARCHCENTER));
    })

    const disturbedImageUrls = [
        base + "/abri/search_center/disturb/1.png",
        base + "/abri/search_center/disturb/2.png",
        base + "/abri/search_center/disturb/3.png",
        base + "/abri/search_center/disturb/4.jpg",
        base + "/abri/search_center/disturb/5.png",
        base + "/abri/search_center/disturb/6.jpg",
        base + "/abri/search_center/disturb/7.jpg"
    ];

    const getDisturbedImage = () => {
        const index = Math.floor(Math.random() * disturbedImageUrls.length);
        return disturbedImageUrls[index];
    }

    const hideOverlay = () => {
        if (overlay) {
            overlay.style.display = 'none';
        }
        const randomDelay = Math.random() * 2000 + 2000;
        setTimeout(showOverlay, randomDelay);
    }

    const showOverlay = () => {
        if (content) {
            content.innerHTML = `<img src="${getDisturbedImage()}" alt="">`;
        }
        if (overlay) {
            overlay.style.display = 'flex';
        }
        const randomDelay = Math.random() * 2000 + 2000;
        setTimeout(hideOverlay, randomDelay);
    }

    $: invalidEnigm1 = !new RegExp($t('shelterSearchCenterRoom.test.response.1'), 'i').test(enigm1);
    $: invalidEnigm2 = !new RegExp($t('shelterSearchCenterRoom.test.response.2'), 'i').test(enigm2);
    $: invalidEnigm3 = !new RegExp($t('shelterSearchCenterRoom.test.response.3'), 'i').test(enigm3);

    const validateForm = (): void => {
        if (new RegExp($t('shelterSearchCenterRoom.test.response.1'), 'i').test(enigm1)
            && new RegExp($t('shelterSearchCenterRoom.test.response.2'), 'i').test(enigm2)
            && new RegExp($t('shelterSearchCenterRoom.test.response.3'), 'i').test(enigm3)) {
            isWaiting = true;
            redirect($page.params.lang, "surface/entrance")
        }
    }

</script>

<style lang="css">
    body {
        font-size: 24px;
        margin: 0;
        padding: 0;
    }

    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    #content {
        text-align: center;
        color: black;
        animation: moveContent 10s infinite, fadeInOut 5s infinite;
    }

    @keyframes moveContent {
        0% {
            transform: translate(0, 0);
        }
        10% {
            transform: translate(50vw, 10vh);
        }
        20% {
            transform: translate(-30vw, 20vh);
        }
        30% {
            transform: translate(20vw, -30vh);
        }
        40% {
            transform: translate(-10vw, 40vh);
        }
        50% {
            transform: translate(30vw, -10vh);
        }
        60% {
            transform: translate(-50vw, 50vh);
        }
        70% {
            transform: translate(10vw, -20vh);
        }
        80% {
            transform: translate(-20vw, 30vh);
        }
        90% {
            transform: translate(40vw, -40vh);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    @keyframes fadeInOut {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
</style>

<ModalComponent
        parentDoneAction={() => {showScenario = false; showOverlay()}}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/abri/search_center/zone.jpg"
                        alt="" fadeIn={true}/>
            </Column>
            <Column>
                <p>{$t('shelterSearchCenterRoom.before.row.1')}</p>
                <p>{$t('shelterSearchCenterRoom.before.row.2')}</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={showScenario} parentDoneAction={() => disableGoal = false}>
    <div>
        <div class="container mb-3">
            <h2 class="mb-2">{$t('common.layout.title.scenario')}</h2>
            <p>{$t('shelterSearchCenterRoom.scenario.row.1')}</p>
            <p>{dyslexia($t('shelterSearchCenterRoom.scenario.row.2'), {scrambleChance: 90})}</p>
        </div>
    </div>
</TypewriterComponent>
<TypewriterComponent disabled={disableGoal} continueButtonAction={() => showEnigm = true} waitReading>
    <div>
        <div class="container mb-5">
            <h2 class="mb-2">{$t('common.layout.title.goal')}</h2>
            <p>{$t('shelterSearchCenterRoom.goal.row.1')}</p>
        </div>
    </div>
</TypewriterComponent>
<ModalComponent opened={showEnigm} modalHeading={$t('shelterSearchCenterRoom.goal.modal.1.title')}
                parentDoneAction={() => {disableGoal = false; showForm = true; showEnigm = false}}>
    <Grid>
        <Row>
            <Column>
                <div class="mb-3">
                    <h2>{$t('shelterSearchCenterRoom.goal.modal.riddle')} 1</h2>
                    <p>{$t('shelterSearchCenterRoom.goal.modal.1.row.1')}</p>
                </div>
                <div class="mb-3">
                    <h2>{$t('shelterSearchCenterRoom.goal.modal.riddle')} 2</h2>
                    <p class="mb-3">{$t('shelterSearchCenterRoom.goal.modal.1.row.2')}</p>
                </div>
                <div class="mb-3">
                    <h2>{$t('shelterSearchCenterRoom.goal.modal.riddle')} 3</h2>
                    <p class="mb-3">{$t('shelterSearchCenterRoom.goal.modal.1.row.3')}</p>
            </div>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
{#if showForm}
    <div>
        <div class="container mb-4">
            <FluidForm class="d-flex flex-row justify-content-arount riddle-form">
                <TextInput labelText={$t('shelterSearchCenterRoom.test.buttons.enigm1.text')}
                           placeholder={$t('shelterSearchCenterRoom.test.buttons.enigm1.placeholder')}
                           required invalid={invalidEnigm1}
                           invalidText={$t('shelterSearchCenterRoom.test.buttons.enigm1.error')}
                           autofocus bind:value={enigm1}/>
                <TextInput labelText={$t('shelterSearchCenterRoom.test.buttons.enigm2.text')}
                           placeholder={$t('shelterSearchCenterRoom.test.buttons.enigm2.placeholder')}
                           required invalid={invalidEnigm2}
                           invalidText={$t('shelterSearchCenterRoom.test.buttons.enigm2.error')}
                           bind:value={enigm2}/>
                <TextInput labelText={$t('shelterSearchCenterRoom.test.buttons.enigm3.text')}
                           placeholder={$t('shelterSearchCenterRoom.test.buttons.enigm3.placeholder')}
                           required invalid={invalidEnigm3}
                           invalidText={$t('shelterSearchCenterRoom.test.buttons.enigm3.error')}
                           bind:value={enigm3}/>
            </FluidForm>
            <Row class="mt-2 d-flex flex-row justify-content-center">
                <Button kind="secondary" on:click={() => showEnigm = true}
                        class="me-3">{$t('shelterSearchCenterRoom.test.buttons.hint.text')}
                </Button>
                <Button kind="primary"
                        on:click={() => validateForm()}>{$t('shelterSearchCenterRoom.test.buttons.submit.text')}</Button>
            </Row>
        </div>
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}
<div id="overlay" bind:this={overlay}>
    <div id="content" bind:this={content}>
    </div>
</div>

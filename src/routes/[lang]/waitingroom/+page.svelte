<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import "plyr/dist/plyr.css";
    import {Button, Content, ToastNotification} from "carbon-components-svelte";
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import {base} from "$app/paths";
    import ButtonComponent from "$lib/technicalComponent/ButtonComponent.svelte";
    import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
    import {onMount} from "svelte";
    import LoadingComponent from "$lib/technicalComponent/LoadingComponent.svelte";
    import {locale, setLocale, Step, t} from "$lib";
    import {audioStore, changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {page} from "$app/stores";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import Plyr from 'plyr';
    import {getAccessibilityModeStoreQueryParam, initCountdown} from "$lib/store/AnimationStore";
    import {get} from "svelte/store";
    import {headerStore} from "$lib/store/HeaderStore";
    import {driver} from "driver.js";

    let disableWriter = true
    let isWaiting = false
    let showButton = false
    let showTour = false
    let showError = false
    let startButton = false
    let errorSound: HTMLAudioElement;
    const loading = () => {
        isWaiting = true
    }
    onMount(() => {
        renderStore.set(new RenderData($t(`common.step.${Step.WAITING_ROOM}`), "", "", Step.WAITING_ROOM, $renderStore.disabilities));
        setLocale($page.params.lang)
        document.body.lang = $page.params.lang ?? "fr"
        document.title = $t('common.step.waitingRoom') + " | really inaccessible"
        errorSound = new Audio(base + "/sound/error.mp3")
        errorSound.volume = 0.5
        changeSource("/ost/opening.mp3")
        startButton = true
        const player = new Plyr('#teaserPlayer', {
            "captions": {"active": "true", "language": $page.params.lang},
            "volume": $headerStore.songVolume / 10
        });
        headerStore.subscribe((value) => {
            player.volume = value.songVolume / 10
        })
        const audioElement = get(audioStore);
        player.on('play', (event) => {
            audioElement.pause()
        });
        player.on('pause', (event) => {
            if ($headerStore.playSong) {
                $audioStore.play()
                $audioStore.volume = $headerStore.songVolume / 100
            }
        });
    })
    const oxygenTour = driver({
        popoverClass: "custom-theme",
        showProgress: false,
        allowClose: false,
        showButtons: ["next"],
        doneBtnText: $t("common.highlight.button.done"),
        steps: [
            {
                element: '#oxygen',
                popover: {title: $t("common.header.oxygen.title"), description: $t("common.highlight.oxygen")}
            },
        ],
        onNextClick: (element) => {
            showTour = true
            initCountdown()
            oxygenTour.destroy()
        }
    });
</script>
<style lang="css">
    #start-button-block {
        position: relative;
    }

    #troll-block {
        position: absolute;
        left: 53%;
        bottom: -30px;
        padding-right: 2rem;
        padding-left: 2rem;
    }

    #teaser-video-container {
        width: 800px;
    }

    #teaser-video-title {
        margin-top: 2rem !important;
        font-size: 2rem;
        font-weight: 400;
        line-height: 1.25;
        letter-spacing: 0;
    }

    :global(.driver-popover.custom-theme) {
        background-color: #393939;
        color: #FFFFFF;
    }

    :global(.driver-popover.custom-theme .driver-popover-title) {
        font-size: 20px;
    }

    :global(.driver-popover.custom-theme .driver-popover-title),
    :global(.driver-popover.custom-theme .driver-popover-description),
    :global(.driver-popover.custom-theme .driver-popover-progress-text) {
        color: #FFFFFF;
    }

    :global(.driver-popover.custom-theme .driver-popover-description) {
        font-size: 16px;
    }

    :global(.driver-popover.custom-theme button) {
        flex: 1;
        text-align: center;
        background-color: #000 !important;
        color: #ffffff;
        border: 2px solid #000;
        text-shadow: none;
        font-size: 16px;
        padding: 5px 8px;
        border-radius: 6px;
    }

    :global(.driver-popover.custom-theme button:hover) {
        background-color: #000;
        color: #ffffff;
    }

    :global(.driver-popover.custom-theme .driver-popover-navigation-btns) {
        justify-content: space-between;
        gap: 3px;
    }

    :global(.driver-popover.custom-theme .driver-popover-close-btn),
    :global(.driver-popover.custom-theme .driver-popover-close-btn:hover) {
        color: #9b9b9b;
        background-color: #393939;
        border-color: #393939;
        font-size: 2rem;

    }

    :global(.driver-popover.custom-theme .driver-popover-arrow-side-left.driver-popover-arrow) {
        border-left-color: #393939;
    }

    :global(.driver-popover.custom-theme .driver-popover-arrow-side-right.driver-popover-arrow) {
        border-right-color: #393939;
    }

    :global(.driver-popover.custom-theme .driver-popover-arrow-side-top.driver-popover-arrow) {
        border-top-color: #393939;
    }

    :global(.driver-popover.custom-theme .driver-popover-arrow-side-bottom.driver-popover-arrow) {
        border-bottom-color: #393939;
    }
</style>

<div class="d-flex flex-column align-items-center mt-4">
    <span class="mb-4" id="teaser-video-title">{$t('waitingRoom.playVideo')}</span>
    <div id="teaser-video-container">
        <div id="teaserPlayer" data-plyr-provider="youtube" data-plyr-embed-id="4EzZ4Na1rtk"></div>
    </div>
</div>
<ButtonComponent enabled={startButton} onclick={() => {disableWriter = false; }}><span slot="content"
                                                                                       class="d-flex flex-row align-items-center">{$t('waitingRoom.test.startButton')}
    <ContinueFilled class="ms-2"/></span></ButtonComponent>
<Content id="scenario">
    <div class="container">
        <TypewriterComponent mode="scramble" disabled={disableWriter}>
            <h1>{$t('waitingRoom.welcome')}</h1>
        </TypewriterComponent>
        <TypewriterComponent disabled={disableWriter} waitReading continueButtonAction={() => {oxygenTour.drive()}}
                             delay={3000} }>
            <div class="mb-4">
                <h2 class="mb-3">{$t('common.layout.title.scenario')}</h2>
                <p>{$t(`waitingRoom.scenario.row.1`)}</p>
                <p>{$t('waitingRoom.scenario.row.2')}</p>
                <p>{$t('waitingRoom.scenario.row.3')}</p>
            </div>
        </TypewriterComponent>
        <TypewriterComponent disabled={!showTour} parentDoneAction={() => showButton = true}>
            <div class="mb-5">
                <h2 class="mb-3">{$t('common.layout.title.goal')}</h2>
                <p>{$t('waitingRoom.goal.row.1')}</p>
                <p>{$t('waitingRoom.goal.row.2')}</p>
                <p>{$t('waitingRoom.test.clickLink')} <a class="disabled-link"
                                                         href="{base}/{$locale}/abri/entrance{getAccessibilityModeStoreQueryParam()}"
                                                         on:click={() => loading()}>{$t('waitingRoom.test.here')}</a>
                    {$t('waitingRoom.test.enter')}
                </p>
            </div>
        </TypewriterComponent>
        <div id="start-button-block">
            {#if showButton}
                <Button kind="primary"
                        class="main-button d-flex flex-row align-items-center"
                        on:click={() => {errorSound.play(); showError = true}}>
                    {$t('waitingRoom.test.startButton')}
                    <ContinueFilled class="ms-2"/>
                </Button>
            {/if}
            {#if showError}
                <div id="troll-block">
                    <img src="{base}/troll.gif" alt="" aria-hidden="true"/>
                    <ToastNotification
                            lowContrast
                            fullWidth
                            kind="error"
                            title={$t('waitingRoom.test.error.title')}
                            subtitle={$t('waitingRoom.test.error.content')}
                            on:close={() => {showError = false}}
                    />
                </div>
            {/if}
        </div>
    </div>
    {#if isWaiting}
        <LoadingComponent/>
    {/if}
</Content>
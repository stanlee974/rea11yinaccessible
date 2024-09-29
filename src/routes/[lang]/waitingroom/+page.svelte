<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import "plyr/dist/plyr.css";
    import {Button, Column, Content, Grid, ImageLoader, Row, ToastNotification} from "carbon-components-svelte";
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import {base} from "$app/paths";
    import ButtonComponent from "$lib/technicalComponent/ButtonComponent.svelte";
    import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
    import {onMount} from "svelte";
    import LoadingComponent from "$lib/technicalComponent/LoadingComponent.svelte";
    import {setLocale, t, locale, Step} from "$lib";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {page} from "$app/stores";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import { getAccessibilityModeStoreQueryParam } from '$lib/store/AccessibilityModeStore';
    import Plyr from 'plyr';

    let disableWriter = true
    let isWaiting = false
    let showButton = false
    let showError = false
    let startButton = false
    let errorSound: HTMLAudioElement;
    const loading = () => {
        isWaiting = true
    }
    onMount(() => {
        renderStore.set(new RenderData($t(`common.step.${Step.WAITING_ROOM}`), "", "", Step.WAITING_ROOM));
        setLocale($page.params.lang)
        document.body.lang = $page.params.lang ?? "fr"
        document.title = $t('common.step.waitingRoom') + " | really inaccessible"
        errorSound = new Audio(base + "/sound/error.mp3")
        errorSound.volume = 0.5
        changeSource("/ost/opening.mp3")
        startButton = true
        const player = new Plyr('#teaserPlayer', { "captions": { "active": "true", "language": $page.params.lang} });
    })

</script>
<style lang="css">
    @import url(/css/glitch.css);

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
</style>

<div class="d-flex flex-column align-items-center mt-4">
    <span class="mb-4" id="teaser-video-title">{$t('waitingRoom.playVideo')}</span>
    <div id="teaser-video-container">
        <div id="teaserPlayer" data-plyr-provider="youtube" data-plyr-embed-id="4EzZ4Na1rtk"></div>
    </div>
</div>
<ButtonComponent enabled={startButton} onclick={() => {disableWriter = false}}><span slot="content" class="d-flex flex-row align-items-center">{$t('waitingRoom.test.startButton')}<ContinueFilled class="ms-2"/></span></ButtonComponent>
<Content id="scenario">
    <div class="container">
        <TypewriterComponent mode="scramble" disabled={disableWriter}>
            <h1>{$t('waitingRoom.welcome')}</h1>
        </TypewriterComponent>
        <TypewriterComponent disabled={disableWriter} delay={3000} parentDoneAction={() => showButton = true}>
            <div>
                <div class="mb-4">
                    <h2 class="mb-3">{$t('common.layout.title.scenario')}</h2>
                    <p>{$t(`waitingRoom.scenario.row.1`)}</p>
                    <p>{$t('waitingRoom.scenario.row.2')}</p>
                    <p>{$t('waitingRoom.scenario.row.3')}</p>
                </div>
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
            </div>
        </TypewriterComponent>
        <div id="start-button-block">
            {#if showButton}
                <Button kind="primary"
                    class="main-button d-flex flex-row align-items-center"
                    on:click={() => {errorSound.play(); showError = true}}>
                    {$t('waitingRoom.test.startButton')}<ContinueFilled class="ms-2"/>
                </Button>
            {/if}
            {#if showError}
                <div id="troll-block">
                    <img src="{base}/troll.gif" alt="" aria-hidden={true}/>
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
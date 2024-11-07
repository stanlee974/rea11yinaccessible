<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Checkbox, Content, InlineNotification, ListItem, UnorderedList} from "carbon-components-svelte";
    import {PlayFilled} from "carbon-icons-svelte";
    import {redirect, setLocale, t} from "$lib";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {animationStore, updateDisabilities} from "$lib/store/AnimationStore";
    import {closeAppTour, headerStore} from "$lib/store/HeaderStore";
    import {driver} from "driver.js";

    let blind: boolean = false
    let epilepsy: boolean = false

    onMount(() => {
        setLocale($page.params.lang)
        document.body.lang = $page.params.lang ?? "fr"
        document.title = $t('common.step.intro') + " | really inaccessible"
        document.body.scrollIntoView()
        changeSource("/ost/intro.mp3")
        animationStore.subscribe(({disabilities}) => {
            blind = disabilities.blind
            epilepsy = disabilities.epilepsy
        });
        const driverObj = driver({
            popoverClass: "custom-theme",
            showProgress: false,
            prevBtnText: $t("common.highlight.button.previous"),
            nextBtnText: $t("common.highlight.button.next"),
            doneBtnText: $t("common.highlight.button.done"),
            allowClose: false,
            steps: [
                {
                    element: '#hint',
                    popover: {title: $t("common.header.hint.tooltip"), description: $t("common.highlight.hint")}
                },
                {
                    element: '#song',
                    popover: {title: $t("common.header.audio"), description: $t("common.highlight.audio")}
                },
                {
                    element: '#language',
                    popover: {title: $t('common.header.language'), description: $t("common.highlight.language")}
                },
                {
                    element: '#disabilityBlind',
                    popover: {
                        title: $t('common.header.customization'),
                        description: $t("intro.disability.blind")
                    }
                },
                {
                    element: '#disabilityEpilepsy',
                    popover: {
                        title: $t('common.header.customization'),
                        description: $t("intro.disability.epilepsy")
                    }
                }
            ],
            onDestroyed : () => {
                closeAppTour();
            }
        });
        if (!$animationStore.disabilities.blind && !$headerStore.appTourIsDone) {
            driverObj.drive();
        }
    })
</script>

<style lang="css">
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
        background-color: #000;
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
<Content id="scenario">
    <div class="container">
        <h1 lang="en" class="my-4">{$t('intro.welcome')}</h1>
        <div class="mb-4">
            <h2 class="mb-1">{$t('intro.context.title')}</h2>
            <p>{$t('intro.context.welcome')}</p>
            <p>{$t('intro.context.explanation')}</p>
        </div>
        <div class="mb-4">
            <h2 class="mb-1" id="disabilities">{$t('intro.theme.title')}</h2>
            <UnorderedList aria-labelledby="disabilities" class="ms-4">
                <ListItem>{$t('intro.theme.disabilities.visual')}</ListItem>
                <ListItem>{$t('intro.theme.disabilities.hearing')}</ListItem>
                <ListItem>{$t('intro.theme.disabilities.cognitive')}</ListItem>
                <ListItem>{$t('intro.theme.disabilities.motor')}</ListItem>
            </UnorderedList>
        </div>
        <div>
            <h2>{$t('intro.advice.info.title')}</h2>
            <InlineNotification kind="info" lowContrast hideCloseButton="true">
                <strong slot="title" id="advice-immersive">{$t('intro.advice.info.content.0')}</strong>
                <div slot="subtitle">
                    <UnorderedList aria-labelledby="advice-immersive" class="ms-4">
                        <ListItem>{$t('intro.advice.info.content.1')}</ListItem>
                        <ListItem>{$t('intro.advice.info.content.2')}</ListItem>
                    </UnorderedList>
                </div>
            </InlineNotification>
            <InlineNotification kind="warning" lowContrast hideCloseButton="true">
                <strong slot="title" id="advice-warning">{$t('intro.advice.warning.title')}</strong>
                <div slot="subtitle">
                    <UnorderedList aria-labelledby="advice-warning" class="ms-4">
                        <ListItem>{$t('intro.advice.warning.content')}</ListItem>
                    </UnorderedList>
                </div>
            </InlineNotification>
            <InlineNotification kind="error" lowContrast hideCloseButton="true">
                <strong slot="title" id="advice-danger">{$t('intro.advice.danger.title')}</strong>
                <div slot="subtitle">
                    <UnorderedList aria-labelledby="advice-danger" class="ms-4">
                        <ListItem>{$t('intro.advice.danger.content')}</ListItem>
                    </UnorderedList>
                </div>
            </InlineNotification>
            <p>{$t('intro.disability.title')}</p>
            <div role="group">
                <div class="mx-3 my-2">
                    <Checkbox bind:checked={epilepsy}
                              labelText={$t('intro.disability.epilepsy')}
                              value="true" />
                </div>
                <div class="mx-3 my-2">
                    <Checkbox bind:checked={blind}
                              labelText={$t('intro.disability.blind')}
                              value="true" />
                </div>
            </div>
        </div>
        <div class="d-flex flex-row justify-content-center p-3">
            <Button kind="primary" icon="{PlayFilled}"
                    on:click={() => {
                updateDisabilities({
                    blind,
                    epilepsy
                })
                redirect($page.params.lang, "waitingroom")
            }}>{$t('intro.button.start')}</Button>
        </div>
    </div>
</Content>

<Content id="scenario">
    <div class="container">
        <h1 lang="en" class="mb-4">{$t('intro.welcome')}</h1>
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
            <h2>{$t('intro.advice.title')}</h2>
            <InlineNotification kind="info" lowContrast hideCloseButton="true">
                <strong slot="title" id="advice-immersive">{$t('intro.advice.immersive')}</strong>
                <div slot="subtitle">
                    <UnorderedList aria-labelledby="advice-immersive" class="ms-4">
                        <ListItem>{$t('intro.advice.sound')}</ListItem>
                        <ListItem>{$t('intro.advice.fullScreen')}</ListItem>
                    </UnorderedList>
                </div>
            </InlineNotification>
            <InlineNotification kind="warning" lowContrast hideCloseButton="true">
                <strong slot="title" id="advice-blocked">{$t('intro.advice.blocked')}</strong>
                <div slot="subtitle">
                    <UnorderedList aria-labelledby="advice-blocked" class="ms-4">
                        <ListItem>{$t('intro.advice.hints.0')}</ListItem>
                        <ListItem>{$t('intro.advice.hints.1')}</ListItem>
                    </UnorderedList>
                </div>
            </InlineNotification>
        </div>
    </div>
    <div class="d-flex flex-row justify-content-center p-3">
        <Button kind="primary" icon="{PlayFilled}"
            on:click={() => {
                redirect($page.params.lang, "waitingroom")
            }}>{$t('intro.button.start')}</Button>
    </div>
</Content>
<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Content, UnorderedList, ListItem, InlineNotification } from "carbon-components-svelte";
    import {PlayFilled} from "carbon-icons-svelte";
    import {locale, redirect, setLocale, t} from "$lib";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {onMount} from "svelte";
    import {page} from "$app/stores";

    onMount(() => {
        setLocale($page.params.lang)
        document.body.lang = $page.params.lang ?? "fr"
        document.title = $t('common.step.intro') + " | really inaccessible"
        document.body.scrollIntoView()
        changeSource("/ost/intro.mp3")
    })

</script>

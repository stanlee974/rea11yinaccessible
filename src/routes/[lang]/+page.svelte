<Content id="scenario" style="background-color: #161616;">
    <h1 lang="en">Really Inaccessible</h1>
    <br aria-hidden="true"/>
    <br aria-hidden="true"/>
    <h2>{$t('intro.advice.title')}</h2>
    <p style="font-size: 1.6rem">{$t('intro.advice.immersive')}</p>
    <p style="font-size: 1.3rem">{$t('intro.advice.sound')}</p>
    <p style="font-size: 1.3rem">{$t('intro.advice.fullScreen')}</p>
    <p style="font-size: 1.6rem">{$t('intro.advice.blocked')}</p>
    <p style="font-size: 1.3rem">{$t('intro.advice.hints')}</p>
    <br aria-hidden="true"/>
    <h2>{$t('intro.context.title')}</h2>
    <p style="font-size: 1.3rem">{$t('intro.context.welcome')}</p>
    <p style="font-size: 1.3rem">{$t('intro.context.explanation')}</p>
    <br aria-hidden="true"/>
    <br aria-hidden="true"/>
    <h2>{$t('intro.theme.title')}</h2>
    <p style="font-size: 1.3rem">{$t('intro.theme.disabilities.visual')}</p>
    <p style="font-size: 1.3rem">{$t('intro.theme.disabilities.hearing')}</p>
    <p style="font-size: 1.3rem">{$t('intro.theme.disabilities.cognitive')}</p>
    <p style="font-size: 1.3rem">{$t('intro.theme.disabilities.motor')}</p>
</Content>
<Button kind="secondary"
        style="left: 46%; padding-right: 2.5rem; padding-left: 2.5rem; margin-top: 2rem; margin-bottom: 2rem"
        on:click={() => {
            redirect($page.params.lang, "waitingroom")
        }}>{$t('intro.button.start')}
</Button>
<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Content} from "carbon-components-svelte";
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

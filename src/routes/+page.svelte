<Content id="scenario" style="background-color: #161616;">
    <h1 lang="en">{$t('common.title')}</h1>
    <br/>
    <br/>
    <h2>{$t('intro.advice.title')}</h2>
    <p style="font-size: 1.6rem">{$t('intro.advice.immersive')}</p>
    <p style="font-size: 1.3rem">{$t('intro.advice.sound')}</p>
    <p style="font-size: 1.3rem">{$t('intro.advice.fullScreen')}</p>
    <p style="font-size: 1.6rem">{$t('intro.advice.blocked')}</p>
    <p style="font-size: 1.3rem">{$t('intro.advice.hints')}</p>
    <br/>
    <h2>{$t('intro.context.title')}</h2>
    <p style="font-size: 1.3rem">{$t('intro.context.welcome')}</p>
    <p style="font-size: 1.3rem">{$t('intro.context.explanation')}</p>
    <br/>
    <br/>
    <h2>{$t('intro.theme.title')}</h2>
    <p style="font-size: 1.3rem">{$t('intro.theme.disabilities.visual')}</p>
    <p style="font-size: 1.3rem">{$t('intro.theme.disabilities.hearing')}</p>
    <p style="font-size: 1.3rem">{$t('intro.theme.disabilities.cognitive')}</p>
    <p style="font-size: 1.3rem">{$t('intro.theme.disabilities.motor')}</p>
</Content>
<Button kind="secondary"
        style="left: 46%; padding-right: 2.5rem; padding-left: 2.5rem; margin-top: 2rem; margin-bottom: 2rem"
        on:click={() => {
            goto("/waitingroom")
        }}>{$t('intro.button.start')}
</Button>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button, Content } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { t } from "$lib";
  import { changeSource } from "$lib/store/inMemoryStore/AudioStore";
  import { onMount } from "svelte";

  onMount(() => {
    changeSource("/ost/intro.mp3")
  })

</script>

<div id="glitch-body">
    <div id="glitch" class="glitch" style="margin: 5rem 3rem 5rem;">
        <ImageLoader
                src="{base}/logo_alt.png" alt="logo of really inaccessible" fadeIn={true}
        />
    </div>
</div>
<ButtonComponent onclick={() => {disableWriter = false}} enabled={startButton}><img slot="content"
                                                                                    src="{base}/arrow-down.svg"
                                                                                    aria-label="Start the escape game"/>
</ButtonComponent>
<Content id="scenario" style="background-color: #161616; margin-top: 0">
    <Grid>
        <Row>
            <Column>
                <TypewriterComponent mode="scramble" disabled={disableWriter}>
                    <h1>{$t('waitingRoom.welcome')}</h1>
                </TypewriterComponent>
                <TypewriterComponent disabled={disableWriter} delay={3000} parentDoneAction={() => showButton = true}>
                    <h2><u><i>{$t('waitingRoom.scenario.title')}</i></u></h2>
                    <p>{$t('waitingRoom.scenario.row.1')}</p>
                    <p>{$t('waitingRoom.scenario.row.2')}</p>
                    <p>{$t('waitingRoom.scenario.row.3')}</p>
                    <h2><u><i>{$t('waitingRoom.goal.title')}</i></u></h2>
                    <p>{$t('waitingRoom.goal.row.1')}</p>
                    <p>{$t('waitingRoom.goal.row.2')}</p>
                    <p>{$t('waitingRoom.test.clickLink')} <a style:text-decoration="none" style:cursor="auto" style:color="#F4F4F4"
                                                             href="/abri/entrance" on:click={() => {
                        loading();
                    }}>{$t('waitingRoom.test.here')}</a>
                        {$t('waitingRoom.test.enter')}
                    </p>
                </TypewriterComponent>
                <br aria-hidden="true"/>
                {#if showButton}
                    <Button kind="secondary"
                            style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            cursor: pointer;
            "
                            on:click={() => {errorSound.play(); showError = true}}
                            autofocus>
                        {$t('waitingRoom.test.startButton')}
                    </Button>
                {/if}
                {#if showError}
                    <div
                            style="position: absolute; left: 53%; padding-right: 2rem; padding-left: 2rem;">
                        <img src="{base}/troll.gif" aria-hidden="true"/>
                        <ToastNotification
                                lowContrast
                                fullWidth
                                kind="error"
                                title={$t('waitingRoom.test.error.title')}
                                subtitle={$t('waitingRoom.test.error.content')}
                        />
                    </div>
                {/if}
            </Column>
        </Row>
    </Grid>
    {#if isWaiting}
        <LoadingComponent/>
    {/if}
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button, Column, Content, Grid, ImageLoader, Row, ToastNotification } from "carbon-components-svelte";
  import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
  import { base } from "$app/paths";
  import ButtonComponent from "$lib/technicalComponent/ButtonComponent.svelte";
  import { onMount } from "svelte";
  import LoadingComponent from "$lib/technicalComponent/LoadingComponent.svelte";
  import { t } from "$lib";
  import { changeSource } from "$lib/store/inMemoryStore/AudioStore";

  let disableWriter = true
  let isWaiting = false
  let showButton = false
  let showError = false
  let startButton = true
  let errorSound: HTMLAudioElement;
  const loading = () => {
    isWaiting = true
  }
  onMount(() => {
    errorSound = new Audio(base + "/sound/error.mp3")
    errorSound.volume = 0.5
    changeSource("/ost/opening.mp3")
  })

</script>
<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);
    @import url(/css/glitch.css);
</style>

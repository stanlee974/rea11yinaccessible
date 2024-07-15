<Header style="margin-bottom: 3rem">
    <title>{"really inaccessible | " + title.toString()}</title>
    <Row style="flex: content; flex-direction: row; align-items: center;">
        <div style:width="100%" style:max-width="250px" style:margin-right="1rem">
            <a href="{base}/">
                <ImageLoader
                        src="{base}/logo.png" alt="logo of really inaccessible" fadeIn={true}
                />
            </a>
        </div>
        <HeaderNav>
            <HeaderNavItem href="https://www.deque.com/axe/" text="Axe-core - test accessibilité" target="_blank"/>
            <HeaderNavMenu text="Réferentiel">
                <HeaderNavItem href="https://www.w3.org/WAI/WCAG22/Understanding/" text="WCAG" target="_blank"/>
                <HeaderNavItem href="https://accessibilite.numerique.gouv.fr/W3C" text="RGAA" target="_blank"/>
            </HeaderNavMenu>
            <HeaderNavMenu text="UUV - test E2E accessibilité">
                <HeaderNavItem href="https://github.com/Orange-OpenSource/uuv" text="Github" target="_blank"/>
                <HeaderNavItem href="https://orange-opensource.github.io/uuv/" text="Documentation"
                               target="_blank"/>
                <HeaderNavItem href="https://github.com/e2e-test-quest/kata-e2e-uuv" text="Kata (exercism)"
                               target="_blank"/>
            </HeaderNavMenu>
            <HeaderNavItem href="https://github.com/stanlee974/rea11yinaccessible" text="Source Code"
                           target="_blank"/>
        </HeaderNav>
    </Row>
    <ContentSwitcher selectedIndex={0} size="sm" style="width: 10rem; margin-right: 1rem;">
        <!--{#each availableLocales as local}-->
        <!--    <Switch text={local} on:click={updateLocal(event)}/>-->
        <!--{/each}-->
    </ContentSwitcher>
</Header>
<Tile style="position: sticky; top: 3rem; position: flex; flex-direction: row; z-index: 2000">
    <HeaderUtilities>
        <Slider
                labelText={$t('common.header.volume.song')}
                min={0}
                max={10}
                hideTextInput
                maxLabel="10"
                value={songVolume}
                step={0.1}
                style="margin-left: 2rem"
                on:input={(value) => {{setVolume(value.detail)}}}
        />
        <Slider
                labelText={$t('common.header.volume.soundEffect')}
                min={0}
                max={10}
                hideTextInput
                maxLabel="10"
                value={soundVolume}
                step={0.1}
                on:input={(value) => {{setSoundVolume(value.detail)}}}
        />
        <div class="gauge">
            <div class="gauge__progress" {style}>Oxygen</div>
            <div class="gauge__tick" style="left: 0%;">
                <div class="gauge__label">0</div>
            </div>
            <div class="gauge__tick gauge__tick--minor" style="left: 5%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 10%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 15%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 20%;"></div>
            <div class="gauge__tick" style="left: 25%;">
                <div class="gauge__label">25</div>
            </div>
            <div class="gauge__tick gauge__tick--minor" style="left: 30%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 35%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 40%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 45%;"></div>
            <div class="gauge__tick" style="left: 50%;">
                <div class="gauge__label">50</div>
            </div>
            <div class="gauge__tick gauge__tick--minor" style="left: 55%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 60%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 65%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 70%;"></div>
            <div class="gauge__tick" style="left: 75%;">
                <div class="gauge__label">75</div>
            </div>
            <div class="gauge__tick gauge__tick--minor" style="left: 80%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 85%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 90%;"></div>
            <div class="gauge__tick gauge__tick--minor" style="left: 95%;"></div>
            <div class="gauge__tick" style="left: 100%;">
                <div class="gauge__label">100</div>
            </div>
        </div>
        <!--        <span style="font-size: 3rem; color: goldenrod; margin-left: 3rem; margin-right: 3rem">{getFormatedCountdown($time)}</span>-->

        <HeaderGlobalAction on:click={() => isOpenHint = true}
                            iconDescription={$t("common.header.hint.tooltip")}
                            tooltipAlignment="end"
                            tooltipPosition="bottom"
                            icon={Idea}
                            style="margin-right: 3rem"
        />
        <ModalComponent opened={isOpenHint} parentDoneAction={() => isOpenHint = false}>
            <div style="display: flex; flex-direction: row">
                <Grid>
                    <Row>
                        <Column>
                            {#each Object.entries(hints) as [level, hint]}
                                {#if Number(level) <= Number(hintLevel)}
                                    <h2>{$t('common.header.hint.message.title')}{level}</h2>
                                    <p style="font-size: 1.3rem">{hint}</p>
                                {/if}
                            {/each}
                            {#if !hints[1] }
                                <p style="font-size: 1.3rem">{$t('common.header.hint.message.nothing')}</p>
                            {/if}
                            {#if hints["1"] && Number(hintLevel) <= 1}
                                <Button kind="secondary" on:click={() => increaseHintLevel()}
                                        style="margin-top: 2rem">
                                    {$t('common.header.hint.help')}
                                </Button>
                            {/if}
                            {#if hints["1"] && Number(hintLevel) === 2}
                                <Button on:click={() => increaseHintLevel()} style="margin-top: 2rem">
                                    {$t('common.header.hint.solution')}
                                </Button>
                            {/if}
                        </Column>
                    </Row>
                </Grid>
            </div>
        </ModalComponent>
    </HeaderUtilities>
</Tile>
<SongComponent/>
<SoundEffectComponent src="{base}/sound/heart_beat.mp3" loop postPlay={playHeartBeat}/>
<SoundEffectComponent src="{base}/sound/heart_beat_fast.mp3" loop postPlay={playHeartBeatFast}/>
<slot/>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import {
    Button,
    Column,
    ContentSwitcher,
    Grid,
    Header,
    HeaderGlobalAction,
    HeaderNav,
    HeaderNavItem,
    HeaderNavMenu,
    HeaderUtilities,
    ImageLoader,
    Row,
    Slider,
    Tile,
  } from "carbon-components-svelte";
  import { base } from '$app/paths';
  import { getVolume, setVolume } from "$lib/store/VolumeStore";
  import {
    checkVolume as checkSoundVolume,
    getVolume as getSoundVolume,
    initVolumeStore as initSoundVolumeStore,
    setVolume as setSoundVolume
  } from "$lib/store/SoundVolumeStore";
  import { onMount } from "svelte";
  import { Idea } from "carbon-icons-svelte";
  import { hintsByStep, Step, t } from "$lib";
  import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
  import { getHintLevel, increaseHintLevel, resetLevelStore } from "$lib/store/HintLevelStore";
  import { getCountdown, initCountdownStore, setCountdown } from "$lib/store/CountdownStore";
  import SoundEffectComponent from "$lib/technicalComponent/SoundEffectComponent.svelte";
  import { renderStore } from "$lib/store/inMemoryStore/RenderStore";
  import SongComponent from "$lib/technicalComponent/SongComponent.svelte";

  export let title: Step = Step.INTRODUCTION
  export let songVolume: number = 0
  export let soundVolume: number = 30

  renderStore.subscribe((value) => {
    title = value.title
  })

  let playHeartBeat: Function | undefined = undefined
  let playHeartBeatFast: Function | undefined = undefined

  let isOpenHint: boolean = false

  let hints: { "1": string; "2": string, "3": string } = {"1": "", "2": "", "3": ""}

  let hintLevel: string = "2"
  let oxygen: number = 100
  let style = ""

  onMount(() => {
    if (!checkSoundVolume()) {
      let INITIAL_VOLUME = "5";
      initSoundVolumeStore(INITIAL_VOLUME)
    }
    songVolume = getVolume() * 100
    soundVolume = getSoundVolume() * 100

    resetLevelStore()

    setInterval(() => {
      hintLevel = getHintLevel()
    }, 200)
    hints = getHint(title);

    time = initCountdownStore(COUNTDOWN_FROM)
    storedTime = getCountdown();
    if (storedTime && storedTime !== 0) {
      remainingTime = storedTime ?? COUNTDOWN_FROM;
    } else {
      remainingTime = COUNTDOWN_FROM;
    }
    time.subscribe((value: string) => {
      setCountdown(Number(value));
      oxygen = Number(value) * 100 / COUNTDOWN_FROM
      style = `width: ${oxygen}%;color: black;`
    });
    animationRef = requestAnimationFrame(animate)
  })

  const getHint = (title: string) => {
    const hints = hintsByStep.find(value => value?.step?.toString() === title)
    if (hints) {
      return hints?.hints
    }
    return {"1": "", "2": "", "3": ""}
  }
  let animationRef: any;
  let latestStartTime: any;

  const COUNTDOWN_FROM = 3599999;

  let storedTime: number | null;
  let remainingTime: number | null;

  let time: any;
  const animate = (timestamp: any) => {
    if (!latestStartTime) {
      latestStartTime = timestamp + remainingTime;
    }

    const currentTime = latestStartTime - timestamp;
    if (currentTime <= 0) {
      cancelAnimationFrame(animationRef);
      setCountdown(0);
      return;
    }
    if (currentTime) {
      if (currentTime < 600000 && currentTime > 300000) {
        playHeartBeat = () => console.debug("heart beat begin")
      }
      if (currentTime <= 300000) {
        playHeartBeat = undefined
        playHeartBeatFast = () => console.debug("heart beat fast begin")
      }
      setCountdown(currentTime);
    }

    animationRef = requestAnimationFrame(animate);
  };

</script>

<style lang="css">
    .gauge {
        position: relative;
        width: 16rem;
        height: 1rem;
        background: rgb(203 213 225);
        margin-top: 1rem;
        margin-right: 4rem;
    }

    .gauge__progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: #74ccf4;
    }

    .gauge__tick {
        position: absolute;
        top: 100%;
        height: 0.5rem;
        width: 1px;
        background: rgb(203 213 225);
    }

    .gauge__tick--minor {
        height: 0.25rem;
    }

    .gauge__label {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0.5rem);
    }
</style>

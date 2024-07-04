<Header style="margin-bottom: 3rem">
    <title>{"really inaccessible | " + title.toString()}</title>
    <SoundEffectComponent src="{base}/sound/heart_beat.mp3" loop postPlay={playHeartBeat}/>
    <SoundEffectComponent src="{base}/sound/heart_beat_fast.mp3" loop postPlay={playHeartBeatFast}/>
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
                <HeaderNavItem href="https://orange-opensource.github.io/uuv/" text="Documentation" target="_blank"/>
                <HeaderNavItem href="https://github.com/e2e-test-quest/kata-e2e-uuv" text="Kata (exercism)"
                               target="_blank"/>
            </HeaderNavMenu>
            <HeaderNavItem href="https://github.com/stanlee974/rea11yinaccessible" text="Source Code" target="_blank"/>
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
                on:change={(value) => {{setVolume(value.detail)}}}
        />
        <Slider
                labelText={$t('common.header.volume.soundEffect')}
                min={0}
                max={10}
                hideTextInput
                maxLabel="10"
                value={soundVolume}
                step={0.1}
                on:change={(value) => {{setSoundVolume(value.detail)}}}
        />
        <span style="font-size: 3rem; color: goldenrod; margin-left: 3rem; margin-right: 3rem">{getFormatedCountdown($time)}</span>

        <HeaderGlobalAction on:click={() => isOpenHint = true}
                            iconDescription={$t("common.header.hint.tooltip")}
                            tooltipAlignment="end"
                            tooltipPosition="bottom"
                            icon={Idea}
                            style="margin-right: 3rem"
        />
        <!-- FIXME à déplacer dans un layout commun -->
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
                                <Button kind="secondary" on:click={() => increaseHintLevel()} style="margin-top: 2rem">
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
{#if title !== Step.INTRODUCTION && title !== Step.WAITING_ROOM}
    <ProgressIndicator
            spaceEqually
            preventChangeOnClick
            currentIndex="{currentStep}"
            style="background-color: rgb(22,22,22); position: sticky; top: 8rem; position: flex; flex-direction: row; z-index: 2000; padding-bottom: 0.5rem;">
        {#each steps as step, index}
            {#if index < currentStep}
                <ProgressStep
                        complete
                        label={step}
                        description="étapes réussies"
                />
            {/if}
            {#if currentStep === index}
                <ProgressStep
                        label={step}
                        description="étape en cours"
                />
            {/if}
            {#if index > currentStep}
                <ProgressStep
                        disabled
                        label="?"
                        description="étapes à venir"
                />
            {/if}
        {/each}
    </ProgressIndicator>
{/if}
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
    ProgressIndicator,
    ProgressStep,
    Row,
    Slider,
    Tile,
  } from "carbon-components-svelte";
  import { base } from '$app/paths';
  import { checkVolume, getVolume, initVolumeStore, setVolume } from "$lib/store/VolumeStore";
  import {
    checkVolume as checkSoundVolume,
    getVolume as getSoundVolume,
    initVolumeStore as initSoundVolumeStore,
    setVolume as setSoundVolume
  } from "$lib/store/SoundVolumeStore";
  import { onMount } from "svelte";
  import { Idea } from "carbon-icons-svelte";
  import { hintsByStep, Step, StepRoom, t } from "$lib";
  import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
  import { getHintLevel, increaseHintLevel, resetLevelStore } from "$lib/store/HintLevelStore";
  import { getCountdown, getFormatedCountdown, initCountdownStore, setCountdown } from "$lib/store/CountdownStore";
  import SoundEffectComponent from "$lib/technicalComponent/SoundEffectComponent.svelte";
  import { checkStepStore, getStepIndex, initStepStore, setStepIndex } from "$lib/store/StepStore";

  export let title: Step = Step.INTRODUCTION
  export let songVolume: number = 0
  export let soundVolume: number = 30

  let playHeartBeat: Function | undefined = undefined
  let playHeartBeatFast: Function | undefined = undefined

  let steps = [StepRoom.ABRI_ENTRANCE, StepRoom.ABRI_COMPUTER, StepRoom.ABRI_MEDICAL, StepRoom.ABRI_SEARCHCENTER, StepRoom.SURFACE_ENTRANCE, StepRoom.SURFACE_LABORATORY, StepRoom.SURFACE_LABORATORY_AUDIOVISUALROOM, StepRoom.SURFACE_LABORATORY_SANCTUARY, StepRoom.FINAL]
  let currentStep: number = 0
  let isOpenHint: boolean = false

  let hints: { "1": string; "2": string, "3": string } = {"1": "", "2": "", "3": ""}

  let hintLevel: string = "2"
  onMount(() => {
    if (!checkVolume()) {
      let INITIAL_VOLUME = "2";
      initVolumeStore(INITIAL_VOLUME)
    }
    if (!checkStepStore()) {
      initStepStore("0")
    }
    if (!checkSoundVolume()) {
      let INITIAL_VOLUME = "5";
      initSoundVolumeStore(INITIAL_VOLUME)
    }
    songVolume = getVolume() * 100
    soundVolume = getSoundVolume() * 100
    switch (title) {
      case Step.ABRI_ENTRANCE:
        setStepIndex(0)
        break
      case Step.ABRI_COMPUTER:
        setStepIndex(1)
        break
      case Step.ABRI_MEDICAL:
        setStepIndex(2)
        break
      case Step.ABRI_SEARCHCENTER:
        setStepIndex(3)
        break
      case Step.SURFACE_ENTRANCE:
        setStepIndex(4)
        break
      case Step.SURFACE_LABORATORY:
        setStepIndex(5)
        break
      case Step.SURFACE_LABORATORY_AUDIOVISUALROOM:
        setStepIndex(6)
        break
      case Step.SURFACE_LABORATORY_SANCTUARY:
        setStepIndex(7)
        break
      case Step.FINAL:
        setStepIndex(8)
        break
      default:
        break
    }
    currentStep = getStepIndex()

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
      const [hoursStr, minutesStr] = value.split(':');
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      setCountdown((hours * 60) + minutes);
    });
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

  onMount(() => animationRef = requestAnimationFrame(animate));

</script>


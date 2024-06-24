<Header style="margin-bottom: 3rem">
    <title>{"really inaccessible | " + title.toString()}</title>
    <div style:width="100%" style:max-width="250px" style:margin-right="1rem">
        <a href="{base}/">
            <ImageLoader
                    src="{base}/logo.png" alt="logo of really inaccessible" fadeIn={true}
            />
        </a>
    </div>
    <HeaderNav>
        <HeaderNavItem href="https://www.deque.com/axe/" text="Axe-core - test accessibilité"/>
        <HeaderNavMenu text="Réferentiel">
            <HeaderNavItem href="https://www.w3.org/WAI/WCAG22/Understanding/" text="WCAG"/>
            <HeaderNavItem href="https://accessibilite.numerique.gouv.fr/W3C" text="RGAA"/>
        </HeaderNavMenu>
        <HeaderNavMenu text="UUV - test E2E accessibilité">
            <HeaderNavItem href="https://github.com/Orange-OpenSource/uuv" text="Github"/>
            <HeaderNavItem href="https://orange-opensource.github.io/uuv/" text="Documentation"/>
            <HeaderNavItem href="https://github.com/e2e-test-quest/kata-e2e-uuv" text="Kata (exercism)"/>
        </HeaderNavMenu>
        <HeaderNavItem href="https://github.com/stanlee974/rea11yinaccessible" text="Source Code"/>
    </HeaderNav>
    <!--    <span style="font-size: 3rem; color: goldenrod">{$time}</span>-->
</Header>
<Tile style="position: sticky; top: 3rem; position: flex; flex-direction: row; z-index: 2000">
    <HeaderUtilities>
        <Slider
                labelText="Song volume"
                min={0}
                max={10}
                hideTextInput
                maxLabel="10"
                value={songVolume}
                step={0.1}
                on:change={(value) => {{setVolume(value.detail)}}}
        />
        <Slider
                labelText="Sound effect volume"
                min={0}
                max={10}
                hideTextInput
                maxLabel="10"
                value={soundVolume}
                step={0.1}
                on:change={(value) => {{setSoundVolume(value.detail)}}}
        />
        <HeaderGlobalAction on:click={() => isOpenHint = true}
                            iconDescription="you want help?"
                            tooltipAlignment="end"
                            tooltipPosition="bottom"
                            icon={Idea}
        />
        <!-- FIXME à déplacer dans un layout commun -->
        <ModalComponent opened={isOpenHint} parentDoneAction={() => isOpenHint = false}>
            <div style="display: flex; flex-direction: row">
                <Grid>
                    <Row>
                        <Column>
                            {#each Object.entries(hints) as [level, hint]}
                                {#if Number(level) <= Number(hintLevel)}
                                    <h2>Hint #{level}</h2>
                                    <p style="font-size: 1.3rem">{hint}</p>
                                {/if}
                            {/each}
                            {#if !hints[1] }
                                <p style="font-size: 1.3rem">Pas d'aide disponible sur cette épreuve</p>
                            {/if}
                            {#if hints["1"] && Number(hintLevel) <= 1}
                                <Button kind="secondary" on:click={() => increaseHintLevel()} style="margin-top: 2rem">
                                    Affiche une aide
                                </Button>
                            {/if}
                            {#if hints["1"] && Number(hintLevel) === 2}
                                <Button on:click={() => increaseHintLevel()} style="margin-top: 2rem">
                                    Affiche la solution
                                </Button>
                            {/if}
                        </Column>
                    </Row>
                </Grid>
            </div>
        </ModalComponent>
    </HeaderUtilities>
</Tile>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import {
    Button,
    Column,
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
  import { checkVolume, getVolume, initVolumeStore, setVolume } from "$lib/store/VolumeStore";
  import {
    checkVolume as checkSoundVolume,
    getVolume as getSoundVolume,
    initVolumeStore as initSoundVolumeStore,
    setVolume as setSoundVolume
  } from "$lib/store/SoundVolumeStore";
  import { onMount } from "svelte";
  import { Idea } from "carbon-icons-svelte";
  import { hintsByStep, Step } from "$lib/index";
  import ModalComponent from "$lib/ModalComponent.svelte";
  import { getHintLevel, increaseHintLevel, resetLevelStore } from "$lib/store/HintLevelStore";

  export let title: Step = Step.INTRODUCTION
  export let songVolume: number = 0
  export let soundVolume: number = 30

  let isOpenHint: boolean = false

  let hints: { "1": string; "2": string, "3": string } = {"1": "", "2": "", "3": ""}

  let hintLevel: string = "2"
  onMount(() => {
    if (!checkVolume()) {
      let INITIAL_VOLUME = "2";
      initVolumeStore(INITIAL_VOLUME)
    }
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
  })

  const getHint = (title: string) => {
    const hints = hintsByStep.find(value => value?.step?.toString() === title)
    if (hints) {
      return hints?.hints
    }
    return {"1": "", "2": "", "3": ""}
  }
  // let animationRef: any;
  // let latestStartTime: any;
  //
  // const COUNTDOWN_FROM = 3600000;
  //
  // let storedTime: string | null;
  // let remainingTime: number | null;
  //
  // const formatter = new Intl.DateTimeFormat("en", {
  //   hour12: false,
  //   minute: "2-digit",
  //   second: "2-digit"
  // });
  // export const time = writable(formatter.format(COUNTDOWN_FROM));
  //
  // onMount(() => {
  //   storedTime = localStorage.getItem("time");
  //   if (storedTime && storedTime !== "0") {
  //     remainingTime = Number(storedTime) ?? COUNTDOWN_FROM;
  //   } else {
  //     remainingTime = COUNTDOWN_FROM;
  //   }
  //   time.subscribe((value: string) => {
  //     localStorage.setItem("time", value);
  //   });
  // })
  // const animate = (timestamp: any) => {
  //   if (!latestStartTime) {
  //     latestStartTime = timestamp + remainingTime;
  //   }
  //
  //   const currentTime = latestStartTime - timestamp;
  //   if (currentTime <= 0) {
  //     cancelAnimationFrame(animationRef);
  //     time.set(formatter.format(0));
  //     return;
  //   }
  //   if (currentTime) {
  //     time.set(formatter.format(currentTime));
  //   }
  //
  //   animationRef = requestAnimationFrame(animate);
  // };
  //
  // onMount(() => animationRef = requestAnimationFrame(animate));

</script>


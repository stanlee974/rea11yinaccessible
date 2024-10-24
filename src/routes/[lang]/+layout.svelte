<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import "driver.js/dist/driver.css";
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
        Modal,
        MultiSelect,
        Row,
        Select,
        SelectItem,
        Slider,
        Tile,
    } from "carbon-components-svelte";
    import {base} from '$app/paths';
    import {onMount} from "svelte";
    import {Idea} from "carbon-icons-svelte";
    import {changeLangRedirect, Step, t} from "$lib";
    import {hintLevelStore, increaseHintLevel, initHintLevelStore, resetLevelStore} from "$lib/store/HintLevelStore";
    import {getCountdown, initCountdownStore, setCountdown} from "$lib/store/CountdownStore";
    import SoundEffectComponent from "$lib/technicalComponent/SoundEffectComponent.svelte";
    import {renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import SongComponent from "$lib/technicalComponent/SongComponent.svelte";
    import {page} from "$app/stores";
    import {injectSpeedInsights} from "@vercel/speed-insights/sveltekit";
    import {inject} from '@vercel/analytics'
    import {headerStore, updateSongVolume, updateSoundVolume} from "../../lib/store/HeaderStore";
    import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
    import {normalizeUrl, redirect} from "../../lib";
    import {animationStore, DISABILITY_NAME, updateBlind, updateEpilepsy} from "../../lib/store/AnimationStore";

    injectSpeedInsights()
    inject()
    export let title: string = $t('common.step.intro') || "Introduction"
    export let songVolume: number = $headerStore.songVolume
    export let soundVolume: number = $headerStore.soundVolume

    let selectedLanguageIndex = $page.params.lang
    let playHeartBeat: Function | undefined = undefined
    let playHeartBeatFast: Function | undefined = undefined

    let isOpenHint: boolean = false

    let hints: { "1": string; "2": string, "3": string } = {"1": "", "2": "", "3": ""}

    let hintLevel: string = "2"
    let oxygen: number = 100
    let style = ""
    let currentStep: string = $renderStore.step
    onMount(() => {
        window.scrollTo(0, 0);
        document.title = $t('common.step.intro') + " | really inaccessible"
        document.body.lang = $page.params.lang ?? "fr"
        songVolume = $headerStore.songVolume
        soundVolume = $headerStore.soundVolume
        if ($page.url.searchParams.get('isA11yMode') == 'true') {
            updateBlind(true)
        }

        initHintLevelStore('0')
        hints = getHint($renderStore.step)

        renderStore.subscribe((value) => {
            hints = getHint(value.step)
            if (currentStep !== value.step) {
                resetLevelStore()
                hintLevel = '0'
            }
            currentStep = value.step
        })
        hintLevelStore.subscribe((data) => {
            hintLevel = data
        })
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

    const getHint = (step: string) => {
        switch (step) {
            case Step.WAITING_ROOM:
                return {
                    "1": $t(`common.header.hint.message.${Step.WAITING_ROOM}.1`),
                    "2": $t(`common.header.hint.message.${Step.WAITING_ROOM}.2`),
                    "3": $t(`common.header.hint.message.${Step.WAITING_ROOM}.3`)
                }

            case Step.ABRI_ENTRANCE:
                return {
                    "1": $t(`common.header.hint.message.${Step.ABRI_ENTRANCE}.1`),
                    "2": $t(`common.header.hint.message.${Step.ABRI_ENTRANCE}.2`),
                    "3": $t(`common.header.hint.message.${Step.ABRI_ENTRANCE}.3`)
                }

            case Step.ABRI_COMPUTER:
                return {
                    "1": $t(`common.header.hint.message.${Step.ABRI_COMPUTER}.1`),
                    "2": $t(`common.header.hint.message.${Step.ABRI_COMPUTER}.2`),
                    "3": $t(`common.header.hint.message.${Step.ABRI_COMPUTER}.3`)
                }

            case Step.ABRI_MEDICAL:
                return {
                    "1": $t(`common.header.hint.message.${Step.ABRI_MEDICAL}.1`),
                    "2": $t(`common.header.hint.message.${Step.ABRI_MEDICAL}.2`),
                    "3": $t(`common.header.hint.message.${Step.ABRI_MEDICAL}.3`)
                }

            case Step.ABRI_SEARCHCENTER:
                return {
                    "1": $t(`common.header.hint.message.${Step.ABRI_SEARCHCENTER}.1`),
                    "2": $t(`common.header.hint.message.${Step.ABRI_SEARCHCENTER}.2`),
                    "3": $t(`common.header.hint.message.${Step.ABRI_SEARCHCENTER}.3`)
                }

            case Step.SURFACE_ENTRANCE:
                return {
                    "1": $t(`common.header.hint.message.${Step.SURFACE_ENTRANCE}.1`),
                    "2": $t(`common.header.hint.message.${Step.SURFACE_ENTRANCE}.2`),
                    "3": $t(`common.header.hint.message.${Step.SURFACE_ENTRANCE}.3`)
                }

            case Step.SURFACE_LABORATORY:
                return {
                    "1": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY}.1`),
                    "2": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY}.2`),
                    "3": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY}.3`)
                }

            case Step.SURFACE_LABORATORY_AUDIOVISUALROOM:
                return {
                    "1": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY_AUDIOVISUALROOM}.1`),
                    "2": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY_AUDIOVISUALROOM}.2`),
                    "3": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY_AUDIOVISUALROOM}.3`)
                }

            case Step.SURFACE_LABORATORY_SANCTUARY:
                return {
                    "1": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY_SANCTUARY}.1`),
                    "2": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY_SANCTUARY}.2`),
                    "3": $t(`common.header.hint.message.${Step.SURFACE_LABORATORY_SANCTUARY}.3`)
                }
            default:
                return {"1": "", "2": "", "3": ""}
        }
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


    const updateDisabilities = (event) => {
        const manageDisabilities = (detail, disability: DISABILITY_NAME) => {
            if (detail.selectedIds.includes(disability)) {
                if (DISABILITY_NAME.BLIND === disability) {
                    updateBlind(true)
                    redirect($page.params.lang, normalizeUrl($page.route.id, $page.params.lang))
                }
                if (DISABILITY_NAME.EPILEPSY === disability) {
                    updateEpilepsy(true)
                }
            } else {
                if (DISABILITY_NAME.BLIND === disability) {
                    updateBlind(false)
                    redirect($page.params.lang, normalizeUrl($page.route.id, $page.params.lang))
                }
                if (DISABILITY_NAME.EPILEPSY === disability) {
                    updateEpilepsy(false)
                }
            }
        }
        manageDisabilities(event.detail, DISABILITY_NAME.BLIND)
        manageDisabilities(event.detail, DISABILITY_NAME.EPILEPSY)
    }
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

    .skip {
        position: absolute;
        left: -99999px;
    }

    .skip:focus {
        position: static;
    }

    select {
        width: 7rem !important;
    }

    :global(.bx--list-box__menu-item, .bx--list-box__menu-item__option) {
        height: auto;
    }

    :global(.bx--checkbox-label-text) {
        display: block;
    }


</style>

<ul class="skip">
    <li>
        <a autofocus href="#main-content">{$t('common.layout.bypassMenu.goToContent')}</a>
    </li>
    <li>
        <a href="#language">{$t('common.layout.bypassMenu.goToLanguage')}</a>
    </li>
    <li>
        <a href="#song">{$t('common.layout.bypassMenu.goToSong')}</a>
    </li>
    <li>
        <a href="#hint">{$t('common.layout.bypassMenu.goToHint')}</a>
    </li>
    <li>
        <a href="#menu">{$t('common.layout.bypassMenu.goToMenu')}</a>
    </li>
</ul>
<Header style="margin-bottom: 3rem">
    <title>{"really inaccessible | " + title.toString()}</title>
    <Row style="flex: content; flex-direction: row; align-items: center;">
        <div style:width="100%" style:max-width="250px" style:margin-right="1rem">
            <a href="{base}/">
                <ImageLoader
                        src="{base}/logo.png" alt="" fadeIn={true}
                />
            </a>
        </div>
        <HeaderNav>
            <HeaderNavItem href="https://www.deque.com/axe/" text={$t('common.layout.menu.axe')} target="_blank"/>
            <HeaderNavMenu text={$t('common.layout.menu.reference.title')}>
                <HeaderNavItem href="https://www.w3.org/WAI/WCAG22/Understanding/" text="WCAG" target="_blank"/>
                <HeaderNavItem href="https://accessibilite.numerique.gouv.fr/W3C" text="RGAA" target="_blank"/>
            </HeaderNavMenu>
            <HeaderNavMenu text={$t('common.layout.menu.uuv.title')}>
                <HeaderNavItem href="https://github.com/Orange-OpenSource/uuv" text="Github" target="_blank"/>
                <HeaderNavItem href="https://orange-opensource.github.io/uuv/" text="Documentation"
                               target="_blank"/>
                <HeaderNavItem href="https://github.com/e2e-test-quest/kata-e2e-uuv"
                               text={$t('common.layout.menu.uuv.kata')}
                               target="_blank"/>
            </HeaderNavMenu>
            <HeaderNavItem href="https://github.com/stanlee974/rea11yinaccessible"
                           text={$t('common.layout.menu.source')}
                           target="_blank"/>
        </HeaderNav>
    </Row>
    <Select
            id="language"
            inline
            labelText={$t('common.header.language')}
            bind:selected={selectedLanguageIndex}
            on:change={(e) => changeLangRedirect($page.route.id, e?.target?.value)}
            style="width: 10rem; margin-right: 2rem;"
    >
        <SelectItem value='fr' text='Français'/>
        <SelectItem value='en' text='English'/>
        <SelectItem value='es' text='Español'/>
    </Select>
</Header>
{#if $renderStore.step !== Step.SUMMARY}
    <Tile id="menu" style="position: sticky; top: 3rem; position: flex; flex-direction: row; z-index: 2000">
        <HeaderUtilities>
            <MultiSelect
                    disabled={!$renderStore.step}
                    selectedIds={$animationStore.disabilities.map((data) => data.toString())}
                    titleText={$t('common.header.accessibility.title')}
                    label={$t('common.header.accessibility.placeholder')}
                    items={[
                        { id: DISABILITY_NAME.EPILEPSY, text: $t("common.header.accessibility.epilepsy") },
                        { id: DISABILITY_NAME.BLIND, text: $t("common.header.accessibility.blind") }
                    ]}
                    on:select={updateDisabilities}
            >
            </MultiSelect>
            <SongComponent/>
            <Slider
                    labelText={$t('common.header.volume.song')}
                    min={0}
                    max={10}
                    hideTextInput
                    minLabel=" "
                    maxLabel=" "
                    value={songVolume}
                    step={0.1}
                    style="margin-left: 2rem"
                    on:input={(value) => {updateSongVolume(value.detail)}}
            />
            <Slider
                    labelText={$t('common.header.volume.soundEffect')}
                    min={0}
                    max={10}
                    hideTextInput
                    minLabel=" "
                    maxLabel=" "
                    value={soundVolume}
                    step={0.1}
                    on:input={(value) => {updateSoundVolume(value.detail)}}
            />
            <div class="gauge" aria-label={$t('common.header.oxygen.remaining', {oxygen: oxygen.toFixed(0)})}>
                <div aria-hidden="true">
                    <div class="gauge__progress" {style}>{$t('common.header.oxygen.title')}</div>
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
            </div>
            <!--        <span style="font-size: 3rem; color: goldenrod; margin-left: 3rem; margin-right: 3rem">{getFormatedCountdown($time)}</span>-->

            <HeaderGlobalAction id="hint" on:click={() => isOpenHint = true}
                                iconDescription={$t("common.header.hint.tooltip")}
                                tooltipAlignment="end"
                                tooltipPosition="bottom"
                                icon={Idea}
                                style="margin-right: 3rem"
            />
            <Modal size="lg"
                   preventCloseOnClickOutside
                   bind:open={isOpenHint}
                   on:close={() => isOpenHint = false}
                   modalHeading=""
                   primaryButtonText="{$t('common.button.waiting')}"
                   primaryButtonIcon={ContinueFilled}
                   on:click:button--primary={() => isOpenHint = false}>
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
            </Modal>
        </HeaderUtilities>
    </Tile>
{/if}
<SoundEffectComponent src="{base}/sound/heart_beat.mp3" postPlay={playHeartBeat}/>
<SoundEffectComponent src="{base}/sound/heart_beat_fast.mp3" postPlay={playHeartBeatFast}/>
<slot id="main-content"/>

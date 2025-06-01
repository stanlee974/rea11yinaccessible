<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import "driver.js/dist/driver.css";
    import {
        Button,
        Column,
        Grid,
        Header,
        HeaderNav,
        HeaderNavItem,
        HeaderNavMenu,
        HeaderUtilities,
        ImageLoader,
        Modal,
        Row,
        Select,
        SelectItem,
        Slider,
        Tile,
    } from "carbon-components-svelte";
    import {base} from '$app/paths';
    import {onMount} from "svelte";
    import {Idea, Cognitive, ViewOffFilled} from "carbon-icons-svelte";
    import {changeLangRedirect, Step, t} from "$lib";
    import {hintLevelStore, increaseHintLevel, initHintLevelStore, resetLevelStore} from "$lib/store/HintLevelStore";
    import {setCountdown} from "$lib/store/CountdownStore";
    import SoundEffectComponent from "$lib/technicalComponent/SoundEffectComponent.svelte";
    import {renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import SongComponent from "$lib/technicalComponent/SongComponent.svelte";
    import {page} from "$app/stores";
    import {injectSpeedInsights} from "@vercel/speed-insights/sveltekit";
    import {inject} from '@vercel/analytics'
    import {headerStore, updateSongVolume, updateSoundVolume} from "$lib/store/HeaderStore";
    import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";
    import {animationStore, updateBlind, updateEpilepsy, getCountdown} from "$lib/store/AnimationStore";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {initExtraCountdown} from "../../lib/store/AnimationStore";

    injectSpeedInsights()
    inject()
    export let title: string = $t('common.step.intro') || "Introduction"
    export let songVolume: number = $headerStore.songVolume
    export let soundVolume: number = $headerStore.soundVolume

    let selectedLanguageIndex = $page.params.lang
    let playHeartBeat: Function | undefined = undefined
    let playHeartBeatFast: Function | undefined = undefined
    let playWeakness: Function | undefined = undefined

    let isOpenHint: boolean = false
    let isReborn: boolean = false

    let hints: { "1": string; "2": string, "3": string } = {"1": "", "2": "", "3": ""}

    let hintLevel: string = "2"
    let oxygen: number = 100
    let style = ""
    let currentStep: string = $renderStore.step

    let blindnessEffect: boolean = false

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
        if ($animationStore.countdown.started) {
            if (remainingTime > 0) {
                oxygen = remainingTime / $animationStore.countdown.total * 100
            } else {
                oxygen = 0
            }
        } else {
            oxygen = 100
        }
        style = `width: ${oxygen}%;color: black;`
        animationStore.subscribe((data) => {
            if (data.countdown.started) {
                const refreshOxygen = setInterval(() => {
                    if (blindnessEffect) {
                        blindnessEffect = false
                    }
                    let background = "#74ccf4"
                    remainingTime = getCountdown() - new Date().getTime()
                    oxygen = remainingTime / $animationStore.countdown.total * 100
                    if (remainingTime <= 0) {
                        oxygen = 0
                        if (isReborn) {
                            clearInterval(refreshOxygen)
                        } else {
                            isReborn = true
                        }
                    }
                    if (remainingTime <= 3200000 && remainingTime >= 3198999 ) {
                        blindnessEffect = true
                        playWeakness = () => { playWeakness = undefined}
                    }
                    if (remainingTime <= 2400000 && remainingTime >= 2398999) {
                        blindnessEffect = true
                        playWeakness = () => { playWeakness = undefined}
                    }
                    if (remainingTime <= 1800000) {
                        background = "#f4a261"
                        if (remainingTime >= 1798999) {
                            blindnessEffect = true
                            playWeakness = () => { playWeakness = undefined}

                        }
                    }
                    if (remainingTime <= 1200000 && remainingTime >= 1198999) {
                        blindnessEffect = true
                        playWeakness = () => { playWeakness = undefined}
                    }
                    if (remainingTime <= 600000) {
                        background = "#e76f51"
                        if (remainingTime >= 598999) {
                            blindnessEffect = true
                            playWeakness = () => { playWeakness = undefined}
                        }
                    }
                    style = `width: ${oxygen}%;color: black; background: ${background}`
                }, 5000)
            }
        })
    })

    const getHint = (step: string) => {
        switch (step) {
            case Step.FIRST_PLACE:
                return {
                    "1": $t(`common.header.hint.message.${Step.FIRST_PLACE}`)[0],
                    "2": $t(`common.header.hint.message.${Step.FIRST_PLACE}`)[1],
                    "3": $t(`common.header.hint.message.${Step.FIRST_PLACE}`)[2]
                }
            case Step.SECOND_PLACE:
                return {
                    "1": $t(`common.header.hint.message.${Step.SECOND_PLACE}`)[0],
                    "2": $t(`common.header.hint.message.${Step.SECOND_PLACE}`)[1],
                    "3": $t(`common.header.hint.message.${Step.SECOND_PLACE}`)[2]
                }
            case Step.THIRD_PLACE:
                return {
                    "1": $t(`common.header.hint.message.${Step.THIRD_PLACE}`)[0],
                    "2": $t(`common.header.hint.message.${Step.THIRD_PLACE}`)[1],
                    "3": $t(`common.header.hint.message.${Step.THIRD_PLACE}`)[2]
                }
            case Step.FOURTH_PLACE:
                return {
                    "1": $t(`common.header.hint.message.${Step.FOURTH_PLACE}`)[0],
                    "2": $t(`common.header.hint.message.${Step.FOURTH_PLACE}`)[1],
                    "3": $t(`common.header.hint.message.${Step.FOURTH_PLACE}`)[2]
                }
            case Step.FIFTH_PLACE:
                return {
                    "1": $t(`common.header.hint.message.${Step.FIFTH_PLACE}`)[0],
                    "2": $t(`common.header.hint.message.${Step.FIFTH_PLACE}`)[1],
                    "3": $t(`common.header.hint.message.${Step.FIFTH_PLACE}`)[2]
                }
            case Step.SIXTH_PLACE:
                return {
                    "1": $t(`common.header.hint.message.${Step.SIXTH_PLACE}`)[0],
                    "2": $t(`common.header.hint.message.${Step.SIXTH_PLACE}`)[1],
                    "3": $t(`common.header.hint.message.${Step.SIXTH_PLACE}`)[2]
                }
            case Step.SEVENTH_PLACE:
                return {
                    "1": $t(`common.header.hint.message.${Step.SEVENTH_PLACE}`)[0],
                    "2": $t(`common.header.hint.message.${Step.SEVENTH_PLACE}`)[1],
                    "3": $t(`common.header.hint.message.${Step.SEVENTH_PLACE}`)[2]
                }
            case Step.EIGHTH_PLACE:
                return {
                    "1": $t(`common.header.hint.message.${Step.EIGHTH_PLACE}`)[0],
                    "2": $t(`common.header.hint.message.${Step.EIGHTH_PLACE}`)[1],
                    "3": $t(`common.header.hint.message.${Step.EIGHTH_PLACE}`)[2]
                }

                //FIXME delete
            case Step.WAITING_ROOM:
                return {
                    "1": $t(`common.header.hint.message.${Step.WAITING_ROOM}.1`),
                    "2": $t(`common.header.hint.message.${Step.WAITING_ROOM}.2`),
                    "3": $t(`common.header.hint.message.${Step.WAITING_ROOM}.3`)
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

    let remainingTime: number | null;

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
        color: black;
        width: 100%;
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

    .asphyxia {
        animation: blindnessEffect 1s ease-in-out;
    }

    @keyframes blindnessEffect {
        0% {
            -webkit-mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 0%);
            mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 0%);
        }
        30% {
            -webkit-mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%);
            mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%);
        }
        50% {
            -webkit-mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%);
            mask-image: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 70%);
        }
        100% {
            -webkit-mask-image: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
            mask-image: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%);
        }
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
<Header>
    <title>{"really inaccessible | " + title.toString()}</title>
    <div class="container d-flex flex-row justify-content-between">
        <Row class="d-flex flex-row justify-content-around">
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
                    <HeaderNavItem href="https://e2e-test-quest.github.io/uuv" text="Github" target="_blank"/>
                    <HeaderNavItem href="https://e2e-test-quest.github.io/uuv/" text="Documentation"
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
        <div id="languageSelectContainer" class="d-flex flex-row justify-content-end">
            <Select
                    id="language"
                    inline
                    labelText={$t('common.header.language')}
                    bind:selected={selectedLanguageIndex}
                    on:change={(e) => changeLangRedirect($page.route.id, e?.target?.value)}
                    size="sm"
            >
                <SelectItem value='fr' text='Français'/>
                <SelectItem value='en' text='English'/>
                <SelectItem value='es' text='Español'/>
            </Select>
        </div>
    </div>
</Header>
{#if $renderStore.step !== Step.SUMMARY}
    <Tile id="menu">
        <HeaderUtilities>
            <div class="container d-flex flex-row justify-content-around">
                <div id="soundOptionsContainer" class="d-flex flex-row justify-content-around align-items-center">
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
                </div>
                <div id="oxygen" class="gauge"
                     aria-label={$t('common.header.oxygen.remaining', {oxygen: oxygen.toFixed(0)})}>
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

                <div>
                    <Button id="disabilityEpilepsy"
                            iconDescription={$t('intro.disability.epilepsy')}
                            icon={Cognitive}
                            isSelected={$animationStore.disabilities.epilepsy}
                            kind="ghost"
                            on:click={() => updateEpilepsy(!$animationStore.disabilities.epilepsy)}
                    />
                    <Button id="disabilityBlind"
                            iconDescription={$t('intro.disability.blind')}
                            icon={ViewOffFilled}
                            isSelected={$animationStore.disabilities.blind}
                            kind="ghost"
                            on:click={() => updateBlind(!$animationStore.disabilities.blind)}
                    />
                    <Button id="hint"
                            iconDescription={$t("common.header.hint.tooltip")}
                            icon={Idea}
                            kind="ghost"
                            on:click={() => isOpenHint = true}
                    />
                </div>
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
            </div>
        </HeaderUtilities>
    </Tile>
{/if}
<SoundEffectComponent src="{base}/sound/heart_beat.mp3" postPlay={playHeartBeat}/>
<SoundEffectComponent src="{base}/sound/heart_beat_fast.mp3" postPlay={playHeartBeatFast}/>
<SoundEffectComponent src="{base}/sound/weakness.mp3" postPlay={playWeakness}/>
<ModalComponent
        opened="{isReborn}"
        parentDoneAction={() => {initExtraCountdown()}}>
    <div class="{!isReborn && !$animationStore.disabilities.epilepsy && !$animationStore.disabilities.blind && blindnessEffect ? 'asphyxia' : ''}">
        <div class="d-flex flew-row align-items-center">
            <div class="half">
                <div>
                    <ImageLoader
                            src="{base}/gameOver/eldoria/cloche.png"
                            alt="" fadeIn={true}/>
                </div>
            </div>
            <div class="half m-3">
                <span class="number">1</span>
                <p class="mt-4">{$t('common.gameOver.modal.1.row')[0]}</p>
            </div>
        </div>
        <div class="d-flex flew-row align-items-center">

            <div class="half m-3">
                <span class="number">2</span>
                <p class="mt-4">{$t('common.gameOver.modal.1.row')[1]}</p>
            </div>
            <div class="half">
                <ImageLoader
                        src="{base}/gameOver/eldoria/cloche2.png"
                        alt="" fadeIn={true}/>
            </div>
        </div>
        <div class="d-flex flew-row align-items-center">
            <div class="half m-3">
                <div>
                    <ImageLoader
                            src="{base}/gameOver/eldoria/eldoria.png"
                            alt="" fadeIn={true}/>
                </div>
            </div>
            <div class="half m-3">
                <span class="number">3</span>
                <p class="mt-4">{$t('common.gameOver.modal.1.row')[2]}</p>
                <p class="mt-4">{$t('common.gameOver.modal.1.row')[3]}</p>
            </div>
        </div>
    </div>
</ModalComponent>
<div class="{ !isReborn && !$animationStore.disabilities.epilepsy && !$animationStore.disabilities.blind && blindnessEffect ? 'asphyxia' : ''}">
<slot id="main-content"/>
</div>

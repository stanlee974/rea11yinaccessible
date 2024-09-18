<ModalComponent opened={showTransitionModal}
                parentDoneAction={() => {showScenario = false}}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/surface/laboratory/man_walking.jpg"
                        alt={$t('surfaceLaboratory.before.image')} fadeIn={true}/>
            </Column>
            <Column><p style="font-size: 1.3rem">{$t('surfaceLaboratory.before.row.1')}</p>
                <p style="font-size: 1.3rem">{$t('surfaceLaboratory.before.row.2')}</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={showScenario} parentDoneAction={() => {setTimeout(() => showEnigm = true, 2000)}}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-2">{$t('common.layout.title.scenario')}</h2>
            <p>{$t('surfaceLaboratory.scenario.row.1')}</p>
            <p>{$t('surfaceLaboratory.scenario.row.2')}</p>
        </div>
    </div>
</TypewriterComponent>
<ModalComponent opened={showEnigm}
                parentDoneAction={() => disableGoal = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/surface/laboratory/frozen_room.jpg"
                        alt={$t('surfaceLaboratory.scenario.modal.1.title')} fadeIn={true}/>
            </Column>
            <Column><p>{$t('surfaceLaboratory.scenario.modal.1.row.1')}</p>
                <p>{$t('surfaceLaboratory.scenario.modal.1.row.2')}</p>
                <div style="position:relative; height:430px">
                    <div style="position:absolute;z-index:1">
                        <ImageLoader
                                src="{base}/surface/laboratory/password.png"
                                alt={$t('surfaceLaboratory.scenario.modal.1.row.3')} fadeIn={true}/>
                    </div>
                    <div style="z-index:2; display: flex; flex-direction: column; position: relative">
                        <span class="writtenBraille"
                              style="top:7rem;left:8.5rem;">{normalize($t('surfaceLaboratory.test.parchment.row.1'))}</span>
                        <span class="writtenBraille"
                              style="top:8rem;left:15rem;">{normalize($t('surfaceLaboratory.test.parchment.row.2'))}</span>
                        <span class="writtenBraille"
                              style="top:10rem;left:9rem;">{normalize($t('surfaceLaboratory.test.parchment.row.3'))}</span>
                        <span class="writtenBraille"
                              style="top:12rem;left:12rem;">{normalize($t('surfaceLaboratory.test.parchment.row.4'))}</span>
                    </div>
                </div>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={disableGoal}
                     parentDoneAction={() => showForm = true}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-2">{$t('common.layout.title.goal')}</h2>
            <p>{$t('surfaceLaboratory.goal.row.1')}</p>
        </div>
    </div>
</TypewriterComponent>
{#if showForm}
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <div style="width:600px; border: white 0.2em solid; ">
            <div class="imageContainer">
                <div style="z-index:1">
                    <img id="parchment"
                         class="image"
                         src="{base}/surface/laboratory/password.png"
                         alt={$t('surfaceLaboratory.goal.row.2')}/>
                </div>
                <div style="z-index:2; display: flex; flex-direction: column">
                    <span class="writtenBraille"
                          style="top:8.5rem;left:11rem;">{normalize($t('surfaceLaboratory.test.parchment.row.1'))}</span>
                    <span class="writtenBraille"
                          style="top:10rem;left:19rem;">{normalize($t('surfaceLaboratory.test.parchment.row.2'))}</span>
                    <span class="writtenBraille"
                          style="top:12rem;left:11.5rem;">{normalize($t('surfaceLaboratory.test.parchment.row.3'))}</span>
                    <span class="writtenBraille"
                          style="top:15rem;left:15rem;">{normalize($t('surfaceLaboratory.test.parchment.row.4'))}</span>
                </div>
            </div>
        </div>
        <FluidForm class="my-3">
            <TextInput
                    labelText={$t('surfaceLaboratory.test.buttons.password.text')}
                    placeholder={$t('surfaceLaboratory.test.buttons.password.placeholder')}
                    required invalid={invalidResult} invalidText={$t('surfaceLaboratory.test.buttons.password.error')}
                    autofocus bind:value={result} on:keydown={(event) => {adaptPressedKey(event)}}/>
        </FluidForm>
        <Button kind="primary"
                on:click={() => validateForm()}>{$t('surfaceLaboratory.test.buttons.submit.text')}</Button>
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}
<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Column, FluidForm, Grid, ImageLoader, Loading, Row, TextInput,} from "carbon-components-svelte";
    import {base} from '$app/paths';
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import {redirect, Step, t} from "$lib";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {onMount} from "svelte";
    import {normalize, RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {page} from "$app/stores";

    onMount(() => {
        changeSource("/ost/step7.mp3")
        renderStore.set(new RenderData($t('common.step.surfaceLaboratoryEntrance'), $t('surfaceLaboratory.neon.title'), $t('surfaceLaboratory.neon.subtitle'), Step.SURFACE_LABORATORY));
    })

    let showTransitionModal = true;
    let showScenario = true;
    let showEnigm = false;
    let isWaiting = false;
    let showForm = false;
    let disableGoal = true;
    let result = ""
    let lastPressedKey = ""

    $: invalidResult = !new RegExp($t('surfaceLaboratory.test.response'), 'i').test(result);
    const validateForm = () => {
        if (new RegExp($t('surfaceLaboratory.test.response'), 'i').test(result)) {
            isWaiting = true
            redirect($page.params.lang, "surface/laboratory/audiovisualroom")
        }
    }

    const adaptPressedKey = (event: any) => {
        const originalKey = event.key;
        if (!lastPressedKey) {
            lastPressedKey = originalKey;
        }
        const frenchKeyboardNeighbors: { [key: string]: string[] } = {
            a: ['a', 'z', 'q', 's'],
            z: ['z', 'a', 'e', 's'],
            e: ['e', 'z', 'r', 'd', 's'],
            r: ['r', 'e', 't', 'f', 'd'],
            t: ['t', 'r', 'y', 'g', 'f'],
            y: ['y', 't', 'u', 'h', 'g'],
            u: ['u', 'y', 'i', 'j', 'h'],
            i: ['i', 'u', 'o', 'k', 'j'],
            o: ['o', 'i', 'p', 'l', 'k'],
            p: ['p', 'o', 'm', 'l'],
            q: ['q', 'a', 's', 'w'],
            s: ['s', 'q', 'a', 'z', 'd'],
            d: ['d', 's', 'e', 'f', 'x'],
            f: ['f', 'd', 'r', 'g', 'c'],
            g: ['g', 'f', 't', 'h', 'v'],
            h: ['h', 'g', 'y', 'j', 'b'],
            j: ['j', 'h', 'u', 'k', 'n'],
            k: ['k', 'j', 'i', 'l', 'n'],
            l: ['l', 'k', 'o', 'm'],
            m: ['m', 'l', 'p', 'k'],
            w: ['w', 'q', 's', 'x'],
            x: ['x', 'w', 's', 'd', 'c'],
            c: ['c', 'x', 'd', 'f', 'v'],
            v: ['v', 'c', 'f', 'g', 'b'],
            b: ['b', 'v', 'g', 'h', 'n'],
            n: ['n', 'b', 'h', 'j', 'm']
        };

        if (originalKey in frenchKeyboardNeighbors) {
            const neighbors = frenchKeyboardNeighbors[originalKey];
            if (lastPressedKey === originalKey) {
                result = result.slice(0, -1);
            } else {
                lastPressedKey = originalKey;
            }
            if (neighbors) {
                const randomIndex = Math.floor(Math.random() * neighbors.length);
                let neighbor = neighbors[randomIndex];
                result += neighbor;
                event.preventDefault();
            } else {
                result += originalKey
                event.preventDefault();
            }
        }
    }
</script>

<style lang="css">
    @font-face {
        font-family: brailleFont;
        src: url('/surface/laboratory/source/BRAILLE.woff') format('woff'),
        url('/surface/laboratory/source/BRAILLE.ttf') format('truetype')
    }

    .imageContainer {
        position:relative
    }

    .image {
        max-width: 100%;
        max-height: 100%;
    }

    .writtenBraille {
        position: absolute;
        font-family: brailleFont, serif;
        font-size: 1.1rem;
        color: #7C0002;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

</style>

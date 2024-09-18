<ModalComponent opened={showTransitionModal}
                parentDoneAction={() => {showScenario = false}}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/surface/laboratory/audiovisual_room/spiral_staircase.jpg"
                        alt={$t('audiovisualRoom.before.image')} fadeIn={true}/>
            </Column>
            <Column>
                <p class="mb-2">{$t('audiovisualRoom.before.row.1')}</p>
                <p class="mb-2">{$t('audiovisualRoom.before.row.2')}</p>
                <p class="mb-2">{$t('audiovisualRoom.before.row.3')}</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={showScenario} parentDoneAction={() => setTimeout(() => {showEnigm = true}, 2000)}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-2">{$t('common.layout.title.scenario')}</h2>
            <p>{$t('audiovisualRoom.scenario.row.1')}</p>
        </div>
    </div>
</TypewriterComponent>
<ModalComponent opened={showEnigm}
                parentDoneAction={() => disableGoal = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/surface/laboratory/audiovisual_room/audioroom.jpg"
                        alt={$t('audiovisualRoom.scenario.modal.1.row.1')} fadeIn={true}/>
            </Column>
            <Column><p>{$t('audiovisualRoom.scenario.modal.1.row.2')}</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={disableGoal} waitReading continueButtonAction={() => {
            showForm = true
            savedVolume = getVolume() * 100
    }}>
    <div>
        <div class="container mb-5">
            <h2 class="mb-2">{$t('common.layout.title.goal')}</h2>
            <p>{$t('audiovisualRoom.goal.row.1')}</p>
        </div>
    </div>
</TypewriterComponent>
{#if showForm}
    <div class="d-flex flex-column my-2 align-items-center">
        <Grid>
            <Row>
                <AudioComponent id="deafHigh" name={$t('audiovisualRoom.test.buttons.deafHigh.text')}
                                src="{base}/surface/laboratory/audiovisual_room/{$page.params.lang}/nodeaf.mp3" volume={0.0010}
                                onEnded={() => showAudioMediumDeaf = true}></AudioComponent>
                {#if showAudioMediumDeaf}
                    <AudioComponent id="deafMedium" name={$t('audiovisualRoom.test.buttons.deafMedium.text')}
                                    src="{base}/surface/laboratory/audiovisual_room/{$page.params.lang}/nodeaf.mp3"
                                    volume={0.0020} onEnded={() => showAudioLowDeaf = true}></AudioComponent>
                {/if}
                {#if showAudioLowDeaf}
                    <AudioComponent id="deafLow" name={$t('audiovisualRoom.test.buttons.deafLow.text')}
                                    src="{base}/surface/laboratory/audiovisual_room/{$page.params.lang}/nodeaf.mp3"
                                    volume={0.01} onEnded={() => showAudioVeryLowDeaf = true}></AudioComponent>
                {/if}
                {#if showAudioVeryLowDeaf}
                    <AudioComponent id="deafVeryLow" name={$t('audiovisualRoom.test.buttons.deafVeryLow.text')}
                                    src="{base}/surface/laboratory/audiovisual_room/{$page.params.lang}/nodeaf.mp3"
                                    volume={0.1}></AudioComponent>
                {/if}
            </Row>
        </Grid>
        <FluidForm class="my-2">
            <TextInput
                    labelText={$t('audiovisualRoom.test.buttons.keyword.text')}
                    placeholder={$t('audiovisualRoom.test.buttons.keyword.placeholder')}
                    required invalid={invalidResult} invalidText={$t('audiovisualRoom.test.buttons.keyword.error')}
                    bind:value={result}/>
        </FluidForm>
        <Button kind="primary" class="mt-4 mb-2"
                on:click={() => validateForm()}>{$t('audiovisualRoom.test.buttons.submit.text')}</Button>
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
    import {getVolume, setVolume} from "$lib/store/VolumeStore";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {onMount} from "svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import AudioComponent from "$lib/technicalComponent/AudioComponent.svelte";
    import {page} from "$app/stores";

    onMount(() => {
        changeSource("/ost/step8.mp3")
        renderStore.set(new RenderData($t('common.step.audiovisualRoom'), $t('audiovisualRoom.neon.title'), $t('audiovisualRoom.neon.subtitle'), Step.SURFACE_LABORATORY_AUDIOVISUALROOM));
    })

    let showTransitionModal = true;
    let showScenario = true;
    let showEnigm = false;
    let showForm = false;
    let isWaiting = false;
    let disableGoal = true;
    let result = ""
    let showAudioMediumDeaf = false
    let showAudioLowDeaf = false
    let showAudioVeryLowDeaf = false
    let savedVolume = 0

    $: invalidResult = !new RegExp($t('audiovisualRoom.test.response'), 'i').test(result)
    const validateForm = () => {
        if (new RegExp($t('audiovisualRoom.test.response'), 'i').test(result)) {
            isWaiting = true
            setVolume(savedVolume)
            redirect($page.params.lang, "surface/laboratory/sanctuary")
        }
    }

</script>

<style lang="css">
    label {
        font-size: 1.3em;
    }

    audio {
        margin-right: 2em;
        margin-top: 1em;
    }
</style>

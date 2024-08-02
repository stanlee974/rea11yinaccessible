{#if !audio}
    <div style="text-indent: -9999px;" aria-hidden={true}> bind:this={audio}</div>
    {#if displayPlayButton}
        <Button iconDescription={$t('common.header.audio')} tooltipAlignment="start" kind="ghost" icon={PlayFilledAlt}
                on:click={() => toggle(true)} aria-pressed="true"></Button>
    {:else }
        <Button iconDescription={$t('common.header.audio')} tooltipAlignment="start" kind="ghost" icon={PauseFilled}
                on:click={() => toggle(false)} aria-pressed="false"></Button>

    {/if}
{/if}
<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {onDestroy, onMount} from "svelte";
    import {checkVolume, getVolumeStore, initVolumeStore} from "$lib/store/VolumeStore";
    import {get, type Unsubscriber} from "svelte/store";
    import {audioStore} from "$lib/store/inMemoryStore/AudioStore";
    import {Button} from "carbon-components-svelte";
    import {PauseFilled, PlayFilledAlt} from "carbon-icons-svelte";
    import {t} from "$lib";

    let audio: HTMLAudioElement;
    let displayPlayButton: boolean = true;

    let audioUnsubscriber: Unsubscriber = () => {
    };

    const toggle = (play: boolean) => {
        let htmlAudioElement = get(audioStore);
        //FIXME : persist state of play button
        if (play) {
            htmlAudioElement.play()
            getVolumeStore()?.subscribe((volume) => {
                htmlAudioElement.volume = Number(volume) / 100
            })
        } else {
            htmlAudioElement.pause()
        }
        displayPlayButton = !displayPlayButton
        // setPlaySong(displayPlayButton)
    }

    onMount(() => {
        if (!checkVolume()) {
            let INITIAL_VOLUME = "2";
            initVolumeStore(INITIAL_VOLUME)
        }
        audioUnsubscriber = audioStore.subscribe(async (value) => {
            if (value /*|| getHeaderStoreData().playSong*/) {
                value.play()
                    .then(() => {
                        getVolumeStore()?.subscribe((volume) => {
                            value.volume = Number(volume) / 100
                        })
                        displayPlayButton = false
                    }).catch(() => {
                    displayPlayButton = true
                    // setPlaySong(displayPlayButton)
                })
            }
        })
    })

    onDestroy(audioUnsubscriber)
</script>


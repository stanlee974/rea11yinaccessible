<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {onDestroy, onMount} from "svelte";
    import {get, type Unsubscriber} from "svelte/store";
    import {audioStore} from "$lib/store/inMemoryStore/AudioStore";
    import {Button} from "carbon-components-svelte";
    import {PauseFilled, PlayFilledAlt} from "carbon-icons-svelte";
    import {t} from "$lib";
    import {headerStore, setPlaySong} from "../store/HeaderStore";
    import {changeVolume} from "../store/inMemoryStore/AudioStore";

    let displayPlayButton: boolean = true;

    let audioUnsubscriber: Unsubscriber = () => {
    };

    const toggle = (play: boolean) => {
        let htmlAudioElement = get(audioStore);
        if (play) {
            displayPlayButton = false
            htmlAudioElement.play()
            htmlAudioElement.volume = $headerStore.songVolume / 100
        } else {
            displayPlayButton = true
            htmlAudioElement.pause()
        }
        setPlaySong(play)
    }

    onMount(() => {
        displayPlayButton = !$headerStore.playSong
        headerStore.subscribe((data) => {
            const audio: HTMLAudioElement = get(audioStore)
            if (audio) {
                changeVolume(Number(data.songVolume) / 100)
            }
        })
        audioUnsubscriber = audioStore.subscribe(async (value) => {
            if (value && $headerStore.playSong) {
                value.play()
                    .then(() => {
                        value.volume = $headerStore.songVolume / 100
                        displayPlayButton = false
                    }).catch((err) => {
                    console.error(err)
                    displayPlayButton = true
                    setPlaySong(false)
                })
            }
        })
    })

    onDestroy(audioUnsubscriber)
</script>

<Button id="song" iconDescription={$t('common.header.audio')} tooltipAlignment="start" kind="ghost"
        icon={displayPlayButton ? PlayFilledAlt : PauseFilled} class="me-4"
        on:click={() => toggle(displayPlayButton)} isSelected={!displayPlayButton}></Button>

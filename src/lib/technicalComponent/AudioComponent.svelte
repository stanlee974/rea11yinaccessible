<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {onMount} from "svelte";
    import {Button, Column} from "carbon-components-svelte";
    import {PauseFilled, PlayFilledAlt} from "carbon-icons-svelte";
    import {base} from "$app/paths";

    let audio: HTMLAudioElement
    export let id: string
    export let name: string
    export let src: string
    export let volume: number

    export let onEnded: Function | undefined = undefined
    let displayPlayButton: boolean = true


    const toggle = (play: boolean) => {
        if (play) {
            audio.play()
        } else {
            audio.pause()
        }
        displayPlayButton = !displayPlayButton
    }

    onMount(() => {
        audio = new Audio(base + src)
        audio.loop = false
        audio.volume = volume
        audio.onended = (event) => {
            audio.currentTime = 0
            toggle(false)
            if (onEnded) {
                onEnded()
            }
        }
    })
</script>
<Column style="display: flex; align-items: center; flex-direction: column; width: 20rem;">
    <span id={id}>{name}</span>
    <audio aria-labelledby={id} style="text-indent: -9999px;" aria-hidden={true}> bind:this={audio} >
    </audio>
    <Button iconDescription={name} tooltipAlignment="start" kind="ghost"
            icon={displayPlayButton ? PlayFilledAlt : PauseFilled}
            on:click={() => toggle(displayPlayButton)} aria-pressed={displayPlayButton ? "false" : "true"}></Button>
</Column>

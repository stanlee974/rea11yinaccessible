<Header title="Introduction"/>
<SongComponent src="/ost/intro.mp3" autoplay={true} pause={openingPause} volume={get(volumeStore) / 100}></SongComponent>
<Content id="scenario" style="background-color: #161616;">
    <h1 lang="en">Really Inaccessible</h1>
    <br/>
    <br/>
    <h2>Contexte</h2>
    <p style="font-size: 1.6rem">Bienvenue dans "Rea11y Inaccessible", un escape game unique en son genre où vous serez confronté aux défis de
        l'accessibilité. </p>
    <p style="font-size: 1.6rem">Aujourd'hui, vous allez vivre une aventure immersive qui vous plongera dans la peau de personnes vivant avec
        divers handicaps. Votre mission : résoudre des énigmes et franchir des obstacles pour sortir victorieux.</p>
    <br/>
    <br/>
    <h2>Thématiques abordées</h2>
    <p style="font-size: 1.6rem">
        Handicap Visuel : Par moments, votre vision sera restreinte ou entièrement obscurcie. Vous devrez compter sur
        vos autres sens et sur vos coéquipiers pour avancer.</p>
    <p style="font-size: 1.6rem">
        Handicap Auditif : Parfois, le son sera faible.</p>
    <p style="font-size: 1.6rem">
        Handicap Moteur : Certains puzzles nécessiteront de la patience avec une mobilité
        réduite.
    </p>
</Content>
<Button kind="secondary"
        style="left: 46%; padding-right: 2.5rem; padding-left: 2.5rem; margin-top: 2rem;"
        on:click={() => {
            openingPause = true
            goto("/waitingroom")
        }}>Débuter la partie
</Button>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button, Content } from "carbon-components-svelte";
  import Header from "$lib/HeaderComponent.svelte";
  import SongComponent from "$lib/SongComponent.svelte";
  import { goto } from "$app/navigation";
  import { volumeStore } from "$lib/Store";
  import { get } from 'svelte/store';

  let openingPause = false
  let volume: number

</script>

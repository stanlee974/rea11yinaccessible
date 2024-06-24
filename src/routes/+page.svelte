<Header title={Step.INTRODUCTION}/>
<SongComponent src="/ost/intro.mp3" autoplay={true} pause={openingPause}></SongComponent>
<Content id="scenario" style="background-color: #161616;">
    <h1 lang="en">Really Inaccessible</h1>
    <br/>
    <br/>
    <h2>Conseil</h2>
    <p style="font-size: 1.6rem">Pour plus d'immersion : </p>
    <p style="font-size: 1.3rem">Monter le son de votre ordinateur ou tablette à 100% et paramétrer le volume audio avec la barre de volume "Song Volume"</p>
    <p style="font-size: 1.3rem">Cliquer sur F11 pour mettre en plein écran</p>
    <p style="font-size: 1.6rem">Si vous êtes bloqués : </p>
    <p style="font-size: 1.3rem">Vous disposez de 2 indices en haut à droite. Si ce n'est pas suffisant, un 3ème indice sera disponible et s'apparentera à la solution.</p>
    <br/>
    <h2>Contexte</h2>
    <p style="font-size: 1.3rem">Bienvenue dans "Rea11y Inaccessible", un escape game inédit dans lequel vous serez
        confronté aux défis de
        l'accessibilité. Escape game où vous plongerez dans
        une société où la norme est bien différente de celle que vous connaissez.</p>
    <p style="font-size: 1.3rem">Aujourd'hui, vous allez vivre une aventure immersive qui vous plongera dans la peau de
        personnes vivant avec
        divers handicaps.</p>
    <br/>
    <br/>
    <h2>Thématiques abordées</h2>
    <p style="font-size: 1.3rem">
        Handicap Visuel : Par moments, votre vision sera restreinte ou entièrement obscurcie. Vous devrez compter sur
        vos autres sens pour avancer.</p>
    <p style="font-size: 1.3rem">
        Handicap Auditif : Parfois, le son sera presque inaudible.</p>
    <p style="font-size: 1.3rem">
        Handicap Cognitif : Attention a bien rester concentré.</p>
    <p style="font-size: 1.3rem">
        Handicap Moteur : Certains puzzles nécessiteront de la patience avec une mobilité
        réduite.
    </p>
</Content>
<Button kind="secondary"
        style="left: 46%; padding-right: 2.5rem; padding-left: 2.5rem; margin-top: 2rem; margin-bottom: 2rem"
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
  import { getVolume } from "$lib/store/VolumeStore";
  import { Step } from "$lib";


  let openingPause = false

</script>

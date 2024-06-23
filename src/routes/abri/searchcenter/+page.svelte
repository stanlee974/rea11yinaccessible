<HeaderComponent title="Troubles cognitifs | image intrusives"/>
<SongComponent src="/ost/step4.mp3" autoplay={true} pause={pauseSong}></SongComponent>
<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">L'abri</h1>
            <h2 class="flux">Salle des enigmes</h2>
        </div>
    </Typewriter>
    <br/>
    <Modal size="lg" preventCloseOnClickOutside passiveModal bind:open modalHeading=""
           on:close={() => {showScenario = false; showOverlay()}}>
        <div style="display: flex; flex-direction: row">
            <Grid>
                <Row>
                    <Column>
                        <div class="glitch">
                            <ImageLoader
                                    src="{base}/abri/search_center/zone.jpg"
                                    alt="Tu rentres dans le centre de recherche abandonné" fadeIn={true}/>
                        </div>
                    </Column>
                    <Column><p>En utilisant le médicament Dysclecsus, tu as pu exploiter une
                        forme temporaire de dyslexie pour déchiffrer le texte.</p>
                        <p>Tu montes des escaliers te rapprochant de la surface. Tu entres
                            maintenant dans une nouvelle zone du complexe, un ancien centre de recherche abandonné.</p>
                    </Column>
                </Row>
            </Grid>
        </div>
    </Modal>
    <TypewriterComponent disabled={showScenario} parentDoneAction={() => setTimeout(() => showEnigm = true, 2000)}>
        <h2><u><i>Scénario</i></u></h2>
        <p>Les effets de la pilule Dysclecsus commencent à se dissiper, mais tu ressens maintenant des effets
            secondaires imprévus sous forme d'hallucinations visuelles et auditives.</p>
        <p>Cette salle est une grande pièce circulaire, légèrement éclairée par un puit de lumière central. Au centre,
            il y a un podium avec trois piédestaux, chacun contenant une énigme.</p>
    </TypewriterComponent>
    <Modal size="lg" preventCloseOnClickOutside passiveModal bind:open={showEnigm} modalHeading="3 fiches à énigmes"
           on:open
           on:close={() => disableGoal = false}>
        <Tabs>
            <Tab label="Enigme 1"/>
            <Tab label="Enigme 2"/>
            <Tab label="Enigme 3"/>
            <svelte:fragment slot="content">
                <TabContent>
                    <p>Dès que l'on me nomme, on me brise. Qui suis-je?</p>
                </TabContent>
                <TabContent>
                    <p>{dyslexia("Je commence par un E, je termine par une E, je ne contiens qu'une seule lettre, mais je ne suis pas la lettre E. Qui suis-je?", {scrambleChance: 20})}</p>
                </TabContent>
                <TabContent>
                    <p>Je transforme une plante en une planète. Qui suis-je ?</p>
                </TabContent>
            </svelte:fragment>
        </Tabs>
    </Modal>
    <br/>
    <TypewriterComponent disabled={disableGoal} parentDoneAction={() => showForm = true}>
        <h2><u><i>Objectif</i></u></h2>
        <p>Tu dois faire abstraction des hallucinations sonores et visuelles perturbantes pour ne pas te laisser induire
            en erreur. Reste donc concentré malgré les hallucinations et trouve les 3 réponses.</p>
    </TypewriterComponent>
    {#if showForm}
        <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
            <FluidForm>
                <TextInput aria-label="enigm1"
                           labelText="Réponse énigme 1" placeholder="Saisir une réponse"
                           required invalid={invalidEnigm1} invalidText="la réponse est erroné. Un seul mot est attendu."
                           autofocus bind:value={enigm1}/>
                <TextInput aria-label="enigm1"
                           labelText="Réponse énigme 2" placeholder="Saisir une réponse"
                           required invalid={invalidEnigm2} invalidText="la réponse est erroné. Un seul mot est attendu."
                           bind:value={enigm2}/>
                <TextInput aria-label="enigm3"
                           labelText="Réponse énigme 3" placeholder="Saisir une réponse"
                           required invalid={invalidEnigm3} invalidText="la réponse est erroné. Ne mets pas plusieurs mots."
                           bind:value={enigm3}/>
            </FluidForm>
            <Row style="margin-top: 1rem">
                <Button kind="secondary" on:click={() => validateForm()} style="margin-right: 1rem">Valider</Button>
                <Button kind="secondary" on:click={() => showEnigm = true}>Indices</Button>
            </Row>
        </div>
        {#if isWaiting}
            <Loading/>
        {/if}
    {/if}
    <div id="overlay" bind:this={overlay}>
        <div id="content" bind:this={content}>
        </div>
    </div>
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import {
    Button,
    Column,
    Content,
    FluidForm,
    Grid,
    ImageLoader,
    Loading,
    Modal,
    Row,
    Tab,
    TabContent,
    Tabs,
    TextInput,
  } from "carbon-components-svelte";
  import Typewriter from 'svelte-typewriter'
  import dyslexia from "dyslexia";
  import { goto } from "$app/navigation";
  import HeaderComponent from "$lib/HeaderComponent.svelte";
  import { base } from '$app/paths';
  import TypewriterComponent from "$lib/TypewriterComponent.svelte";
  import SongComponent from "$lib/SongComponent.svelte";

  let open = true;
  let showScenario = true;
  let showEnigm = false;
  let disableGoal = true;
  let showForm = false;
  let isWaiting = false;
  let pauseSong = false;
  let enigm1 = ""
  let enigm2 = ""
  let enigm3 = ""

  let overlay: HTMLElement;
  let content: HTMLElement;

  const disturbedImageUrls = [
    base + "/abri/search_center/disturb/1.png",
    base + "/abri/search_center/disturb/2.png",
    base + "/abri/search_center/disturb/3.png",
    base + "/abri/search_center/disturb/4.jpg",
    base + "/abri/search_center/disturb/5.png",
    base + "/abri/search_center/disturb/6.jpg",
    base + "/abri/search_center/disturb/7.jpg"
  ];

  const getDisturbedImage = () => {
    const index = Math.floor(Math.random() * disturbedImageUrls.length);
    return disturbedImageUrls[index];
  }

  const hideOverlay = () => {
    if (overlay) {
      overlay.style.display = 'none';
    }
    const randomDelay = Math.random() * 2000 + 2000;
    setTimeout(showOverlay, randomDelay);
  }

  const showOverlay = () => {
    if (content) {
      content.innerHTML = `<img src="${getDisturbedImage()}" alt="image intrusive">`;
    }
    if (overlay) {
      overlay.style.display = 'flex';
    }
    const randomDelay = Math.random() * 2000 + 2000;
    setTimeout(hideOverlay, randomDelay);
  }

  $: invalidEnigm1 = !/^silence$/i.test(enigm1);
  $: invalidEnigm2 = !/^enveloppe$/i.test(enigm2);
  $: invalidEnigm3 = !/^è$/i.test(enigm3);

  const validateForm = (): void => {
    if ("silence" === enigm1.trim().toLowerCase()
      && "enveloppe" === enigm2.trim().toLowerCase()
      && "è" === enigm3.trim().toLowerCase()) {
      isWaiting = true;
      pauseSong = true
      goto(base + "/surface/entrance");
    }
  }

</script>

<style lang="css">
    @import url(static/css/app.css);
    @import url(static/css/neon.css);
    @import url(static/css/glitch.css);

    body {
        font-size: 24px;
        margin: 0;
        padding: 0;
    }

    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }

    #content {
        text-align: center;
        color: black;
        animation: moveContent 5s infinite, fadeInOut 5s infinite;
    }

    @keyframes moveContent {
        0% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(200px, 200px);
        }
        50% {
            transform: translate(400px, 0);
        }
        75% {
            transform: translate(200px, -200px);
        }
        100% {
            transform: translate(0, 0);
        }
    }

    @keyframes fadeInOut {
        0%, 100% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
    }
</style>

<HeaderComponent title={Step.ABRI_ENTRANCE}/>
<SongComponent src="/ost/step1.mp3" autoplay={true} pause={song}></SongComponent>
<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">L'abri</h1>
            <h2 class="flux">Salle des alterations</h2>
        </div>
    </Typewriter>
    <br/>
    <ModalComponent
            parentDoneAction={() => hideScenario = false}>
        <Grid>
            <Row>
                <Column>
                    <ImageLoader
                            src="{base}/abri/entrance/enter.jpg" alt="Tu rentres dans l'abri" fadeIn={true}/>
                </Column>
                <Column>
                    <p>
                        L'entrée de l'abri est une porte massive en acier, rouillée par les années et recouverte de
                        lierre et de mousse. </p>
                    <p>Un vieux panneau, à moitié effacé par le temps, porte l'inscription : "Refuge Alpha - Accès
                        Réservé au Personnel Autorisé". Tu t'approches de l'entrée avec un mélange de curiosité et
                        d'appréhension.
                    </p>
                </Column>
            </Row>
        </Grid>
    </ModalComponent>
    <br/>
    <TypewriterComponent disabled={hideScenario} delay={3000} parentDoneAction={() => {hideGoal = false}}>
        <h2><u><i>Scénario</i></u></h2>
        <p>Tu te trouves dans une salle obscure avec des équipements médicaux abandonnés et des armoires de
            rangement.</p>
        <p>Une note sur la table contient le message suivant : </p>
        <p style="font-style: italic;">"Blanc pur sur blanc pur, rien ne semble changer,
            Mais ajoute une ombre, et les couleurs se mettent à danser.
            Quand la lumière se fait douce ou se fait forte,
            Les nuances cachées frappent à notre porte."</p>
        <p>Dans un coin de la salle, se trouve un panneau de contrôle avec quatre boutons et un document déchiré
            mentionnant que la séquence correcte est liée aux perceptions des couleurs affectées par
            le daltonisme.</p>
    </TypewriterComponent>
    <br/>
    <TypewriterComponent disabled={hideGoal} parentDoneAction={() => showButtons = true}>
        <h2><u><i>Objectif</i></u></h2>
        <p>Tu dois trouver la bonne combinaison de 4 éléments sans attendre. Il n'y a pas 2 fois la même couleur dans la
            combinaison.</p>
    </TypewriterComponent>
    {#if showButtons}
        <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: space-between;">
            <Slider
                    labelText="Contraste"
                    min={0}
                    max={100}
                    maxLabel="100"
                    value={contrast}
                    step={1}
                    style="align-items: normal; margin-right: 2em"
                    on:input={(value) => {{contrast = value.detail}}}
            />
            <Button
                    style="background-color:#090B08; margin-right: 2rem; filter: contrast({contrast}%) brightness({brightness}%);"
                    aria-label="Ce bouton Vert n'est pas le second"
                    on:click={() => validOrder(0)}> </Button>
            <Button
                    style="background-color:#0A0907; margin-right: 2rem;filter: contrast({contrast}%) brightness({brightness}%);"
                    aria-label="Ce bouton Orange vient après le bouton Vert"
                    on:click={() => validOrder(1)}>
            </Button>
            <Button
                    style="background-color:#0B090A; margin-right: 2rem;filter: contrast({contrast}%) brightness({brightness}%);"
                    aria-label="Ce bouton Saumon n'est jamais le premier ni le dernier"
                    on:click={() => validOrder(2)}>
            </Button>
            <Button
                    style="background-color:#0B0A06; margin-right: 2rem;filter: contrast({contrast}%) brightness({brightness}%);"
                    aria-label="Ce bouton Jaune est immédiatement suivi par le bouton Saumon"
                    on:click={() => validOrder(3)}>
            </Button>
            <Slider
                    labelText="Luminosité"
                    min={0}
                    max={100}
                    maxLabel="100"
                    value={brightness}
                    step={1}
                    style="align-items: normal"
                    on:input={(value) => {{brightness = value.detail}}}
            />
        </div>
        {#if isWaiting}
            <LoadingComponent onclose={() => song = true}/>
        {/if}
    {/if}
    {#if showError}
        <ToastNotification
                lowContrast
                fullWidth
                kind="error"
                title="Erreur"
                subtitle="L'ordre d'activation des boutons n'est pas bon"
                caption="Essaie encore"
                {timeout}
                on:close={(e) => {
                showError = false;
              }}
        />
    {/if}
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button, Column, Content, Grid, ImageLoader, Row, Slider, ToastNotification } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { base } from '$app/paths';
  import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
  import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
  import SongComponent from "$lib/technicalComponent/SongComponent.svelte";
  import LoadingComponent from "$lib/technicalComponent/LoadingComponent.svelte";
  import { Step } from "$lib";
  import LayoutComponent from "$lib/renderComponent/LayoutComponent.svelte";
  import HeaderComponent from "$lib/renderComponent/HeaderComponent.svelte";
  import Typewriter from "svelte-typewriter";

  const goodOrder = [3, 2, 0, 1];
  let orderTyped: number[] = [];
  let showError = false;
  let hideScenario = true;
  let hideGoal = true;
  let showButtons = false;
  let isWaiting = false;
  let song = false;
  let contrast = 0;
  let brightness = 0;
  const timeout: number = 4000;
  const validOrder = (id: number) => {
    orderTyped.push(id);
    if (orderTyped.length >= 4) {
      if (JSON.stringify(orderTyped) == JSON.stringify(goodOrder)) {
        isWaiting = true;
        goto(base + "/abri/computer")
      } else {
        showError = true;
        orderTyped = [];
      }
    }
  }

</script>
<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);
    @import url(/css/glitch.css);
</style>

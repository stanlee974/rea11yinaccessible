<Header/>
<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">L'abri</h1>
            <h2 class="flux">"Salle des lunettes"</h2>
        </div>
    </Typewriter>
    <br/>    <ModalComponent
            parentDoneAction={() => hideScenario = false}>
        <Grid>
            <Row>
                <Column>
                    <div class="glitch">
                        <ImageLoader
                                src="{base}/abri/enter.jpg" alt="Tu rentres dans l'abri" fadeIn={true}/>
                    </div>
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
    <TypewriterComponent disabled={hideScenario} delay={3000} parentDoneAction={() => {showGoal = false}}>
        <h2><u><i>Scénario</i></u></h2>
        <p>Tu te trouves dans une salle obscure avec des équipements médicaux abandonnés et des armoires de rangement.
            Sur une table, se trouve une paire de lunettes étranges qui attire ton attention.</p>
        <p>Une note sur la table indiquant que les lunettes simulent différentes formes de daltonisme.</p>
        <p>Dans un coin de la salle, il y a un panneau de contrôle avec quatre boutons de couleurs différentes (vert,
            marron clair, orange, saumon).</p>
        <p>Un document déchiré mentionnant que la séquence correcte est liée aux perceptions des couleurs affectées par
            le daltonisme.</p>
    </TypewriterComponent>
    <br/>
    <TypewriterComponent disabled={showGoal} parentDoneAction={() => showButtons = true}>
        <h2><u><i>Objectif</i></u></h2>
        <p>Tu dois trouver la bonne combinaison sans attendre.</p>
    </TypewriterComponent>
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
    {#if showButtons}
        <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: center;">
            <Button kind="secondary"
                    style="margin-right: 2rem;"
                    on:click={() => validOrder(0)}>Vert
            </Button>
            <Button kind="secondary"
                    style="margin-right: 2rem;"
                    on:click={() => validOrder(1)}>Orange
            </Button>
            <Button kind="secondary"
                    style="margin-right: 2rem;"
                    on:click={() => validOrder(2)}>Saumon
            </Button>
            <Button kind="secondary"
                    style="margin-right: 2rem;"
                    on:click={() => validOrder(3)}>Marron clair
            </Button>
        </div>
        {#if isWaiting}
            <Loading/>
        {/if}
    {/if}
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button, Content, Column, Grid, Header, ImageLoader, Loading, Row, ToastNotification } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { base } from '$app/paths';
  import TypewriterComponent from "$lib/TypewriterComponent.svelte";
  import ModalComponent from "$lib/ModalComponent.svelte";
  import Typewriter from "svelte-typewriter";

  const goodOrder = [3, 2, 0, 1];
  let orderTyped: number[] = [];
  let showError = false;
  let hideScenario = true;
  let showGoal = true;
  let showButtons = false;
  let isWaiting = false;

  const timeout: number = 4000;
  const validOrder = (id: number) => {
    orderTyped.push(id);
    if (orderTyped.length === 4) {
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
<style>
    @import url(static/css/app.css);
    @import url(static/css/neon.css);
    @import url(static/css/glitch.css);
</style>

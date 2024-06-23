<HeaderComponent title="daltonisme"/>
<SongComponent src="/ost/step1.mp3" autoplay={true} pause={song}></SongComponent>
<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">L'abri</h1>
            <h2 class="flux">Salle des lunettes</h2>
        </div>
    </Typewriter>
    <br/>
    <ModalComponent
            parentDoneAction={() => hideScenario = false}>
        <Grid>
            <Row>
                <Column>
                    <div class="glitch">
                        <ImageLoader
                                src="{base}/abri/entrance/enter.jpg" alt="Tu rentres dans l'abri" fadeIn={true}/>
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
    <TypewriterComponent disabled={hideScenario} delay={3000} parentDoneAction={() => {hideGoal = false}}>
        <h2><u><i>Scénario</i></u></h2>
        <p>Tu te trouves dans une salle obscure avec des équipements médicaux abandonnés et des armoires de rangement.</p>
        <p>Une note sur la table contient le message suivant : </p>
        <p style="font-style: italic;">"Blanc pur sur blanc pur, rien ne semble changer,
            Mais ajoute une ombre, et les couleurs se mettent à danser.
            Quand la lumière se fait douce ou se fait forte,
            Les nuances cachées frappent à notre porte."</p>
        <p>Dans un coin de la salle, se trouve un panneau de contrôle avec quatre boutons et un document déchiré mentionnant que la séquence correcte est liée aux perceptions des couleurs affectées par
            le daltonisme, avec la bande de couleurs suivante.</p>
    </TypewriterComponent>
    {#if !hideGoal}
        <br/>
        <div style="width: 300px; height: 20px; position: absolute; left: 42%; filter: contrast({contrast}%) brightness({brightness}%);">
            <ImageLoader src="{base}/abri/entrance/indice.png" alt="Panel de couleur dans l'ordre attendu"
                         fadeIn={true}></ImageLoader>
        </div>
        <br/>
    {/if}
    <br/>
    <TypewriterComponent disabled={hideGoal} parentDoneAction={() => showButtons = true}>
        <h2><u><i>Objectif</i></u></h2>
        <p>Tu dois trouver la bonne combinaison sans attendre.</p>
    </TypewriterComponent>
    {#if showButtons}
        <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: center;">
            <Slider
                    labelText="Contraste"
                    min={0}
                    max={100}
                    hideTextInput
                    maxLabel="100"
                    value={contrast}
                    step={1}
                    on:change={(value) => {{contrast = value.detail}}}
            />
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
                    on:click={() => validOrder(3)}>Jaune
            </Button>
            <Slider
                    labelText="Luminosité"
                    min={0}
                    max={100}
                    hideTextInput
                    maxLabel="100"
                    value={brightness}
                    step={1}
                    on:change={(value) => {{brightness = value.detail}}}
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
  import TypewriterComponent from "$lib/TypewriterComponent.svelte";
  import ModalComponent from "$lib/ModalComponent.svelte";
  import Typewriter from "svelte-typewriter";
  import SongComponent from "$lib/SongComponent.svelte";
  import LoadingComponent from "$lib/LoadingComponent.svelte";
  import HeaderComponent from "$lib/HeaderComponent.svelte";
  import { setVolume } from "$lib/store/VolumeStore";

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
  let hint: HTMLElement;
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
<style>
    @import url(static/css/app.css);
    @import url(static/css/neon.css);
    @import url(static/css/glitch.css);
</style>

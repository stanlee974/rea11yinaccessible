<ModalComponent opened={showTransitionModal}
                parentDoneAction={() => {showScenario = false}}>
    <div style="display: flex; flex-direction: row">
        <Grid>
            <Row>
                <Column>
                    <ImageLoader
                            src="{base}/surface/laboratory/audiovisual_room/spiral_staircase.jpg"
                            alt="Tu montes les escaliers en colimaçon" fadeIn={true}/>
                </Column>
                <Column><p style="font-size: 1.5rem">Une petite trappe s'ouvre et tu y glisses ta main. Rien à
                    l'intérieur... </p>
                    <p style="font-size: 1.5rem">Tu continues donc, ton exploration du laboratoire secondaire. Des
                        bruits lointains à l'extérieur du bâtiment. </p>
                    <p style="font-size: 1.5rem">Tu
                        gravis l'escalier en colimaçon à toute vitesse et arrives dans une salle étrangement calme
                        et
                        sombre. En entrant, tu découvres une salle audiovisuelle, remplie de bandes sonores et de
                        vidéos anciennes.</p>
                </Column>
            </Row>
        </Grid>
    </div>
</ModalComponent>
<TypewriterComponent disabled={showScenario} parentDoneAction={() => setTimeout(() => {showEnigm = true}, 2000)}>
    <h2><u><i>Scénario</i></u></h2>
    <p>La salle est équipée de plusieurs écrans vidéo et de postes d'écoute avec des casques. Des rayonnages remplis
        de bobines de films et de cassettes audio tapissent les murs. Des bancs poussiéreux sont disposés devant les
        écrans, invitant les étrangers à s'asseoir et à écouter.</p>
</TypewriterComponent>
<ModalComponent opened={showEnigm}
                parentDoneAction={() => disableGoal = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/surface/laboratory/audiovisual_room/audioroom.jpg"
                        alt="Salle technique audiovisuelle" fadeIn={true}/>
            </Column>
            <Column><p>Des notes éparses expliquent que cette salle servait autrefois de centre de documentation
                pour les expériences scientifiques menées dans le laboratoire</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<br aria-hidden="true"/>
<TypewriterComponent disabled={disableGoal} waitReading continueButtonAction={() => {
            showForm = true
            savedVolume = getVolume() * 100
    }}>
    <h2><u><i>Objectif</i></u></h2>
    <p>Chaque poste d'écoute est associé à une bande sonore de niveaux sonores différents. Le but est de découvrir
        le mot clé et de le saisir sur une borne numérique.</p>
</TypewriterComponent>
{#if showForm}
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <Grid padding>
            <Row>
                <Column>
                    <label id="deafLow">Surdité élevé</label>
                    <audio aria-labelledby="deafLow" controls
                           on:ended={() => showAudioLow2 = true}
                           style="margin-right: 2rem" autofocus>
                        <source src="{base}/surface/laboratory/audiovisual_room/audio_low.mp3" type="audio/mpeg">
                    </audio>
                </Column>
                <Column>
                    {#if showAudioLow2}
                        <label id="deafLow2">Surdité moyennement élevé</label>
                        <audio aria-labelledby="deafLow2" controls
                               on:ended={() => showAudioMedium = true}
                        >
                            <source src="{base}/surface/laboratory/audiovisual_room/audio_low2.mp3"
                                    type="audio/mpeg">
                        </audio>
                    {/if}
                </Column>

                <Column>
                    {#if showAudioMedium}
                        <label id="deafMedium">Surdité faible</label>
                        <audio aria-labelledby="deafMedium" controls>
                            <source src="{base}/surface/laboratory/audiovisual_room/audio_medium.mp3"
                                    type="audio/mpeg">
                        </audio>
                    {/if}
                </Column>
            </Row>
        </Grid>
        <FluidForm>
            <TextInput aria-label="keyword"
                       labelText="Mot clé" placeholder="Entrer le mot clé"
                       required invalid={invalidResult} invalidText="le mot clé est erroné"
                       bind:value={result}/>
        </FluidForm>
        <Button kind="secondary" on:click={() => validateForm()}>Valider</Button>
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button, Column, FluidForm, Grid, ImageLoader, Loading, Row, TextInput, } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { base } from '$app/paths';
  import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
  import { Step } from "$lib";
  import { getVolume, setVolume } from "$lib/store/VolumeStore";
  import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
  import { onMount } from "svelte";
  import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
  import { changeSource } from "$lib/store/inMemoryStore/AudioStore";

  onMount(() => {
    changeSource("/ost/step8.mp3")
    renderStore.set(new RenderData(Step.SURFACE_LABORATORY_AUDIOVISUALROOM, "La surface", "La salle audiovisuelle"));
  })

  let showTransitionModal = true;
  let showScenario = true;
  let showEnigm = false;
  let showForm = false;
  let isWaiting = false;
  let disableGoal = true;
  let result = ""
  let showAudioLow2 = false
  let showAudioMedium = false
  let savedVolume = 0

  $: invalidResult = !/surdité$|surdite$/i.test(result)
  const validateForm = () => {
    if (/surdité$|surdite$/i.test(result)) {
      isWaiting = true
      setVolume(savedVolume)
      goto(base + "/surface/laboratory/sanctuary");
    }
  }

</script>

<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);

    label {
        font-size: 1.3em;
    }

    audio {
        margin-right: 2em;
        margin-top: 1em;
    }
</style>

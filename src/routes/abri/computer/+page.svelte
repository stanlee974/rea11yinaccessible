<HeaderComponent title={Step.ABRI_COMPUTER}/>
<SongComponent src="/ost/step3.mp3" autoplay={true} pause={pauseSong}></SongComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/nom.mp3" play={playLastName}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/prenom.mp3" play={playFirstName}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/naissance.mp3" play={playBirth}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/deces.mp3" play={playDeath}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/soumettre.mp3" play={playSubmit}></SoundEffectComponent>
<SoundEffectComponent src="/sound/error.mp3" play={playError}></SoundEffectComponent>

<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">L'abri</h1>
            <h2 class="flux">Salle de controle</h2>
        </div>
    </Typewriter>
    <br/>
    <ModalComponent
            opened={openTransition}
            parentDoneAction={() => hideScenario = false}>
        <div style="display: flex; flex-direction: row">
            <Grid>
                <Row>
                    <Column>
                        <div class="glitch">
                            <ImageLoader
                                    src="{base}/abri/computer/man_walking.jpg" alt="Tu avances vers la nouvelle salle"
                                    fadeIn={true}/>
                        </div>
                    </Column>
                    <Column><p>Un mécanisme se déclenche et la porte s'ouvre, te laissant passer dans la salle
                        suivante.</p>
                        <p>Tu entres dans une nouvelle salle avec un terminal informatique à l'écran cassé. Le reste de
                            la salle est
                            encombré de papiers et de notes.</p>
                    </Column>
                </Row>
            </Grid>
        </div>
    </ModalComponent>
    <TypewriterComponent disabled={hideScenario} parentDoneAction={() => showGoal = false}>
        <h2><u><i>Scénario</i></u></h2>
        <p>Plusieurs pages de manuel technique dispersées autour du terminal expliquent comment utiliser le clavier pour
            naviguer à l'aveugle.</p>
        <p>Une note indiquant que les commandes du terminal sont prédéfinies et que le code pour continuer se trouve
            dans le système.</p>
        <p>Une page déchirée laisse paraître une photo d'un inventeur et d'informations qui lui sont liées</p>
    </TypewriterComponent>
    <br/>
    <TypewriterComponent disabled={showGoal} continueButtonAction={() => {open = true;}} waitReading>
        <h2><u><i>Objectif</i></u></h2>
        <p>Tu dois saisir les informations de cet inventeur et appuyer sur entrer pour soumettre.</p>
    </TypewriterComponent>
    <Modal
            preventCloseOnClickOutside
            size="lg" passiveModal
            bind:open
            on:close={() => {showForm = true; open=false;}}
            modalHeading="Indices trouvés sur la table">
        <Tabs>
            <Tab label="Inventeur"/>
            <Tab label="Navigation"/>
            <svelte:fragment slot="content">
                <TabContent>
                    <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: center">
                        <ImageLoader
                                src="{base}/abri/computer/louisBraille.jpg" alt="Photo déchirée de l'inventeur"
                                fadeIn={true}/>
                    </div>
                </TabContent>
                <TabContent>
                    <p>La touche Tab du clavier, permet de passer au champ de saisie suivant.</p>
                    <p>La touche Shift+Tab du clavier, permet de retourner au champ de saisie précédent.</p>
                    <p>La touche Entrée du clavier, permet de cliquer sur les boutons par exemple pour soumettre un
                        formulaire.</p>
                    <p>Le format des dates est jj/mm/aaaa</p>
                </TabContent>
            </svelte:fragment>
        </Tabs>
    </Modal>
    {#if showForm}
        <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
            <Content id="computer" style="opacity: 0; pointer-events: none;">
                <FluidForm autofocus style="width: 1px; height: 1px">
                    <TextInput style="background-color: black; color: black" on:focus={readLabel} aria-label="nom"
                               labelText="Nom" placeholder="Entrer un nom..."
                               required invalid={invalidNom} invalidText="le nom est invalide"
                               bind:value={nom}/>
                    <TextInput style="background-color: black; color: black" on:focus={readLabel} aria-label="prenom"
                               labelText="Prénom"
                               placeholder="Entrer un prénom..." required
                               invalid={invalidPrenom} invalidText="le prénom est invalide"
                               bind:value={prenom}/>
                    <TextInput style="background-color: black; color: black" on:focus={readLabel}
                               aria-label="naissance" labelText="Date de naissance"
                               placeholder="Entrer une date..."
                               required
                               bind:value={naissance} invalid={invalidNaissance}
                               invalidText="La date de naissance n'est pas au format attendu : dd/mm/aaaa"
                    />
                    <TextInput style="background-color: black; color: black" on:focus={readLabel} aria-label="deces"
                               labelText="Date de décès"
                               placeholder="Entrer une date..."
                               required bind:value={deces}
                               invalid={invalidDeces}
                               invalidText="La date de décès n'est pas au format attendu : dd/mm/aaaa"/>
                </FluidForm>
                <Button kind="secondary" aria-label="soumettre" on:click={() => validateForm()} on:focus={readLabel}>
                    Soumettre la saisie
                </Button>
            </Content>
            <img src="{base}/abri/computer/computer.jpg" alt="ordinateur sur lequel se trouve le formulaire"/>
            <Button kind="secondary" on:click={() => open = true}>Consulter les notes</Button>
        </div>
        {#if isWaiting}
            <Loading/>
        {/if}
    {/if}
</Content>
<script lang="ts">
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
    TextInput
  } from "carbon-components-svelte";
  import Typewriter from 'svelte-typewriter'
  import { goto } from "$app/navigation";
  import HeaderComponent from "$lib/HeaderComponent.svelte";
  import { base } from '$app/paths';
  import ModalComponent from "$lib/ModalComponent.svelte";
  import TypewriterComponent from "$lib/TypewriterComponent.svelte";
  import SongComponent from "$lib/SongComponent.svelte";
  import { Step } from "$lib";
  import SoundEffectComponent from "$lib/SoundEffectComponent.svelte";

  let open = false;
  let openTransition = true;
  let isWaiting = false;
  let hideScenario = true;
  let showForm = false;
  let showGoal = true;
  let pauseSong: boolean = false;

  let playLastName: Function | undefined = undefined
  let playFirstName: Function | undefined = undefined
  let playBirth: Function | undefined = undefined
  let playDeath: Function | undefined = undefined
  let playSubmit: Function | undefined = undefined
  let playError: Function | undefined = undefined

  let nom = "";
  let prenom = "";
  let naissance = "";
  let deces = "";

  $: invalidNaissance = !/(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)$/.test(naissance);
  $: invalidDeces = !/(^0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4}$)$/.test(deces);
  $: invalidNom = !/^braille$/i.test(nom);
  $: invalidPrenom = !/^louis$/i.test(prenom);

  const validateForm = (): boolean => {
    let isValid = true;
    if ("braille" !== nom.trim().toLowerCase()) {
      isValid = false;
    }
    if ("louis" !== prenom.trim().toLowerCase()) {
      isValid = false;
    }
    if ("04/01/1809" !== naissance.trim().toLowerCase()) {
      isValid = false;
    }
    if ("06/01/1852" !== deces.trim().toLowerCase()) {
      isValid = false;
    }
    console.debug(
      nom.trim().toLowerCase(),
      prenom.trim().toLowerCase(),
      naissance.trim().toLowerCase(),
      deces.trim().toLowerCase()
    )
    if (isValid) {
      isWaiting = true
      pauseSong = true
      goto(base + "/abri/medical");
    } else {
      playError = () => playError = undefined
    }
    return isValid;
  }

  const readLabel = (event: any) => {
    const target = event.target;
    console.debug("libellé", target.getAttribute("aria-label"))
    if (target.getAttribute("aria-label") === "nom") {
      playLastName = () => playLastName = undefined
    }
    if (target.getAttribute("aria-label") === "prenom") {
      playFirstName = () => playFirstName = undefined;
    }
    if (target.getAttribute("aria-label") === "naissance") {
      playBirth = () => playBirth = undefined
    }
    if (target.getAttribute("aria-label") === "deces") {
      playDeath = () => playDeath = undefined
    }
    if (target.getAttribute("aria-label") === "soumettre") {
      playSubmit = () => playSubmit = undefined
    }
  }
</script>
<style>
    @import url(/css/app.css);
    @import url(/css/neon.css);
    @import url(/css/glitch.css);
</style>

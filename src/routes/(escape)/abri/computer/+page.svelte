<SoundEffectComponent src="/sound/accessibleName/fr/nom.mp3" postPlay={playLastName}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/prenom.mp3" postPlay={playFirstName}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/naissance.mp3" postPlay={playBirth}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/deces.mp3" postPlay={playDeath}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/fr/soumettre.mp3" postPlay={playSubmit}></SoundEffectComponent>
<SoundEffectComponent src="/sound/error.mp3" postPlay={playError}></SoundEffectComponent>
<ModalComponent
        opened={openTransition}
        parentDoneAction={() => hideScenario = false} >
    <div style="display: flex; flex-direction: row" autofocus>
        <Grid>
            <Row>
                <Column>
                    <ImageLoader
                            src="{base}/abri/computer/man_walking.jpg" alt="Tu avances vers la nouvelle salle"
                            fadeIn={true}/>
                </Column>
                <Column><p>Un mécanisme se déclenche et la porte s'ouvre, te laissant passer dans la salle
                    suivante.</p>
                    <p>Lorsque tu rentres, tu découvres qu'un accident a endommagé l'écran principal du système de contrôle. Tu dois désormais saisir des données critiques sans rien voir à l'écran.</p>
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
    <p aria-label="une page déchirée laisse paraître une photo de l'inventeur d'un langage utilisé par les non voyants et des informations qui lui sont liées">Une page déchirée laisse paraître une photo d'un inventeur et d'informations qui lui sont liées</p>
</TypewriterComponent>
<br aria-hidden="true"/>
<TypewriterComponent disabled={showGoal} continueButtonAction={() => {open = true;}} waitReading>
    <h2><u><i>Objectif</i></u></h2>
    <p>Tu dois saisir les informations de cet inventeur et appuyer sur entrer pour soumettre.</p>
</TypewriterComponent>
<ModalComponent
        opened="{open}"
        parentDoneAction={() => {showForm = true; open=false;}}
        modalHeading="Indices trouvés sur la table">
    <Tabs>
        <Tab label="Navigation"/>
        <Tab label="Inventeur"/>
        <svelte:fragment slot="content">
            <TabContent>
                <p>La touche Tab du clavier, permet de passer au champ de saisie suivant.</p>
                <p>La touche Shift+Tab du clavier, permet de retourner au champ de saisie précédent.</p>
                <p>La touche Entrée du clavier, permet de cliquer sur les boutons par exemple pour soumettre un
                    formulaire.</p>
                <p>Le format des dates est jj/mm/aaaa</p>
            </TabContent>
            <TabContent>
                <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: center">
                    <ImageLoader
                            src="{base}/abri/computer/louisBraille.jpg" alt="Photo déchirée de l'inventeur"
                            fadeIn={true}/>
                </div>
            </TabContent>
        </svelte:fragment>
    </Tabs>
</ModalComponent>
{#if showForm}
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <Button kind="secondary" on:click={() => open = true}>Consulter les notes</Button>
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
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}
<script lang="ts">
  import {
    Button,
    Column,
    Content,
    FluidForm,
    Grid,
    ImageLoader,
    Loading,
    Row,
    Tab,
    TabContent,
    Tabs,
    TextInput
  } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { base } from '$app/paths';
  import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
  import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
  import { Step } from "$lib";
  import SoundEffectComponent from "$lib/technicalComponent/SoundEffectComponent.svelte";
  import { onMount } from "svelte";
  import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
  import { changeSource } from "$lib/store/inMemoryStore/AudioStore";
  import { getAccessibilityMode } from "$lib/store/AccessibilityModeStore";

  onMount(() => {
    changeSource("/ost/step2.mp3")
    renderStore.set(new RenderData(Step.ABRI_COMPUTER, "L'abri", "Salle de controle"));
  })

  let open = false;
  let openTransition = true;
  let isWaiting = false;
  let hideScenario = true;
  let showForm = false;
  let showGoal = true;

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
      goto(base + "/abri/medical");
    } else {
      playError = () => playError = undefined
    }
    return isValid;
  }

  const readLabel = (event: any) => {
    if (!getAccessibilityMode()) {
      const target = event.target;
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
  }
</script>
<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);
</style>

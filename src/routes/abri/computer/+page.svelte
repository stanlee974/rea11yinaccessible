<Header/>
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
    <TypewriterComponent disabled={hideScenario} parentDoneAction={() => setTimeout(() => open = true, 2000)}>
        <h2><u><i>Scénario</i></u></h2>
        <p>Plusieurs pages de manuel technique dispersées autour du terminal expliquant comment utiliser le clavier pour
            naviguer à l'aveugle.</p>
        <p>Une note indiquant que les commandes du terminal sont prédéfinies et que le code pour continuer se trouve
            dans le système.</p>
        <p>Une page déchirée laisse paraître le nom d'un inventeur</p>
    </TypewriterComponent>
    <Modal
            size="lg" passiveModal
            bind:open
            on:close={() => {showGoal = false; open=false;}}
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
                    <p>La touche Entrée du clavier, permet de cliquer sur les boutons.</p>
                    <p>Le format des dates est jj/mm/aaaa</p>
                </TabContent>
            </svelte:fragment>
        </Tabs>
    </Modal>
    <br/>
    <TypewriterComponent disabled={showGoal} parentDoneAction={() => showForm = true}>
        <h2><u><i>Objectif</i></u></h2>
        <p>Tu dois saisir les informations de cet inventeur et appuyer sur entrer.</p>
    </TypewriterComponent>
    {#if showForm}
        <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
            <Content id="computer" style="opacity: 0; pointer-events: none;">
                <FluidForm style="width: 1px; height: 1px">
                    <TextInput style="background-color: black; color: black" on:focus={displayLabel} aria-label="nom"
                               labelText="Nom" placeholder="Entrer un nom..."
                               required invalid={invalidNom} invalidText="le nom est invalide"
                               autofocus bind:value={nom}/>
                    <TextInput style="background-color: black; color: black" on:focus={displayLabel} aria-label="prenom"
                               labelText="Prénom"
                               placeholder="Entrer un prénom..." required
                               invalid={invalidPrenom} invalidText="le prénom est invalide"
                               bind:value={prenom}/>
                    <TextInput style="background-color: black; color: black" on:focus={displayLabel}
                               aria-label="naissance" labelText="Date de naissance"
                               placeholder="Entrer une date..."
                               required
                               bind:value={naissance} invalid={invalidNaissance}
                               invalidText="La date de naissance n'est pas au format attendu : dd/mm/aaaa"
                    />
                    <TextInput style="background-color: black; color: black" on:focus={displayLabel} aria-label="deces"
                               labelText="Date de décès"
                               placeholder="Entrer une date..."
                               required bind:value={deces}
                               invalid={invalidDeces}
                               invalidText="La date de décès n'est pas au format attendu : dd/mm/aaaa"/>
                </FluidForm>
                <Button kind="secondary" aria-label="soumettre" on:click={() => validateForm()} on:focus={displayLabel}>
                    Soumettre la saisie
                </Button>
            </Content>
            <Tile><span bind:this={formLabel}>nom</span></Tile>
            <img src="{base}/abri/computer/computer.jpg" alt="ordinateur sur lequel se trouve le formulaire"/>
            <Button kind="secondary" on:click={() => open = true}>Indices</Button>
        </div>
    {/if}
</Content>
<script lang="ts">
  import {
    Button,
    Column,
    Content,
    FluidForm,
    Grid,
    ImageLoader, Modal,
    Row,
    Tab,
    TabContent,
    Tabs,
    TextInput,
    Tile
  } from "carbon-components-svelte";
  import Typewriter from 'svelte-typewriter'
  import { goto } from "$app/navigation";
  import Header from "$lib/HeaderComponent.svelte";
  import { base } from '$app/paths';
  import ModalComponent from "$lib/ModalComponent.svelte";
  import TypewriterComponent from "$lib/TypewriterComponent.svelte";

  let open = false;
  let openTransition = true;
  let hideScenario = true;
  let showForm = false;
  let showGoal = true;
  let formLabel: HTMLElement;

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
    console.log(
      nom.trim().toLowerCase(),
      prenom.trim().toLowerCase(),
      naissance.trim().toLowerCase(),
      deces.trim().toLowerCase()
    )
    if (isValid) {
      goto(base + "/abri/medical");
    }
    return isValid;
  }

  const displayLabel = (event: any) => {
    const target = event.target;
    if (formLabel) {
      formLabel.textContent = target.getAttribute("aria-label");
    }
  }
</script>
<style>
    @import url(static/css/app.css);
    @import url(static/css/neon.css);
    @import url(static/css/glitch.css);
</style>

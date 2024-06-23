<HeaderComponent title="Trouble visuelle"/>
<SongComponent src="/ost/trap.mp3" autoplay={true} pause={trapPause} volume={0.2}></SongComponent>
<SongComponent src="/ost/step9.mp3" play={sanctuaryPlay} pause={sanctuaryPause} volume={0.2}></SongComponent>
<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">Surface</h1>
            <h2 class="flux">Le sanctuaire</h2>
        </div>
    </Typewriter>
    <br/>
    <Modal preventCloseOnClickOutside size="lg" passiveModal bind:open={showTransitionModal} modalHeading="" on:open
           on:close={() => {showScenario = false;}}>
        <div style="display: flex; flex-direction: row">
            <Grid>
                <Row>
                    <Column>
                        <div class="glitch">
                            <ImageLoader
                                    src="{base}/surface/laboratory/sanctuary/direction_to_sanctuary.jpg"
                                    alt="Tu te diriges à toute allures dans la dernière aile du bâtiment"
                                    fadeIn={true}/>
                        </div>
                    </Column>
                    <Column><p style="font-size: 1.3rem">La borne électronique émet un bip satisfaisant alors qu'une carte magnétique s'éjecte de
                        son compartiment.</p>
                        <p style="font-size: 1.3rem">Tu la saisis rapidement, mais ton triomphe est de courte durée. Des bruits de pas lourds et
                            pressés se font entendre dans le couloir adjacent, se rapprochant dangereusement. Le cœur
                            battant, tu réalises que les traqueurs ne sont plus très loin.</p>
                        <p style="font-size: 1.3rem">Sans perdre un instant, tu rebrousses chemin, courant silencieusement mais précipitamment
                            vers la dernière aile disponible du refuge.</p>
                    </Column>
                </Row>
            </Grid>
        </div>
    </Modal>
    <Typewriter disabled={showScenario} mode="cascade"
                         on:done={() => setTimeout(() => showContinueButton = true, 2000)}>
        <h2><u><i>Scénario</i></u></h2>
        <p>En entrant dans cette nouvelle aile, l'atmosphère change brusquement. Les murs, autrefois nus et austères,
            sont maintenant parsemés de portraits anciens. </p>
        <p>À gauche, un homme en uniforme de médecin, son regard dur et déterminé, te défie du regard. C'est bien
            Majin
            MOLAH, un célèbre virologue de Mafate. </p>
        <p>À droite, une femme en robe rouge écarlate, ses yeux mélancoliques semblant raconter une histoire de perte et
            de
            désespoir.</p>
        <p>Tu reconnais là ton amie Diva TCHOUNGUI, la plus grande biologiste de Douala. </p>
        <p>L'aile semble interminable, chaque pas t'entraînant plus profondément dans cette galerie de spectres
            silencieux.</p>
        <p>Enfin, au bout du couloir, tu aperçois une porte massive en bois sombre, ornée de ferrures complexes.</p>
        <p>Tu t'approches rapidement, espérant que cette porte mène à un refuge temporaire ou à un autre indice
            crucial.</p>
    </Typewriter>
    {#if showContinueButton}
        <Button kind="secondary" aria-label={"Continuer"}
                style="position: layout; left: 46%; padding-right: 2.5rem; padding-left: 2.5rem;"
                on:click={() => {
            showEnigm = true
            showContinueButton = false
            trapPause = true
            sanctuaryPlay = true
        }}>Continuer
        </Button>
    {/if}
    <Modal preventCloseOnClickOutside size="lg" passiveModal bind:open={showEnigm} modalHeading=""
           on:open
           on:close={() => disableGoal = false}>
        <Grid>
            <Row>
                <Column>
                    <div class="glitch">
                        <ImageLoader
                                src="{base}/surface/laboratory/sanctuary/door.jpg"
                                alt="Porte majestueuse ornée de ferrures complexes" fadeIn={true}/>
                        <span>2</span>
                        <p>Avec la carte magnétique fermement en main, tu insères rapidement celle-ci dans le lecteur
                            adjacent, priant
                            pour que le mécanisme fonctionne.</p>
                        <p>Les traqueurs se rapprochent, leurs pas devenant de plus en plus distincts. La porte s'ouvre lentement avec
                            un grincement, révélant une nouvelle salle dont le contenu reste à découvrir.</p>
                    </div>
                </Column>
                <Column>
                    <span>1</span>
                    <p>Au centre du sanctuaire se trouve un piédestal en verre contenant une mystérieuse orbe jaune,
                        verrouillée par un mécanisme complexe.</p>
                    <ImageLoader
                            src="{base}/surface/laboratory/sanctuary/last_item.jpg"
                            alt="Piedestal contenant l'orbe jaune" fadeIn={true}/>
                </Column>
            </Row>
        </Grid>
    </Modal>
    <br/>
    <Typewriter mode="cascade" disabled={disableGoal} on:done={() => setTimeout(() => showForm = true, 2000)}>
        <h2><u><i>Objectif</i></u></h2>
        <p>En se rapprochant du mécanisme, un petit écran affiche un formulaire de saisie. La résolution de l'écran est
            vraiment basse, par rapport à la taille de l'écran.</p>
        <p>Tu dois soumettre le formulaire le plus vite possible</p>
    </Typewriter>
    {#if showForm}
        <FluidForm style="width: 5000px; height: 5000px">
            <div style="width: 5000px; position: absolute; left: 2500px; top: 3400px; font-size: 300rem">
                <label id="nom">Nom du biologiste</label>
                <input aria-labelledby="nom" required
                       bind:value={nom}>
            </div>
            <div style="width: 100px; position: absolute; left: 5000px; top: 1000px; font-size: 0.3rem">
                <label id="prenom">prénom du biologiste</label>
                <input aria-labelledby="prenom" required
                       bind:value={prenom}>
            </div>
        </FluidForm>
        <Button kind="secondary" on:click={() => validateForm()}>Valider</Button>
        {#if error}
            <span style="color: red; font-weight: bold">{error}</span>
        {/if}
        {#if isWaiting}
            <Loading/>
        {/if}
    {/if}
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
  } from "carbon-components-svelte";
  import Typewriter from 'svelte-typewriter'
  import { goto } from "$app/navigation";
  import HeaderComponent from "$lib/HeaderComponent.svelte";
  import { base } from '$app/paths';
  import SongComponent from "$lib/SongComponent.svelte";

  let showTransitionModal = true;
  let showScenario = true;
  let showEnigm = false;
  let sanctuaryPlay = false;
  let sanctuaryPause = false;
  let isWaiting = false;
  let showContinueButton = false;
  let trapPause = false;
  let showForm = true;
  let disableGoal = true;
  let nom = ""
  let prenom = ""
  let error = ""
  $: invalidMajin = /^Molah$/i.test(nom) && /^Majin/i.test(prenom);
  $: invalidDiva = /^Tchoungui/i.test(nom) && /^Diva/i.test(prenom);

  const validateForm = () => {
    if (invalidDiva
      || invalidMajin) {
      isWaiting = true
      goto(base + "/final");
    } else {
      error = "le nom ou le prénom n'est pas correct. Quel est le biologiste qui fera l'intervention?"
    }
  }

</script>

<style lang="css">
    @import url(static/css/app.css);
    @import url(static/css/neon.css);

    label {
        font-size: 1.3em;
    }
    span {
        border:white 1px solid;
        padding: 0.3em;
    }
</style>

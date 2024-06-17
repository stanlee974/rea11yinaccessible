<Header/>
<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">L'abri</h1>
            <h2 class="flux">Salle medicale</h2>
        </div>
    </Typewriter>
    <br/>
    <Modal size="lg" passiveModal bind:open modalHeading="" on:open
           on:close={() => showScenario = false}>
        <div style="display: flex; flex-direction: row">
            <Grid>
                <Row>
                    <Column>
                        <div class="glitch">
                            <ImageLoader
                                    src="{base}/abri/enter.jpg" alt="Tu rentres dans la salle médicale" fadeIn={true}/>
                        </div>
                    </Column>
                    <Column><p>Après une minutieuse vérification et quelques ajustements, tu appuies sur le bouton
                        "Soumettre".</p>
                        <p> Une lumière verte s'allume au-dessus de la console, confirmant que le formulaire a été
                            correctement rempli.
                        </p>
                        <p>Avec un léger grincement, une porte secondaire s'ouvre sur le côté de la console, révélant un
                            passage étroit. Vous entrez prudemment, l'atmosphère changeant immédiatement. Une odeur de
                            moisi et de terre humide envahit vos narines, et la lumière se fait plus rare. Le passage
                            vous conduit à une nouvelle salle, encore plus lugubre que les précédentes.</p>
                    </Column>
                </Row>
            </Grid>
        </div>
    </Modal>
    <Typewriter disabled={showScenario} mode="cascade" on:done={() => setTimeout(() => showBookAndPills = true, 2000)}>
        <h2><u><i>Scénario</i></u></h2>
        <p>La salle est faiblement éclairée, avec des étagères remplies de vieux livres et documents. Au
            centre, une
            table avec une boîte contenant des pilules de Dysclecsus et une feuille de papier avec un
            texte
            indéchiffrable.</p>
    </Typewriter>
    <Modal size="lg" passiveModal bind:open={showBookAndPills}
           modalHeading="Livre indéchiffrable et table contenant les pillules"
           on:open
           on:close={() => showNotice = false}>
        <ImageLoader
                src="{base}/abri/medical/pills.jpg" alt="table contenant une boîte avec des pillules" fadeIn={true}/>
        <ImageLoader
                src="{base}/abri/medical/book.jpg" alt="vieux livre indéchiffrable" fadeIn={true}/>
    </Modal>
    <br/>
    <Typewriter disabled={showNotice} mode="cascade" on:done={() => setTimeout(() => showManEating = true, 2000)}>
        <p>Une note griffonnée sur le bord de la table disant : « Pour voir les mots tels qu'ils sont, prenez une pilule
            et laissez votre esprit s'adapter.»</p>
        <p>Un manuel de médecine ouvert sur une page décrivant le médicament Dysclecsus, expliquant qu'il induit
            temporairement une forme de dyslexie réversible, permettant de lire des textes cachés.</p>
    </Typewriter>
    <Modal size="lg" passiveModal bind:open={showManEating} modalHeading="tu avales une pillule" on:open
           on:close={() => showGoal = false}>
        <ImageLoader
                src="{base}/abri/medical/man_eating.jpg" alt="Tu avales une pillule" fadeIn={true}/>
    </Modal>
    <br/>
    <Typewriter mode="cascade" disabled={showGoal} on:done={() => showForm = true}>
        <p>Tu avales la pilule et attends quelques instants. Après la prise, tu ressens une légère altération de ta
            perception, et le texte sur la feuille commence à s'organiser de manière compréhensible.</p>
        <h2><u><i>Objectif</i></u></h2>
        <p>Un dispositif électronique à côté de la porte de sortie nécessite l'entrée d'un mot de passe révélé par le
            texte</p>
    </Typewriter>
    {#if showForm}
        <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
            <Content>
                <p>{hint}</p>
            </Content>
            <FluidForm>
                <TextInput aria-label="password"
                               labelText="Password" placeholder="Entrer le password"
                               required invalid={invalidResult} invalidText="le password est erroné"
                               autofocus bind:value={result}/>
            </FluidForm>
            <Button kind="secondary" on:click={() => validateForm()}>Valider</Button>
        </div>
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
    Modal,
    Row,
    TextInput,
  } from "carbon-components-svelte";
  import Typewriter from 'svelte-typewriter'
  import dyslexia from "dyslexia";
  import { goto } from "$app/navigation";
  import Header from "$lib/HeaderComponent.svelte";
  import { base } from '$app/paths';

  let open = true;
  let showScenario = true;
  let showBookAndPills = false;
  let showNotice = true;
  let showManEating = false;
  let showForm = false;
  let showGoal = true;
  let result = ""

  let hint = "Dans un monde où les mots dansent et se transforment, la dyslexie transforme la lecture en une aventure constante. Les lettres se mêlent et se confondent, offrant une perspective unique et souvent méconnue sur la réalité écrite. Tu trouveras le mot de passe à la douzième position de ce texte. Attention, il faut remplacer la lettre d par la lettre b."

  $: invalidResult = !/^byslexie$/i.test(result);

  const dyslexifyContent = () => {
    hint = dyslexia(hint)
  }

  setInterval(dyslexifyContent, 500)
  const validateForm = (): void => {
    if ("byslexie" === result.trim().toLowerCase()) {
      goto(base + "/abri/searchcenter");
    }
  }

</script>

<style lang="css">
    @import url(static/css/app.css);
    @import url(static/css/neon.css);
    @import url(static/css/glitch.css);
</style>

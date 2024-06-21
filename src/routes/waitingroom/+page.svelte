<Header title="Ouverture"/>
<SongComponent src="/ost/opening.mp3" autoplay={true} pause={openingPause}></SongComponent>
<Content id="glitch-body" style="height: 90vh">
    <div id="glitch" class="glitch" style:width="100%" style:margin-top="12rem" style:margin-bottom="10rem"
         style:padding-top="3px">
        <ImageLoader
                src="{base}/logo_alt.png" alt="logo of really inaccessible" fadeIn={true}
        />
    </div>
</Content>
<Button kind="secondary" aria-label={"Commencer"}
        style="position: layout; left: 46%; padding-right: 2.5rem; padding-left: 2.5rem;"
        on:click={() => {
            disableWriter = false
            clickSound.play()
        }}><img src="{base}/arrow-down.svg" aria-hidden="true"/></Button>
<Content id="scenario" style="background-color: #161616; margin-top: 0">
    <Grid>
        <Row>
            <Column>
                <TypewriterComponent mode="scramble" disabled={disableWriter}>
                    <h1>Bienvenu(e) à toi !</h1>
                </TypewriterComponent>
                <TypewriterComponent disabled={disableWriter} delay={3000} parentDoneAction={() => showButton = true}>
                    <h2><u><i>Scénario</i></u></h2>
                    <p>Le monde tel que nous le connaissions a disparu. Une pandémie inconnue a balayé la planète,
                        laissant 99,99% de la population avec des handicaps divers tels que la perte de la vue, de
                        l'ouïe, des tremblements des mains, du daltonisme, etc. Dans cette nouvelle société, ces
                        handicaps sont considérés comme normaux, et ceux qui sont exempts de tout handicap sont vus
                        comme des hérétiques. Ils sont traqués et éliminés sans pitié par les autorités.</p>
                    <p>Vous incarnez donc un survivant « hérétique » qui a découvert l'existence d'une
                        injection nommée CaM-RuN-a11Y. Cette injection permet de développer un handicap aléatoire,
                        ce
                        qui vous permettra de vous fondre dans la population et d'échapper à la traque.
                    </p>
                    <h2><u><i>Objectif</i></u></h2>
                    <p>Trouver et administrer l'injection CaM-RuN-a11Y avant que les traqueurs ne vous trouvent.
                        Vous
                        disposez de 60 minutes pour vous l'injecter.</p>
                    <p>Click <a style:text-decoration="none" style:color="#F4F4F4" href="/abri/entrance" on:click={() => {
                        loading();
                        openingPause = true
                    }}>ici</a>
                        pour
                        entrer dans l'abri.
                    </p>
                </TypewriterComponent>
                <br/>
                <ButtonComponent onclick={() => {errorSound.play()}} enabled={showButton}>
                    <div slot="message" style="position: absolute; left: 53%; padding-right: 2rem; padding-left: 2rem;">
                        <img src="{base}/troll.gif" aria-hidden="true"/>
                        <ToastNotification
                                lowContrast
                                fullWidth
                                kind="error"
                                title="Erreur"
                                subtitle="Ce n'est pas ici"
                        />
                    </div>
                    <span slot="content">Continuer</span>
                </ButtonComponent>
            </Column>
        </Row>
    </Grid>
    {#if isWaiting}
        <LoadingComponent/>
    {/if}
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button, Column, Content, Grid, ImageLoader, Row, ToastNotification } from "carbon-components-svelte";
  import Header from "$lib/HeaderComponent.svelte";
  import TypewriterComponent from "$lib/TypewriterComponent.svelte";
  import { base } from "$app/paths";
  import ButtonComponent from "$lib/ButtonComponent.svelte";
  import { onMount } from "svelte";
  import SongComponent from "$lib/SongComponent.svelte";
  import LoadingComponent from "$lib/LoadingComponent.svelte";

  let disableWriter = true
  let isWaiting = false
  let showButton = false
  let openingPause: boolean = false;
  let clickSound: HTMLAudioElement;
  let errorSound: HTMLAudioElement;
  const loading = () => {
    isWaiting = true
  }
  onMount(() => {
    clickSound = new Audio(base + "/sound/click.mp3")
    clickSound.volume = 0.2
    errorSound = new Audio(base + "/sound/error.mp3")
    errorSound.volume = 0.5
  })

</script>
<style lang="css">
    @import url(static/css/app.css);
    @import url(static/css/neon.css);
</style>

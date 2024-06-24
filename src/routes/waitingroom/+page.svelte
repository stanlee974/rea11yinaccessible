<HeaderComponent title={Step.WAITING_ROOM}/>
<SongComponent src="/ost/opening.mp3" autoplay={true} pause={openingPause}></SongComponent>
<div id="glitch-body">
    <div id="glitch" class="glitch" style="margin: 5rem 3rem 5rem;">
        <ImageLoader
                src="{base}/logo_alt.png" alt="logo of really inaccessible" fadeIn={true}
        />
    </div>
</div>
<ButtonComponent onclick={() => {disableWriter = false}} enabled={startButton}><img slot="content"
                                                                                    src="{base}/arrow-down.svg"
                                                                                    aria-label="Commencer"/>
</ButtonComponent>
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
                        l'ouïe, des tremblements des mains, du daltonisme, etc. Dans ce monde
                        futuriste, les handicaps visuels, moteurs et auditifs sont la norme. Ceux qui sont exempts de
                        toute limitation sont considérés comme des hérétiques et traités avec suspicion. Ils sont
                        traqués et éliminés sans pitié par les autorités.</p>
                    <p>Tu incarnes donc un survivant « hérétique » qui a découvert l'existence d'une
                        injection nommée CaM-RuN-a11Y. Cette injection permet de développer un handicap aléatoire,
                        ce
                        qui te permettra de te fondre dans la population et d'échapper à la traque.
                    </p>
                    <h2><u><i>Objectif</i></u></h2>
                    <p>Ton objectif est de te fondre dans la population, résoudre les énigmes et
                        surmonter les obstacles qui se dressent sur ta route. Chaque défi te rapprochera de ta survie,
                        mais nécessitera une adaptation rapide et une ingéniosité sans faille.
                        La traque est lancée, et chaque instant compte. Utilise tes nouvelles capacités pour tromper les
                        autorités, découvre les secrets de cette société étrange, et trouve un moyen de survivre dans ce
                        monde où la norme est inversée.</p>
                    <p> Bonne chance, survivant. Que l'injection CaM-RuN-a11Y te guide vers la liberté</p>
                    <p>Click <a style:text-decoration="none" style:color="#F4F4F4" href="/abri/entrance" on:click={() => {
                        loading();
                        openingPause = true
                    }}>ici</a>
                        pour
                        entrer dans l'abri.
                    </p>
                </TypewriterComponent>
                <br/>
                {#if showButton}
                    <Button kind="secondary"
                            style="
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            cursor: pointer;
            "
                            on:click={() => {errorSound.play(); showError = true}}
                            autofocus>
                        Continuer
                    </Button>
                {/if}
                {#if showError}
                    <div
                            style="position: absolute; left: 53%; padding-right: 2rem; padding-left: 2rem;">
                        <img src="{base}/troll.gif" aria-hidden="true"/>
                        <ToastNotification
                                lowContrast
                                fullWidth
                                kind="error"
                                title="Erreur"
                                subtitle="Ce n'est pas ici"
                        />
                    </div>
                {/if}
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
  import HeaderComponent from "$lib/HeaderComponent.svelte";
  import TypewriterComponent from "$lib/TypewriterComponent.svelte";
  import { base } from "$app/paths";
  import ButtonComponent from "$lib/ButtonComponent.svelte";
  import { onMount } from "svelte";
  import SongComponent from "$lib/SongComponent.svelte";
  import LoadingComponent from "$lib/LoadingComponent.svelte";
  import { Step } from "$lib";

  let disableWriter = true
  let isWaiting = false
  let showButton = false
  let showError = false
  let startButton = true
  let openingPause: boolean = false;
  let errorSound: HTMLAudioElement;
  const loading = () => {
    isWaiting = true
  }
  onMount(() => {
    errorSound = new Audio(base + "/sound/error.mp3")
    errorSound.volume = 0.5
  })

</script>
<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);
    @import url(/css/glitch.css);
</style>

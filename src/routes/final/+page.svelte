<Header title="Epilogue"/>
<SongComponent src="/ost/stress.mp3" autoplay={true} pause={pauseStressSong} volume={0.2}></SongComponent>
<SongComponent src="/ost/step10.mp3" play={playEpilogueSong} pause={pauseEpilogueSong} volume={0.2}></SongComponent>
<Content>
    <Typewriter mode="scramble">
        <div class="container">
            <h1 class="neon">La verite</h1>
            <h2 class="flux">revelee</h2>
        </div>
    </Typewriter>
    <br/>
    <Modal size="lg" preventCloseOnClickOutside passiveModal bind:open={showTransitionModal} modalHeading="" on:open
           on:close={() => {
               pauseStressSong = true
               playEpilogueSong = true
               showTrapModal = true
           }}>
        <div style="display: flex; flex-direction: row">
            <Grid>
                <Row>
                    <Column>
                        <div class="glitch">
                            <ImageLoader
                                    src="{base}/final/orbe.jpg"
                                    alt="Tu regardes l'orbe"
                                    fadeIn={true}/>
                            <span>2</span>
                            <p style:font-size="1.3rem">Tu la secoues et te rends compte qu'il n'est pas
                                vide. Tu utilises un pic métallique au pied du piédestal qui semble prévu à cet effet.
                                Lorsqu'elle se brise, une
                                lumière intense emplit la pièce avant de s'éteindre, laissant apparaître une seringue
                                métallique finement ornée, remplie d'un liquide argenté.</p>
                            <ImageLoader
                                    src="{base}/final/man_with_syringe.jpg"
                                    alt="Tu t'injectes la substance"
                                    fadeIn={true}/>
                            <span>4</span>
                            <p style:font-size="1.3rem">Après l'injection, tu attends anxieusement que les effets se
                                manifestent. Cependant, au lieu de ressentir des changements physiques, tu commences à
                                te sentir étrangement normal.</p>
                            <p style:font-size="1.3rem">Un frisson de panique te parcours. Tu fouilles désespérément les
                                manuscrits anciens qui se trouvent dans le sanctuaire pour comprendre ce qui ne va pas.
                                Une des notes cachées dans un coin ombragé du sanctuaire révèle enfin la vérité : la
                                seringue contenait un placebo.</p>
                        </div>
                    </Column>
                    <Column>
                        <span>1</span>
                        <p style:font-size="1.3rem">Au centre du sanctuaire, l'orbe scintille, illuminée par les
                            cristaux luminescents. Elle repose sur un piédestal doré, entourée de gravures anciennes et
                            d'inscriptions mystiques. Tu t'approches avec un mélange d'excitation et de crainte.
                        Le mécanisme s'ouvre lentement et tu t'empares de l'orbe.</p>
                        <ImageLoader
                                src="{base}/final/broken_orb.jpg"
                                alt="L'orbe brisée contient l'injection"
                                fadeIn={true}/>
                        <span>3</span>
                        <p style:font-size="1.3rem">Tu te prépares à t'injecter le contenu de la seringue. Tu prends une
                            profonde inspiration, espérant que cette injection t'accorderas le handicap nécessaire pour
                            échapper aux traqueurs.
                            Tu tiens la seringue avec une main tremblante, ressentant le poids de l'instant. Tu vides la
                            dose dans ta veine encore chaude.</p>
                        <ImageLoader
                                src="{base}/final/man_reading_letter.jpg"
                                alt="Tu lis la lettre révélant la vérité"
                                fadeIn={true}/>
                    </Column>
                </Row>
            </Grid>
        </div>
    </Modal>
    <Modal preventCloseOnClickOutside size="lg" passiveModal bind:open={showTrapModal} modalHeading="" on:open
           on:close={() => {
               showScenario = false;
           }}>
        <div style="display: flex; flex-direction: row">
            <Grid>
                <Row>
                    <Column>
                        <div class="glitch">
                            <ImageLoader
                                    src="{base}/final/guard.jpg"
                                    alt="Garde regardant avec un air dédaigneux"
                                    fadeIn={true}/>
                        </div>
                    </Column>
                    <Column>
                        <p style:font-size="1.3rem">Des bruits de pas lourds et des voix en colère retentissent dans le
                            couloir, se rapprochant rapidement. Les traqueurs, alertés par la lumière intense émise par
                            la rupture de l'orbe, ont trouvé leur chemin jusqu'au sanctuaire</p>
                        <p style:font-size="1.3rem">Tu cherches frénétiquement une issue de secours, mais il est trop
                            tard. La porte du sanctuaire s'ouvre brutalement, laissant entrer les traqueurs lourdement
                            armés.</p>
                        <p style:font-size="1.3rem">Les traqueurs, impitoyables et déterminés, t'entourent. L'un d'eux
                            s'avance et observe la seringue vide avec un sourire sinistre. "Tu pensais vraiment pouvoir
                            échapper à ton sort?" dit-il d'une voix glaciale.</p>
                    </Column>
                </Row>
            </Grid>
        </div>
    </Modal>
    <TypewriterComponent disabled={showScenario} parentDoneAction={() => disabledFin = false}>
        <h2><u><i>Epilogue</i></u></h2>
        <p>Les traqueurs te mènent hors du sanctuaire, à travers les
            couloirs sombres et froids du laboratoire secondaire. Tes espoirs de survie et de
            guérison se dissipent, remplacés par une sombre résignation.</p>
        <p>En sortant du laboratoire, tu jettes un dernier regard vers le
            ciel, sachant que ta quête pour l'injection CaM-RuN-a11Y était vaine.</p>
        <p>Dans la froide lumière du jour, tu es conduit vers une destination inconnue, ton sort scellé par les
            traqueurs. Ton aventure se termine sur une note tragique, marquée par la révélation que ton ultime espoir
            était une illusion.
        </p>
        <p> Cependant, cette fin amère laisse place à une réflexion profonde. ta détermination, ta perspicacité et ta
            capacité à surmonter des défis inimaginables ne sont pas effacés. Tu as découvert la
            force de ton humanité dans un monde brisé, et cette force continuera de briller, même dans l'adversité.</p>
        <p>Alors que les portes du laboratoire se referment derrière toi, tu sais que, malgré tout, tu as combattu
            jusqu'au bout. Ton histoire, bien que tragique, est un testament de courage et de résilience dans un monde
            post-apocalyptique impitoyable, dans lequel, la différence est encore une hérésie.</p>
    </TypewriterComponent>
    <TypewriterComponent disabled={disabledFin}>
        <p>Fin</p>
    </TypewriterComponent>
</Content>
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Column, Content, Grid, ImageLoader, Modal, Row, } from "carbon-components-svelte";
  import Typewriter from 'svelte-typewriter'
  import Header from "$lib/HeaderComponent.svelte";
  import { base } from "$app/paths";
  import TypewriterComponent from "$lib/TypewriterComponent.svelte";
  import { onMount } from "svelte";
  import SongComponent from "$lib/SongComponent.svelte";

  let showTransitionModal = true;
  let showTrapModal = false;
  let showScenario = true;
  let disabledFin = true;
  let playEpilogueSong = false;
  let pauseStressSong = false;
  let pauseEpilogueSong = false;
</script>

<style lang="css">
    @import url(static/css/app.css);
    @import url(static/css/neon.css);

    span {
        border:white 1px solid;
        padding: 0.3em;
    }
</style>

    <ModalComponent opened={showTransitionModal}
           parentDoneAction={() => {showScenario = false}}>
        <div style="display: flex; flex-direction: row">
            <Grid>
                <Row>
                    <Column>
                            <ImageLoader
                                    src="{base}/surface/entrance/man_stair.jpg"
                                    alt="Tu montes les escaliers et te rends à la surface" fadeIn={true}/>
                    </Column>
                    <Column><p style="font-size: 1.3rem">En réussissant à résoudre les énigmes malgré les hallucinations
                        perturbantes, tu as su montrer ta capacité à rester concentré et déterminé.</p>
                        <p style="font-size: 1.3rem">Une dernière hallucination te montre un journal mentionnant un
                            laboratoire secondaire situé à la surface, dans une ancienne zone industrielle.</p>
                        <p style="font-size: 1.3rem">Tu empruntes un dernier escalier et te voilà bientôt à la
                            surface.</p>
                    </Column>
                </Row>
            </Grid>
        </div>
    </ModalComponent>
    <TypewriterComponent disabled={showScenario} waitReading continueButtonAction={() => showEntrance = true}>
        <h2><u><i>Scénario</i></u></h2>
        <p>Près de la sortie, une note indiquant que ce laboratoire secondaire est également un refuge sûr, équipé de
            ressources et de technologies nécessaires pour échapper aux traqueurs.</p>
        <p>Cet extrait de journal de bord explique que le complexe souterrain est devenu de plus en plus instable en
            raison des dégradations structurelles.</p>
    </TypewriterComponent>
    <ModalComponent opened={showEntrance}
           parentDoneAction={() => disableGoal = false}>
        <Grid>
            <Row>
                <Column>
                        <ImageLoader
                                src="{base}/surface/entrance/man_laboratory.jpg"
                                alt="Tu te retrouves devant la porte du laboratoire" fadeIn={true}/>
                </Column>
                <Column><p>L'entrée du laboratoire secondaire est un grand bâtiment industriel
                    délabré, partiellement envahi par la végétation.</p>
                    <p>Devant l'entrée principale, il y a une porte métallique épaisse avec un
                        panneau de commande électronique ancien à côté.</p>
                    <p>Autour de la porte, des graffitis et des marques indiquent que d'autres
                        ont tenté d'entrer mais ont échoué.</p>
                </Column>
            </Row>
        </Grid>
    </ModalComponent>
    <br aria-hidden="true"/>
    <TypewriterComponent disabled={disableGoal} waitReading continueButtonAction={() => showTrialModal = true}>
        <p>Une plaque gravée à côté de la porte mentionne que la porte s'ouvre en cliquant sur la croix depuis
            l'interface de commande.</p>
        <p>Le signal est très faible et la communication entre la souris et terminal est défectueux.</p>
        <h2><u><i>Objectif</i></u></h2>
        <p>Cliquer sur la croix permettant d'ouvrir la porte</p>
    </TypewriterComponent>
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <ModalComponent opened={showTrialModal} modalHeading="Tableau de contrôle"
                        hasPrimaryButton="{false}"
                        parentDoneAction={() => {reopenTrialModal = true; showTrialModal = false}}>
            <div bind:this={xElement} style="position: relative;cursor: none;"
                 on:mousemove={movingMouseTremors}>
                <ImageLoader
                        src="{base}/surface/entrance/open_door.jpg"
                        alt="Tu dois cliquer sur la croix pour ouvrir la porte" fadeIn={true}/>
                <div tabindex="0"
                     style="position: absolute; top: 78.8%; left: 23.7%; color:#7F0000; font-size: 1.3rem; font-weight: bold"
                     on:click={() => validateClick()}
                     on:keydown={(event) => {if (event.key === "Enter") {validateClick()}}}>X
                </div>
                <div style="position: absolute; top: 79.8%; left: 27.7%; color:#7F0000; font-size: 1; font-weight: bold;">
                    Click to open the door
                </div>
                <div style="position: absolute; top:0; width: 15px">
                    <ImageLoader
                            src="http://telcontar.net/Misc/screeniecursors/Cursor%20arrow%20white.png"
                            alt="mouse" style="position: absolute; left:{mouseX}px; top:{mouseY}px; z-index: 15000"/>
                </div>
            </div>
        </ModalComponent>
        {#if reopenTrialModal}
            <Button kind="secondary" on:click={() => {showTrialModal = true; reopenTrialModal= true}}>Ouvrir le
                terminal
            </Button>
        {/if}
    </div>
    {#if isWaiting}
        <LoadingComponent/>
    {/if}
<script lang="ts">
  import "carbon-components-svelte/css/g90.css";
  import { Button, Column, Grid, ImageLoader, Row, } from "carbon-components-svelte";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { base } from '$app/paths';
  import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
  import LoadingComponent from "$lib/technicalComponent/LoadingComponent.svelte";
  import { Step } from "$lib";
  import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
  import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
  import { changeSource } from "$lib/store/inMemoryStore/AudioStore";

  onMount(() => {
    changeSource("/ost/step6.mp3")
    renderStore.set(new RenderData(Step.SURFACE_ENTRANCE, "La surface", "Entree du labo"));
  })

  let showTransitionModal = true;
  let showScenario = true;
  let showEntrance = false;
  let isWaiting = false;
  let showTrialModal = false;
  let reopenTrialModal = false;
  let disableGoal = true;
  let xElement: HTMLElement;

  let normal = [-0.954486511205664, -0.390343505844172, 0.954967163741049, -0.741969088844115, 0.415498313809018, 1.11448864081483, 0.76051606293719, 0.737922868989143, -0.538210735151749, 2.95321369930028, 1.29722248593233, 0.879352418857219, -0.431491137709812, 0.907957414011492, 1.32937856972126, -2.06193940045371, 0.853924002501051, 0.644568387942851, 0.29585966062521, 0.029283909642257, -0.116309884538336, -0.21247946969567, 0.520679721081564, 1.40888714495192, -0.872289147256009, -0.895142161740987, -0.210110524304462, -1.09347050985988, -1.24695998274644, 0.108705615063444, -0.0299178988550738, 1.47641798733614, 0.489325530238317, -1.25614368071793, -0.265909415432471, 0.526102923817908, -0.10480962312103, -1.07215275189888, -0.383193549659934, 0.51002010941531, 0.944163306601511, -0.0321767673468271, -1.35144964116703, 0.263596823001421, 0.540427623567371, -1.04241902308392, -0.670516393824332, 0.158485972372211, 0.164154884035072, -1.93009734490646, 0.852783520922024, -1.34765702216979, -0.531800074686698, 0.280961008814437, 0.630531054720149, 0.343363294659579, -1.2170531471355, 1.58324901607691, -0.539584265875985, 0.311161618787563, -0.317124254762646, -0.260151494067805, -0.673509625719232, 0.136403271282643, 1.01258180403649, 0.575317947712617, 1.14868551793635, 0.327870722017452, 0.94293964636229, -1.22571566590562, 1.37854270548666, -0.0948946472840643, 0.966120915277423, -0.298859582000788, 1.67278530569779, -1.28203090996874, 0.296928115774355, -1.09044170966977, 1.46093203424296, -0.239098151446543, -1.51561000187031, -0.154811273589294, 0.0319192709941601, -0.527036227344993, -0.513927560425381, 0.579844345200166, -0.0747662994634585, 0.64628638844104, -0.321894061028443, -0.798643441029118, -2.02075744646756, -0.319258166115966, 0.0963191114713903, -0.794920474769472, 0.0610320023340435, 0.345931510365856, -1.31282275014755, -0.0968080218000676, 0.37646603364382, 1.82218271404721]
  let tremorBasePx = 17;

  let mouseX: number = 0;
  let mouseY: number = 0;
  const sampleInt = (magnitude: number) => {
    return normal[Math.round(Math.random() * normal.length)] * magnitude;
  }


  const movingMouseTremors = (event: any) => {
    const x = sampleInt(tremorBasePx);
    const y = sampleInt(tremorBasePx);
    if (xElement) {
      mouseX = event.clientX - xElement.getBoundingClientRect().x + x
      mouseY = event.clientY - xElement.getBoundingClientRect().y + y
    }
  }

  const holdingMouseTremors = () => {
    setTimeout(() => {
      mouseX = mouseX + sampleInt(30)
      mouseY = mouseY + sampleInt(30)
      holdingMouseTremors();
    }, 20)
  }

  const validateClick = () => {
    isWaiting = true
    goto(base + "/surface/laboratory");
  }

  onMount(() => {
      addEventListener("mousemove", movingMouseTremors);
      setTimeout(() => holdingMouseTremors(), 500);
    }
  )
</script>

<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);
</style>

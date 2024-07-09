<ModalComponent opened={showTransitionModal}
                parentDoneAction={() => {showScenario = false}}>
    <div style="display: flex; flex-direction: row">
        <Grid>
            <Row>
                <Column>
                    <ImageLoader
                            src="{base}/surface/laboratory/man_walking.jpg"
                            alt="Tu marches dans le corridor du laboratoire" fadeIn={true}/>
                </Column>
                <Column><p style="font-size: 1.3rem">Tu arrives correctement à activer le bouton et un mécanisme
                    interne se met en marche.
                    La porte métallique s'ouvre lentement avec un grincement, révélant un couloir menant à
                    l'intérieur du laboratoire secondaire.</p>
                    <p style="font-size: 1.3rem">Tu avances prudemment et ressent immédiatement un froid glacial
                        émanant de l'intérieur.</p>
                </Column>
            </Row>
        </Grid>
    </div>
</ModalComponent>
<TypewriterComponent disabled={showScenario} parentDoneAction={() => {setTimeout(() => showEnigm = true, 2000)}}>
    <h2><u><i>Scénario</i></u></h2>
    <p>Cet air glacé émane d'une grande chambre frigorifique abandonnée autrefois utilisée pour stocker des
        substances sensibles.</p>
    <p>Le froid est intense, et des cristaux de glace couvrent les murs et le sol. Derrière une armoire, il y a un
        grand terminal avec un clavier encastré et un écran légèrement fissuré.</p>
</TypewriterComponent>
<ModalComponent opened={showEnigm}
                parentDoneAction={() => disableGoal = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/surface/laboratory/frozen_room.jpg"
                        alt="Chambre frigorifiée contenant le terminal" fadeIn={true}/>
            </Column>
            <Column><p>Une note manuscrite dans un coin de la salle mentionne les effets du
                froid intense sur le corps humain.</p>
                <p>A l'arrière de cette note se trouve des inscriptions codés.</p>
                <ImageLoader
                        src="{base}/surface/laboratory/password.png"
                        alt="inscriptions codées" fadeIn={true}/>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<br/>
<TypewriterComponent disabled={disableGoal}
                     parentDoneAction={() => {setTimeout(() => {showForm = true; activateZoom()}, 2000)}}>
    <h2><u><i>Objectif</i></u></h2>
    <p>Tu dois déchiffrer et taper le code résolu sur le clavier du terminal, malgré le froid intense.
        Si tes mains tremblent trop, tu risques d'entrer le mauvais code, ce qui pourrait déclencher une alarme ou
        un
        verrouillage temporaire.</p>
</TypewriterComponent>
{#if showForm}
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <span style="font-size: 1.3em; margin-bottom: 1rem;">Si tu positionnes le curseur dans la zone de la carte, tu pourras zoomer avec la molette de la souris ou avec 2 doigts sur un trackpad</span>
        <div style="width:600px; cursor:crosshair; border: white 0.2em solid;">
            <div bind:this={container} class="imageContainer">
                <img
                        class="image"
                        src="{base}/surface/laboratory/password.png"
                        alt="inscriptions codées"/>
            </div>
        </div>
        <FluidForm>
            <TextInput aria-label="password"
                       labelText="Password" placeholder="Entrer le password"
                       required invalid={invalidResult} invalidText="le password est erroné"
                       autofocus bind:value={result} on:keydown={(event) => {adaptPressedKey(event)}}/>
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
  import { useZoomImageWheel } from "@zoom-image/svelte";
  import { base } from '$app/paths';
  import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
  import { Step } from "$lib";
  import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
  import { onMount } from "svelte";
  import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
  import { audioStore, makePause } from "$lib/store/inMemoryStore/AudioStore";

  onMount(() => {
    let audio = new Audio(base + "/ost/step7.mp3");
    audio.loop = true
    audioStore.set(audio)
    renderStore.set(new RenderData(Step.SURFACE_LABORATORY, "La surface", "Le laboratoire"));
  })

  let showTransitionModal = true;
  let showScenario = true;
  let showEnigm = false;
  let isWaiting = false;
  let showForm = false;
  let disableGoal = true;
  let result = ""
  let container: HTMLDivElement
  let lastPressedKey = ""
  const {createZoomImage} = useZoomImageWheel()

  $: invalidResult = !/tremors$/i.test(result);
  const validateForm = () => {
    if (/tremors$/i.test(result)) {
      isWaiting = true
      makePause()
      goto(base + "/surface/laboratory/audiovisualroom");
    }
  }

  const adaptPressedKey = (event: any) => {
    const originalKey = event.key;
    if (!lastPressedKey) {
      lastPressedKey = originalKey;
    }
    const frenchKeyboardNeighbors: { [key: string]: string[] } = {
      a: ['a', 'z', 'q', 's'],
      z: ['z', 'a', 'e', 's'],
      e: ['e', 'z', 'r', 'd', 's'],
      r: ['r', 'e', 't', 'f', 'd'],
      t: ['t', 'r', 'y', 'g', 'f'],
      y: ['y', 't', 'u', 'h', 'g'],
      u: ['u', 'y', 'i', 'j', 'h'],
      i: ['i', 'u', 'o', 'k', 'j'],
      o: ['o', 'i', 'p', 'l', 'k'],
      p: ['p', 'o', 'm', 'l'],
      q: ['q', 'a', 's', 'w'],
      s: ['s', 'q', 'a', 'z', 'd'],
      d: ['d', 's', 'e', 'f', 'x'],
      f: ['f', 'd', 'r', 'g', 'c'],
      g: ['g', 'f', 't', 'h', 'v'],
      h: ['h', 'g', 'y', 'j', 'b'],
      j: ['j', 'h', 'u', 'k', 'n'],
      k: ['k', 'j', 'i', 'l', 'n'],
      l: ['l', 'k', 'o', 'm'],
      m: ['m', 'l', 'p', 'k'],
      w: ['w', 'q', 's', 'x'],
      x: ['x', 'w', 's', 'd', 'c'],
      c: ['c', 'x', 'd', 'f', 'v'],
      v: ['v', 'c', 'f', 'g', 'b'],
      b: ['b', 'v', 'g', 'h', 'n'],
      n: ['n', 'b', 'h', 'j', 'm']
    };

    if (originalKey in frenchKeyboardNeighbors) {
      const neighbors = frenchKeyboardNeighbors[originalKey];
      if (lastPressedKey === originalKey) {
        result = result.slice(0, -1);
      } else {
        lastPressedKey = originalKey;
      }
      if (neighbors) {
        const randomIndex = Math.floor(Math.random() * neighbors.length);
        let neighbor = neighbors[randomIndex];
        result += neighbor;
        event.preventDefault();
      } else {
        result += originalKey
        event.preventDefault();
      }
    }
  }
  const activateZoom = () => {
    setTimeout(() => {
      if (container) {
        createZoomImage(container)
      } else {
        activateZoom()
      }
    }, 500)
  };
</script>

<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);

    .imageContainer {
        width: var(--imageContainerWidth);
        height: var(--imageContainerHeight);
    }

    .image {
        max-width: 100%;
        max-height: 100%;
    }
</style>

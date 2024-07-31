<ModalComponent
        parentDoneAction={() => hideScenario = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/abri/entrance/enter.jpg" alt="Tu rentres dans l'abri" fadeIn={true}/>
            </Column>
            <Column>
                <p autofocus>
                    L'entrée de l'abri est une porte massive en acier, rouillée par les années et recouverte de
                    lierre et de mousse. </p>
                <p>Un vieux panneau, à moitié effacé par le temps, porte l'inscription : "Refuge Alpha - Accès
                    Réservé au Personnel Autorisé". Tu t'approches de l'entrée avec un mélange de curiosité et
                    d'appréhension.
                </p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<br aria-hidden="true"/>
<TypewriterComponent disabled={hideScenario} delay={3000} parentDoneAction={() => {hideGoal = false}}>
    <h2><u><i>Scénario</i></u></h2>
    <p>Tu te trouves dans une salle obscure avec des équipements médicaux abandonnés et des armoires de
        rangement.</p>
    <p>Une note sur la table contient le message suivant : </p>
    <p style="font-style: italic;">"Blanc pur sur blanc pur, rien ne semble changer,
        Mais ajoute une ombre, et les couleurs se mettent à danser.
        Quand la lumière se fait douce ou se fait forte,
        Les nuances cachées frappent à notre porte."</p>
    <p>Dans un coin de la salle, il y a un panneau de contrôle avec quatre boutons et un document déchiré indiquant
        que la séquence correcte est Jaune, Rose, Vert et Orange. Malheureusement, les boutons n'ont pas
        d'étiquettes et les perceptions des couleurs peuvent être altérées par le daltonisme.
    </p>
</TypewriterComponent>
<br aria-hidden="true"/>
<TypewriterComponent disabled={hideGoal} parentDoneAction={() => showButtons = true}>
    <h2><u><i>Objectif</i></u></h2>
    <p>Tu dois trouver la bonne combinaison de 4 éléments sans attendre. Il n'y a pas 2 fois la même couleur dans la
        combinaison.</p>
</TypewriterComponent>
{#if showButtons}
    <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: space-between;">
        <Slider
                labelText="Contraste"
                min={0}
                max={100}
                maxLabel="100"
                value={contrast}
                step={1}
                style="align-items: normal; margin-right: 2em"
                aria-hidden={accessibilityMode}
                disabled={accessibilityMode}
                on:input={(value) => {{contrast = value.detail}}}
        />
        <Column sm style="display: flex; flex-direction: column; text-align: center;">
            <span>{firstButtonLabel}</span>
            <Button
                    style="background-color:#0E160F; filter: contrast({contrast}%) brightness({brightness}%);"
                    class="coloredButton"
                    aria-label="Ce bouton Vert n'est pas le second"
                    on:click={() => validOrder(0)} aria-pressed={isButtonPressed(firstButtonLabel)}></Button>
        </Column>
        <Column sm style="display: flex; flex-direction: column; text-align: center;">
            <span>{secondButtonLabel}</span>
            <Button
                    style="background-color:#16110E; filter: contrast({contrast}%) brightness({brightness}%);"
                    class="coloredButton"
                    aria-label="Ce bouton Orange vient après le bouton Vert"
                    on:click={() => validOrder(1)} aria-pressed={isButtonPressed(secondButtonLabel)}>
            </Button>
        </Column>
        <Column sm style="display: flex; flex-direction: column; text-align: center;">
            <span>{thirdButtonLabel}</span>
            <Button
                    style="background-color:#161113; filter: contrast({contrast}%) brightness({brightness}%);"
                    class="coloredButton"
                    aria-label="Ce bouton Rose n'est jamais le premier ni le dernier"
                    on:click={() => validOrder(2)} aria-pressed={isButtonPressed(thirdButtonLabel)}>
            </Button>
        </Column>
        <Column sm style="display: flex; flex-direction: column; text-align: center;">
            <span>{fourthButtonLabel}</span>
            <Button
                    style="background-color:#16150E; filter: contrast({contrast}%) brightness({brightness}%);"
                    class="coloredButton"
                    aria-label="Ce bouton Jaune est immédiatement suivi par le bouton Rose"
                    on:click={() => validOrder(3)} aria-pressed={isButtonPressed(fourthButtonLabel)}>
            </Button>
        </Column>
        <Slider
                labelText="Luminosité"
                min={0}
                max={100}
                maxLabel="100"
                value={brightness}
                step={1}
                aria-hidden={accessibilityMode}
                disabled={accessibilityMode}
                style="align-items: normal; margin-left: 2rem"
                on:input={(value) => {{brightness = value.detail}}}
        />
    </div>
    {#if isWaiting}
        <LoadingComponent/>
    {/if}
{/if}
{#if showError}
    <ToastNotification
            lowContrast
            fullWidth
            kind="error"
            title="Erreur"
            subtitle="L'ordre d'activation des boutons n'est pas bon"
            caption="Essaie encore"
            {timeout}
            on:close={(e) => {
                showError = false;
                firstButtonLabel = " "
                secondButtonLabel = " "
                thirdButtonLabel = " "
                fourthButtonLabel = " "
              }}
    />
{/if}
<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Column, Grid, ImageLoader, Row, Slider, ToastNotification} from "carbon-components-svelte";
    import {goto} from "$app/navigation";
    import {base} from '$app/paths';
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import LoadingComponent from "$lib/technicalComponent/LoadingComponent.svelte";
    import {Step} from "$lib";
    import {onMount} from "svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {
        getAccessibilityMode,
        getAccessibilityModeStore
    } from "$lib/store/AccessibilityModeStore";

    export let accessibilityMode = false

    onMount(() => {
        changeSource("/ost/step1.mp3")
        accessibilityMode = getAccessibilityMode()
        getAccessibilityModeStore()?.subscribe((data) => {
            accessibilityMode = data === "true"
        })
        renderStore.set(new RenderData(Step.ABRI_ENTRANCE, "L'abri", "Salle des alterations"));
    })

    const goodOrder = [3, 2, 0, 1];
    let orderTyped: number[] = [];
    let showError = false;
    let hideScenario = true;
    let hideGoal = true;
    let showButtons = false;
    let isWaiting = false;
    let contrast = 0;
    let brightness = 0;
    let firstButtonLabel = " "
    let secondButtonLabel = " "
    let thirdButtonLabel = " "
    let fourthButtonLabel = " "

    const timeout: number = 4000;
    const validOrder = (id: number) => {
        if (!orderTyped.includes(id)) orderTyped.push(id)
        console.log("order", orderTyped)
        if (id === 0 && !isButtonPressed(firstButtonLabel)) firstButtonLabel = displayOrder(id)
        if (id === 1 && !isButtonPressed(secondButtonLabel)) secondButtonLabel = displayOrder(id)
        if (id === 2 && !isButtonPressed(thirdButtonLabel)) thirdButtonLabel = displayOrder(id)
        if (id === 3 && !isButtonPressed(fourthButtonLabel)) fourthButtonLabel = displayOrder(id)
        if (orderTyped.length >= 4) {
            if (JSON.stringify(orderTyped) == JSON.stringify(goodOrder)) {
                isWaiting = true;
                goto(base + "/abri/computer")
            } else {
                showError = true;
                orderTyped = [];
            }
        }
    }

    function displayOrder(id: number) {
        let number = orderTyped.indexOf(id)
        let position = number + 1
        return position > 0 ? position.toString() : ""
    }

    function isButtonPressed(button: string) {
        return button !== " "
    }

</script>
<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);
</style>

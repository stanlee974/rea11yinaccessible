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
    import { base } from '$app/paths';
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import { redirect, Step, t } from "$lib";
    import SoundEffectComponent from "$lib/technicalComponent/SoundEffectComponent.svelte";
    import { onMount, tick } from "svelte";
    import { RenderData, renderStore } from "$lib/store/inMemoryStore/RenderStore";
    import { changeSource } from "$lib/store/inMemoryStore/AudioStore";
    import { page } from "$app/stores";
    import { animationStore } from "$lib/store/AnimationStore";
    import { ESCAPEGAME_KEY } from "../constant";

    onMount(() => {
        changeSource("/ost/"+ ESCAPEGAME_KEY +"/step2.mp3")
        renderStore.set(new RenderData($t(`common.step.${ESCAPEGAME_KEY}.secondPlace`), $t(`${ESCAPEGAME_KEY}.secondPlace.neon.title`), $t(`${ESCAPEGAME_KEY}.secondPlace.neon.subtitle`), Step.SECOND_PLACE));
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
    $: invalidNom = !/^vorastel$/i.test(nom);
    $: invalidPrenom = !/^elian$/i.test(prenom);

    const validNomBg = `url(${base}/${ESCAPEGAME_KEY}/secondPlace/yellow.png)`;
    const validPrenomBg = `url(${base}/${ESCAPEGAME_KEY}/secondPlace/yellow_low.png)`;
    const validDecesBg = `url(${base}/${ESCAPEGAME_KEY}/secondPlace/green.png)`;
    const validNaissanceBg = `url(${base}/${ESCAPEGAME_KEY}/secondPlace/pink.png)`;

    $: activeValidBackgrounds = [
        !invalidNom ? validNomBg : null,
        !invalidPrenom ? validPrenomBg : null,
        !invalidDeces ? validDecesBg : null,
        !invalidNaissance ? validNaissanceBg : null,
        `url(${base}/${ESCAPEGAME_KEY}/secondPlace/tablet.png)`
    ].filter(Boolean).join(', ');
    const validateForm = (): boolean => {
        let isValid = true;
        if ("vorastel" !== nom.trim().toLowerCase()) {
            isValid = false;
        }
        if ("elian" !== prenom.trim().toLowerCase()) {
            isValid = false;
        }
        if ("12/01/0843" !== naissance.trim().toLowerCase()) {
            isValid = false;
        }
        if ("03/03/0897" !== deces.trim().toLowerCase()) {
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
            redirect($page.params.lang, `${ESCAPEGAME_KEY}/thirdPlace`)
        } else {
            playError = () => playError = undefined
        }
        return isValid;
    }

    const readLabel = (event: any) => {
        if (!$animationStore.disabilities.blind) {
            const target = event.target;
            if (target.getAttribute("id") === 'lastName') {
                console.log("nom")
                playLastName = () => playLastName = undefined
            }
            if (target.getAttribute("id") === 'firstName') {
                console.log("prenom")
                playFirstName = () => playFirstName = undefined;
            }
            if (target.getAttribute("id") === 'birthday') {
                console.log("naissance")
                playBirth = () => playBirth = undefined
            }
            if (target.getAttribute("id") === 'deathday') {
                console.log("deces")
                playDeath = () => playDeath = undefined
            }
            if (target.getAttribute("id") === "submit") {
                console.log("soumettre")
                playSubmit = () => playSubmit = undefined
            }
        }
    }

</script>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/lastName.mp3"
                      postPlay={playLastName}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/firstName.mp3"
                      postPlay={playFirstName}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/birthDay.mp3"
                      postPlay={playBirth}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/deathDay.mp3"
                      postPlay={playDeath}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/submit.mp3"
                      postPlay={playSubmit}></SoundEffectComponent>
<SoundEffectComponent src="/sound/error.mp3" postPlay={playError}></SoundEffectComponent>
<ModalComponent
        opened={openTransition}
        parentDoneAction={() => hideScenario = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/{ESCAPEGAME_KEY}/secondPlace/door.png" alt=""
                        fadeIn={true}/>
            </Column>
            <Column>
                {#each $t(`${ESCAPEGAME_KEY}.secondPlace.before.row`) as row}
                    <p style="font-size: 1.3rem">{row}</p>
                {/each}
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<div>
    <div class="container">
        <div class="mb-4">
            <TypewriterComponent disabled={hideScenario} parentDoneAction={() => showGoal = false}>
                <h2 class="mb-1">{$t('common.layout.title.scenario')}</h2>
                {#each $t(ESCAPEGAME_KEY + '.secondPlace.scenario.row') as row}
                    <p>{row}</p>
                {/each}
            </TypewriterComponent>
        </div>
        <div class="mb-5">
            <TypewriterComponent disabled={showGoal} continueButtonAction={() => {open = true;}} waitReading>
                <h2 class="mb-1">{$t('common.layout.title.goal')}</h2>
                {#each $t(ESCAPEGAME_KEY + '.secondPlace.goal.row') as row}
                    <p>{row}</p>
                {/each}
            </TypewriterComponent>
        </div>
    </div>
</div>
<ModalComponent
        opened="{open}"
        parentDoneAction={() => {showForm = true; open=false}}
        modalHeading={$t(`${ESCAPEGAME_KEY}.secondPlace.hint.title`)}
        direction="column">
    <Tabs type="container">
        {#each $t(ESCAPEGAME_KEY + '.secondPlace.hint.tabs.title') as row}
            <Tab label={row}/>
        {/each}
        <svelte:fragment slot="content">
            <TabContent>
                {#each $t(ESCAPEGAME_KEY + '.secondPlace.hint.tabs.message')[0].list as row}
                    <p>{row}</p>
                {/each}
            </TabContent>
            <TabContent>
                <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: center">
                    <ImageLoader
                            src="{base}/{ESCAPEGAME_KEY}/secondPlace/{$page.params.lang}/brokenPortrait.jpg"
                            alt={$t(`${ESCAPEGAME_KEY}.secondPlace.hint.tabs.message`)[1].alt}
                            fadeIn={true}/>
                </div>
            </TabContent>
            <TabContent>
                <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: center">
                    <ImageLoader
                            src="{base}/{ESCAPEGAME_KEY}/secondPlace/{$page.params.lang}/text.jpg"
                            alt={$t(`${ESCAPEGAME_KEY}.secondPlace.hint.tabs.message`)[2].alt}
                            fadeIn={true}/>
                </div>
            </TabContent>
            <TabContent>
                <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: center">
                    <ImageLoader
                            src="{base}/{ESCAPEGAME_KEY}/secondPlace/{$page.params.lang}/calendrierAncien.png"
                            alt={$t(`${ESCAPEGAME_KEY}.secondPlace.hint.tabs.message`)[3].alt}
                            fadeIn={true}/>
                </div>
            </TabContent>
        </svelte:fragment>
    </Tabs>
</ModalComponent>
{#if showForm}
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <Button autofocus kind="secondary"
                on:click={() => open = true}>{$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.title`)}</Button>
        <Content id="computer" style="opacity: 0; pointer-events: none;">
            <FluidForm style="width: 1px; height: 1px">
                <TextInput style="background-color: black; color: black" on:focus={readLabel}
                           id="lastName"
                           aria-label={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.lastName.ariaLabel`)}
                           labelText={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.lastName.text`)}
                           placeholder={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.lastName.placeholder`)}
                           required invalid={invalidNom}
                           invalidText={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.lastName.error`)}
                           bind:value={nom}
                           autocomplete="off"
                />
                <TextInput style="background-color: black; color: black" on:focus={readLabel}
                           id="firstName"
                           aria-label={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.firstName.ariaLabel`)}
                           labelText={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.firstName.text`)}
                           placeholder={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.firstName.placeholder`)}
                           required invalid={invalidPrenom}
                           invalidText={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.firstName.error`)}
                           bind:value={prenom}
                           autocomplete="off"
                />
                <TextInput style="background-color: black; color: black" on:focus={readLabel}
                           id="birthday"
                           aria-label={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.birthday.ariaLabel`)}
                           labelText={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.birthday.text`)}
                           placeholder={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.birthday.placeholder`)}
                           required
                           bind:value={naissance} invalid={invalidNaissance}
                           invalidText={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.birthday.error`)}
                           autocomplete="off"
                />
                <TextInput style="background-color: black; color: black" on:focus={readLabel}
                           id="deathday"
                           aria-label={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.deathday.ariaLabel`)}
                           labelText={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.deathday.text`)}
                           placeholder={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.deathday.placeholder`)}
                           required bind:value={deces}
                           invalid={invalidDeces}
                           invalidText={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.deathday.error`)}
                           autocomplete="off"/>
            </FluidForm>
            <Button id='submit' kind="primary" aria-label={$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.submit.ariaLabel`)}
                    on:click={() => validateForm()} on:focus={readLabel}>
                {$t(`${ESCAPEGAME_KEY}.secondPlace.test.form.submit.text`)}
            </Button>
        </Content>
        <div role='img' aria-hidden="true" style="height: 1024px; width: 1024px; background-image: {activeValidBackgrounds}"></div>
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}

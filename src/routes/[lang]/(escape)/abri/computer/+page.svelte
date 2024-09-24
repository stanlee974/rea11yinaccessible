<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/lastName.mp3" postPlay={playLastName}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/firstName.mp3" postPlay={playFirstName}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/birthDay.mp3" postPlay={playBirth}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/deathDay.mp3" postPlay={playDeath}></SoundEffectComponent>
<SoundEffectComponent src="/sound/accessibleName/{$page.params.lang}/submit.mp3" postPlay={playSubmit}></SoundEffectComponent>
<SoundEffectComponent src="/sound/error.mp3" postPlay={playError}></SoundEffectComponent>
<ModalComponent
        opened={openTransition}
        parentDoneAction={() => hideScenario = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/abri/computer/man_walking.jpg" alt=""
                        fadeIn={true}/>
            </Column>
            <Column>
                <p>{$t(`shelterComputerRoom.before.row.1`)}</p>
                <p>{$t(`shelterComputerRoom.before.row.2`)}</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<div>
    <div class="container">
        <div class="mb-4">
            <TypewriterComponent disabled={hideScenario} parentDoneAction={() => showGoal = false}>
                <h2 class="mb-1">{$t('common.layout.title.scenario')}</h2>
                <p>{$t(`shelterComputerRoom.scenario.row.1`)}</p>
                <p>{$t(`shelterComputerRoom.scenario.row.2`)}</p>
                <p>{$t(`shelterComputerRoom.scenario.row.3`)}</p>
            </TypewriterComponent>
        </div>
       <div class="mb-5">
         <TypewriterComponent disabled={showGoal} continueButtonAction={() => {open = true;}} waitReading>
             <h2 class="mb-1">{$t('common.layout.title.goal')}</h2>
             <p>{$t(`shelterComputerRoom.goal.row.1`)}</p>
         </TypewriterComponent>
       </div>
    </div>
</div>
<ModalComponent
        opened="{open}"
        parentDoneAction={() => {showForm = true; open=false;}}
        modalHeading={$t(`shelterComputerRoom.hint.title`)}
        direction="column">
    <Tabs type="container">
        <Tab label={$t(`shelterComputerRoom.hint.tabs.1.title`)}/>
        <Tab label={$t(`shelterComputerRoom.hint.tabs.2.title`)}/>
        <svelte:fragment slot="content">
            <TabContent>
                <p>{$t(`shelterComputerRoom.hint.tabs.1.message.1`)}</p>
                <p>{$t(`shelterComputerRoom.hint.tabs.1.message.2`)}</p>
                <p>{$t(`shelterComputerRoom.hint.tabs.1.message.3`)}</p>
                <p>{$t(`shelterComputerRoom.hint.tabs.1.message.4`)}</p>
            </TabContent>
            <TabContent>
                <div style="display: flex; margin-top: 2rem; align-items: center; justify-content: center">
                    <ImageLoader
                            src="{base}/abri/computer/{$page.params.lang}/louisBraille.jpg"
                            alt={$t(`shelterComputerRoom.hint.tabs.2.message`)}
                            fadeIn={true}/>
                </div>
            </TabContent>
        </svelte:fragment>
    </Tabs>
</ModalComponent>
{#if showForm}
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <Button autofocus kind="secondary"
                on:click={() => open = true}>{$t(`shelterComputerRoom.test.form.title`)}</Button>
        <Content id="computer" style="opacity: 0; pointer-events: none;">
            <FluidForm style="width: 1px; height: 1px">
                <TextInput style="background-color: black; color: black" on:focus={readLabel}
                           id="lastName"
                           aria-label={$t(`shelterComputerRoom.test.form.lastName.ariaLabel`)}
                           labelText={$t(`shelterComputerRoom.test.form.lastName.text`)}
                           placeholder={$t(`shelterComputerRoom.test.form.lastName.placeholder`)}
                           required invalid={invalidNom}
                           invalidText={$t(`shelterComputerRoom.test.form.lastName.error`)}
                           bind:value={nom}/>
                <TextInput style="background-color: black; color: black" on:focus={readLabel}
                           id="firstName"
                           aria-label={$t(`shelterComputerRoom.test.form.firstName.ariaLabel`)}
                           labelText={$t(`shelterComputerRoom.test.form.firstName.text`)}
                           placeholder={$t(`shelterComputerRoom.test.form.firstName.placeholder`)}
                           required invalid={invalidPrenom}
                           invalidText={$t(`shelterComputerRoom.test.form.firstName.error`)}
                           bind:value={prenom}/>
                <TextInput style="background-color: black; color: black" on:focus={readLabel}
                           id="birthday"
                           aria-label={$t(`shelterComputerRoom.test.form.birthday.ariaLabel`)}
                           labelText={$t(`shelterComputerRoom.test.form.birthday.text`)}
                           placeholder={$t(`shelterComputerRoom.test.form.birthday.placeholder`)}
                           required
                           bind:value={naissance} invalid={invalidNaissance}
                           invalidText={$t(`shelterComputerRoom.test.form.birthday.error`)}
                />
                <TextInput style="background-color: black; color: black" on:focus={readLabel}
                           id="deathday"
                           aria-label={$t(`shelterComputerRoom.test.form.deathday.ariaLabel`)}
                           labelText={$t(`shelterComputerRoom.test.form.deathday.text`)}
                           placeholder={$t(`shelterComputerRoom.test.form.deathday.placeholder`)}
                           required bind:value={deces}
                           invalid={invalidDeces}
                           invalidText={$t(`shelterComputerRoom.test.form.deathday.error`)}/>
            </FluidForm>
            <Button id='submit' kind="secondary" aria-label={$t(`shelterComputerRoom.test.form.submit.ariaLabel`)}
                    on:click={() => validateForm()} on:focus={readLabel}>
                {$t(`shelterComputerRoom.test.form.submit.text`)}
            </Button>
        </Content>
        <img src="{base}/abri/computer/computer.jpg" alt=""/>
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}
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
    import {base} from '$app/paths';
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import {redirect, Step, t} from "$lib";
    import SoundEffectComponent from "$lib/technicalComponent/SoundEffectComponent.svelte";
    import {onMount} from "svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {getAccessibilityMode} from "$lib/store/AccessibilityModeStore";
    import {page} from "$app/stores";

    onMount(() => {
        changeSource("/ost/step2.mp3")
        renderStore.set(new RenderData($t('common.step.shelterComputerRoom'), $t(`shelterComputerRoom.neon.title`), $t(`shelterComputerRoom.neon.subtitle`), Step.ABRI_COMPUTER));
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
        console.debug(
            nom.trim().toLowerCase(),
            prenom.trim().toLowerCase(),
            naissance.trim().toLowerCase(),
            deces.trim().toLowerCase()
        )
        if (isValid) {
            isWaiting = true
            redirect($page.params.lang, "abri/medical")
        } else {
            playError = () => playError = undefined
        }
        return isValid;
    }

    const readLabel = (event: any) => {
        if (!getAccessibilityMode()) {
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

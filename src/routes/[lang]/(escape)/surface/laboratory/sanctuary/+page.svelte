<ModalComponent opened={showTransitionModal}
                parentDoneAction={() => {showScenario = false;}}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/surface/laboratory/sanctuary/direction_to_sanctuary.jpg"
                        alt={$t('sanctuary.before.image')}
                        fadeIn={true}/>
            </Column>
            <Column>
                <p class="mb-2">{$t('sanctuary.before.row.1')}</p>
                <p class="mb-2">{$t('sanctuary.before.row.2')}</p>
                <p class="mb-2">{$t('sanctuary.before.row.3')}</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<Typewriter disabled={showScenario} mode="cascade"
            on:done={() => setTimeout(() => showContinueButton = true, 2000)}>
    <div>
        <div class="container mt-4 mb-5">
            <h2 class="mb-2">{$t('common.layout.title.scenario')}</h2>
            <p>{$t('sanctuary.scenario.row.1')}</p>
            <p>{$t('sanctuary.scenario.row.2')}</p>
            <p>{$t('sanctuary.scenario.row.3')}</p>
            <p>{$t('sanctuary.scenario.row.4')}</p>
            <p>{$t('sanctuary.scenario.row.5')}</p>
            <p>{$t('sanctuary.scenario.row.6')}</p>
            <p>{$t('sanctuary.scenario.row.7')}</p>
        </div>
    </div>
</Typewriter>
{#if showContinueButton}
    <Button kind="primary"
            style="position: layout; left: 46%; padding-right: 2.5rem; padding-left: 2.5rem;"
            on:click={() => {
            showEnigm = true
            showContinueButton = false
            changeSource("/ost/step9.mp3")
        }}>{$t('sanctuary.scenario.button.continue.text')}
    </Button>
{/if}
<ModalComponent opened={showEnigm}
                parentDoneAction={() => disableGoal = false}>
    <Grid>
        <Row>
            <Column>
                <div>
                    <ImageLoader
                            src="{base}/surface/laboratory/sanctuary/door.jpg"
                            alt={$t('sanctuary.scenario.modal.1.row.1')} fadeIn={true}/>
                    <span>2</span>
                    <p>{$t('sanctuary.scenario.modal.1.row.2')}</p>
                    <p>{$t('sanctuary.scenario.modal.1.row.3')}</p>
                </div>
            </Column>
            <Column>
                <span>1</span>
                <p>{$t('sanctuary.scenario.modal.1.row.4')}</p>
                <ImageLoader
                        src="{base}/surface/laboratory/sanctuary/last_item.jpg"
                        alt={$t('sanctuary.scenario.modal.1.row.5')} fadeIn={true}/>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<Typewriter mode="cascade" disabled={disableGoal} on:done={() => setTimeout(() => showForm = true, 2000)}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-2">{$t('common.layout.title.goal')}</h2>
            <p>{$t('sanctuary.goal.row.1')}</p>
            <p>{$t('sanctuary.goal.row.2')}</p>
        </div>
    </div>
</Typewriter>
{#if showForm}
    <FluidForm style="width: 5000px; height: 5000px">
        <div style="width: 5000px; position: absolute; left: 2500px; top: 3400px; font-size: 300rem">
            <label id="lastName">{$t('sanctuary.test.buttons.lastName.text')}</label>
            <input aria-labelledby="lastName" required
                   bind:value={lastName}>
        </div>
        <div style="width: 100px; position: absolute; left: 5000px; top: 1000px; font-size: 0.3rem">
            <label id="firstName">{$t('sanctuary.test.buttons.firstName.text')}</label>
            <input aria-labelledby="firstName" required
                   bind:value={firstName}>
        </div>
    </FluidForm>
    <Button kind="primary" on:click={() => validateForm()}>{$t('sanctuary.test.buttons.submit.text')}</Button>
    {#if error}
        <span style="color: red; font-weight: bold">{error}</span>
    {/if}
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}
<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {Button, Column, FluidForm, Grid, ImageLoader, Loading, Row,} from "carbon-components-svelte";
    import Typewriter from 'svelte-typewriter'
    import {base} from '$app/paths';
    import {redirect, Step, t} from "$lib";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {onMount} from "svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {page} from "$app/stores";

    onMount(() => {
        changeSource("/ost/trap.mp3")
        renderStore.set(new RenderData($t('common.step.sanctuary'), $t('sanctuary.neon.title'), $t('sanctuary.neon.subtitle'), Step.SURFACE_LABORATORY_SANCTUARY));
    })

    let showTransitionModal = true;
    let showScenario = true;
    let showEnigm = false;
    let isWaiting = false;
    let showContinueButton = false;
    let showForm = true;
    let disableGoal = true;
    let lastName = ""
    let firstName = ""
    let error = ""
    $: validRodrigue = new RegExp($t('sanctuary.test.response.1.firstName'), 'i').test(lastName) && new RegExp($t('sanctuary.test.response.1.lastName'), 'i').test(firstName)
    $: validDiva = new RegExp($t('sanctuary.test.response.2.firstName'), 'i').test(lastName) && new RegExp($t('sanctuary.test.response.2.lastName'), 'i').test(firstName)

    const validateForm = () => {
        if (validDiva
            || validRodrigue) {
            isWaiting = true
            redirect($page.params.lang, "final")
        } else {
            error = $t('sanctuary.test.error')
        }
    }

</script>

<style lang="css">
    label {
        font-size: 1.3em;
    }

    span {
        border: white 1px solid;
        padding: 0.3em;
    }
</style>

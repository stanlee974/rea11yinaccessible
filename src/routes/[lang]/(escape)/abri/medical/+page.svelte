<ModalComponent opened={open}
                parentDoneAction={() => showScenario = false}>
    <div style="display: flex; flex-direction: row">
        <Grid>
            <Row>
                <Column>
                    <ImageLoader
                            src="{base}/abri/entrance/enter.jpg" alt={$t('shelterMedicalRoom.before.image')}
                            fadeIn={true}/>
                </Column>
                <Column><p style="font-size: 1.3rem">{$t('shelterMedicalRoom.before.row.1')}</p>
                    <p style="font-size: 1.3rem">{$t('shelterMedicalRoom.before.row.2')}</p>
                    <p style="font-size: 1.3rem">{$t('shelterMedicalRoom.before.row.3')}</p>
                </Column>
            </Row>
        </Grid>
    </div>
</ModalComponent>
<TypewriterComponent disabled={showScenario} waitReading continueButtonAction={() => showBookAndPills = true}>
    <h2><u><i>{$t('common.layout.title.scenario')}</i></u></h2>
    <p>{$t('shelterMedicalRoom.scenario.row.1')}</p>
</TypewriterComponent>
<ModalComponent opened={showBookAndPills}
                modalHeading={$t('shelterMedicalRoom.scenario.modal.1.title')}
                parentDoneAction={() => showNotice = false}>
    <ImageLoader
            src="{base}/abri/medical/pills.jpg" alt={$t('shelterMedicalRoom.scenario.modal.1.image.1')} fadeIn={true}/>
    <ImageLoader
            src="{base}/abri/medical/book.jpg" alt={$t('shelterMedicalRoom.scenario.modal.1.image.2')} fadeIn={true}/>
</ModalComponent>
<br aria-hidden="true"/>
<TypewriterComponent disabled={showNotice} waitReading continueButtonAction={() => showManEating = true}>
    <p>{$t('shelterMedicalRoom.scenario.row.2')}</p>
    <p style="font-style: italic;">{$t('shelterMedicalRoom.scenario.row.3')}</p>
    <p>{$t('shelterMedicalRoom.scenario.row.4')}</p>
</TypewriterComponent>
<ModalComponent opened={showManEating}
                modalHeading={$t('shelterMedicalRoom.scenario.modal.2.title')}
                parentDoneAction={() => showGoal = false}>
    <ImageLoader
            src="{base}/abri/medical/man_eating.jpg" alt="" fadeIn={true}/>
</ModalComponent>
<br aria-hidden="true"/>
<TypewriterComponent disabled={showGoal} parentDoneAction={() => showForm = true}>
    <p>{$t('shelterMedicalRoom.scenario.row.5')}</p>
    <h2><u><i>{$t('common.layout.title.goal')}</i></u></h2>
    <p>{$t('shelterMedicalRoom.goal.row.1')}</p>
</TypewriterComponent>
{#if showForm}
    <div style="display: flex; flex-direction: column; margin-top: 2rem; align-items: center; justify-content: center;">
        <Content>
            <p>{hint}</p>
        </Content>
        <FluidForm>
            <TextInput aria-label={$t('shelterMedicalRoom.test.button.password.label')}
                       labelText={$t('shelterMedicalRoom.test.button.password.text')}
                       placeholder={$t('shelterMedicalRoom.test.button.password.placeholder')}
                       required invalid={invalidResult}
                       invalidText={$t('shelterMedicalRoom.test.button.password.error')}
                       autofocus bind:value={result}/>
        </FluidForm>
        <Button kind="secondary" on:click={() => validateForm()}>{$t('shelterMedicalRoom.test.button.submit.text')}
        </Button>
    </div>
    {#if isWaiting}
        <Loading/>
    {/if}
{/if}
<script lang="ts">
    import "carbon-components-svelte/css/g90.css";
    import {
        Button,
        Column,
        Content,
        FluidForm,
        Grid,
        ImageLoader,
        Loading,
        Row,
        TextInput,
    } from "carbon-components-svelte";
    import dyslexia from "dyslexia";
    import {base} from '$app/paths';
    import {redirect, Step, t} from "$lib";
    import TypewriterComponent from "$lib/technicalComponent/TypewriterComponent.svelte";
    import ModalComponent from "$lib/technicalComponent/ModalComponent.svelte";
    import {onMount} from "svelte";
    import {RenderData, renderStore} from "$lib/store/inMemoryStore/RenderStore";
    import {changeSource} from "$lib/store/inMemoryStore/AudioStore";
    import {page} from "$app/stores";

    let open = true;
    let showScenario = true;
    let showBookAndPills = false;
    let showNotice = true;
    let showManEating = false;
    let showForm = false;
    let showGoal = true;
    let isWaiting = false;

    let result = ""

    let hint = $t('shelterMedicalRoom.test.sentence')


    onMount(() => {
        changeSource("/ost/step3.mp3")
        renderStore.set(new RenderData($t('common.step.shelterMedicalRoom'), $t('shelterMedicalRoom.neon.title'), $t('shelterMedicalRoom.neon.subtitle'), Step.ABRI_MEDICAL));
    })

    $: invalidResult = !new RegExp($t('shelterMedicalRoom.test.response'), 'i').test(result);
    const dyslexifyContent = () => {
        hint = dyslexia(hint)

    }
    const interval = setInterval(dyslexifyContent, 500)
    const validateForm = (): void => {
        if (new RegExp($t('shelterMedicalRoom.test.response'), 'i').test(result)) {
            clearInterval(interval)
            isWaiting = true
            redirect($page.params.lang, "abri/searchcenter")
        }
    }

</script>

<style lang="css">
    @import url(/css/app.css);
    @import url(/css/neon.css);
</style>

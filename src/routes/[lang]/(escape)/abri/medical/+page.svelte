<ModalComponent opened={open}
                parentDoneAction={() => showScenario = false}>
    <Grid>
        <Row>
            <Column>
                <ImageLoader
                        src="{base}/abri/entrance/enter.jpg" alt={$t('shelterMedicalRoom.before.image')}
                        fadeIn={true}/>
            </Column>
            <Column>
                <p>{$t('shelterMedicalRoom.before.row.1')}</p>
                <p>{$t('shelterMedicalRoom.before.row.2')}</p>
                <p>{$t('shelterMedicalRoom.before.row.3')}</p>
            </Column>
        </Row>
    </Grid>
</ModalComponent>
<TypewriterComponent disabled={showScenario} waitReading continueButtonAction={() => showBookAndPills = true}>
    <div>
        <div class="container mb-4">
            <h2 class="mb-1">{$t('common.layout.title.scenario')}</h2>
            <p>{$t('shelterMedicalRoom.scenario.row.1')}</p>
        </div>
    </div>
</TypewriterComponent>
<ModalComponent opened={showBookAndPills}
                modalHeading={$t('shelterMedicalRoom.scenario.modal.1.title')}
                parentDoneAction={() => showNotice = false}>
    <ImageLoader
            src="{base}/abri/medical/pills.jpg" alt={$t('shelterMedicalRoom.scenario.modal.1.image.1')} fadeIn={true}/>
    <ImageLoader
            src="{base}/abri/medical/book.jpg" alt={$t('shelterMedicalRoom.scenario.modal.1.image.2')} fadeIn={true}/>
</ModalComponent>
<TypewriterComponent disabled={showNotice} waitReading continueButtonAction={() => showManEating = true}>
    <div>
        <div class="container mb-4">
            <p>{$t('shelterMedicalRoom.scenario.row.2')}</p>
            <p class="quote m-3">{$t('shelterMedicalRoom.scenario.row.3')}</p>
            <p>{$t('shelterMedicalRoom.scenario.row.4')}</p>
        </div>
    </div>
</TypewriterComponent>
<ModalComponent opened={showManEating}
                modalHeading={$t('shelterMedicalRoom.scenario.modal.2.title')}
                parentDoneAction={() => showGoal = false}>
    <ImageLoader
            src="{base}/abri/medical/man_eating.jpg" alt="" fadeIn={true}/>
</ModalComponent>
<TypewriterComponent disabled={showGoal} parentDoneAction={() => showForm = true}>
    <div>
        <div class="container mb-4">
            <p class="mb-3">{$t('shelterMedicalRoom.scenario.row.5')}</p>
            <h2 class="mb-2">{$t('common.layout.title.goal')}</h2>
            <p>{$t('shelterMedicalRoom.goal.row.1')}</p>
        </div>
    </div>
</TypewriterComponent>
{#if showForm}
    <div>
        <div class="container mb-4 d-flex flex-column align-items-center justify-content-center">
            <div class="mb-3">
                <p>{hint}</p>
            </div>
            <FluidForm class="mb-3">
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
<style>
    @import url('https://fonts.cdnfonts.com/css/handwriting');
</style>
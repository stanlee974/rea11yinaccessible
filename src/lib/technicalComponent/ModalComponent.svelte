<script lang="ts">
    import {Modal} from "carbon-components-svelte";
    import {t} from "$lib";
    import ContinueFilled from "carbon-icons-svelte/lib/ContinueFilled.svelte";

    export let opened = true;
    export let parentDoneAction: Function | undefined = undefined;
    export let modalHeading: string = "";
    export let direction: string = "row";
    export let hasPrimaryButton: boolean = true;
    export let id: string = "currentModal";

    const onClose = () => {
        if (parentDoneAction !== undefined) {
            parentDoneAction()
        }
    }

</script>
<Modal id={id} size="lg" preventCloseOnClickOutside passiveModal={!hasPrimaryButton} modalHeading={modalHeading}
       bind:open={opened}
       on:close={() => onClose()}
       primaryButtonText="{$t('common.button.waiting')}"
       primaryButtonIcon={ContinueFilled}
       on:click:button--primary={() => {opened=false; onClose()}}>
    <div class="d-flex flex-{direction}">
        <slot></slot>
    </div>
</Modal>

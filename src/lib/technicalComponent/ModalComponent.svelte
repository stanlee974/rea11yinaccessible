<!--{#if !$accessibilityModeStore}-->
    <Modal size="lg" preventCloseOnClickOutside passiveModal={!hasPrimaryButton} modalHeading={modalHeading}
           bind:open={opened}
           on:close={() => onClose()}
           primaryButtonText="{$t('common.button.waiting')}"
           on:click:button--primary={() => {opened=false; onClose()}}>
        <div style="display: flex; flex-direction: {direction}">
            <slot></slot>
        </div>
    </Modal>
<!--{:else}-->
<!--    <slot></slot>-->
<!--{/if}-->
<script lang="ts">
    import {Modal,} from "carbon-components-svelte";
    import {t} from "$lib";
    import {accessibilityModeStore} from "$lib/store/AccessibilityModeStore";
    import {onMount} from "svelte";

    export let opened = true
    export let parentDoneAction: Function | undefined = undefined
    export let modalHeading: string = ""
    export let direction: string = "row"
    export let hasPrimaryButton: boolean = true

    const onClose = () => {
        if (parentDoneAction !== undefined) {
            parentDoneAction()
        }
    }

    onMount(() => {
        //FIXME manage getAccessibilityMode
        // if ($accessibilityModeStore) {
        //   onClose()
        // }
    })
</script>

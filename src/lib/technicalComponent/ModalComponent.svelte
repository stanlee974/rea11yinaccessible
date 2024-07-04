<Modal size="lg" preventCloseOnClickOutside passiveModal={!hasPrimaryButton} modalHeading={modalHeading} bind:open={opened}
       on:close={() => onClose()}
       primaryButtonText="{$t('common.button.waiting')}"
       on:click:button--primary={() => {opened=false; onClose()}}>
    <div style="display: flex; flex-direction: {direction}">
        <slot></slot>
    </div>
</Modal>
<script lang="ts">
  import { Modal, } from "carbon-components-svelte";
  import { t } from "$lib";

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
</script>

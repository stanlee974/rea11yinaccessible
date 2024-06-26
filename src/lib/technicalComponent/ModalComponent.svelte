<Modal size="lg" preventCloseOnClickOutside passiveModal modalHeading={modalHeading} bind:open={opened}
       on:close={() => onClose()}>
    <div style="display: flex; flex-direction: row">
        <slot></slot>
    </div>
</Modal>
<script lang="ts">
  import { Modal, } from "carbon-components-svelte";

  export let opened = true
  export let parentDoneAction: Function | undefined = undefined
  export let modalHeading: string = ""

  const onClose = () => {
    if (parentDoneAction !== undefined) {
      parentDoneAction()
    }
  }
</script>

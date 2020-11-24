<template>
  <v-dialog v-model="formDialog" persistent max-width="500px" transition="scroll-y-transition">
    <slot name="dialog"></slot>
  </v-dialog>
</template>

<script>
export default {
  props: {
    formDialog: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
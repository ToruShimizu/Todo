<template>
  <v-dialog v-model="formDialog" persistent max-width="600px" transition="scroll-y-transition">
    <v-app>
      <slot name="dialog"></slot>
    </v-app>
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
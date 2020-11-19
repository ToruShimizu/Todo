<template>
  <v-btn color="blue darken-1" outlined @click="handleDialogButton">
    <slot name="dialogButton"> </slot>
    <span class="font-italic">{{ title }} </span>
  </v-btn>
</template>

<script>
export default {
  props: { title: String },
  methods: {
    handleDialogButton() {
      this.$emit('dialog-button')
    }
  }
}
</script>
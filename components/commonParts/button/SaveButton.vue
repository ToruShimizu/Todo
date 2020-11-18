<template>
  <v-btn color="blue darken-1" outlined @click="handleSaveButton">
    <slot name="saveButton"> </slot>
    <span class="font-italic">{{ title }} </span>
  </v-btn>
</template>

<script>
export default {
  props: { title: String },
  methods: {
    handleSaveButton() {
      this.$emit('save-button')
    }
  }
}
</script>
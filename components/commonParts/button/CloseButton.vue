<template>
  <v-btn color="blue darken-1" outlined @click="handleCloseButton">
    <v-icon left>mdi-exit-to-app </v-icon>
    <span class="font-italic">{{ title }}</span>
  </v-btn>
</template>

<script>
export default {
  props: { title: String },
  methods: {
    handleCloseButton() {
      this.$emit('close-button')
    }
  }
}
</script>
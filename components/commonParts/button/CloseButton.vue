<template>
  <v-btn color="blue darken-1" outlined @click="handleCloseButton" class="mr-2">
    <v-icon left>mdi-arrow-left-bold-box-outline </v-icon>
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
<template>
  <v-btn color="blue accent-3" @click="handleCloseButton" class="mr-2 white--text">
    <v-icon left>mdi-arrow-left-bold-box </v-icon>
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
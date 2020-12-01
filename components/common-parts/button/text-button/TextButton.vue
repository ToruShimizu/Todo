<template>
  <v-btn text @click="handleTextButton">
    <v-icon>{{ icon }}</v-icon
    >{{ title }}
  </v-btn>
</template>

<script>
export default {
  props: { icon: String, title: String },
  methods: {
    handleTextButton() {
      this.$emit('handle-text-button')
    }
  }
}
</script>
  
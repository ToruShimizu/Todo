<template>
  <v-btn x-small text @click="handleTextButton">
    <v-icon small>{{ icon }}</v-icon
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
  
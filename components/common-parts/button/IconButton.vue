<template>
  <v-btn icon @click="handleIconButton">
    <v-icon>{{ icon }}</v-icon
    >{{ title }}
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String
  },
  methods: {
    handleIconButton() {
      this.$emit('handle-icon-button')
    }
  }
}
</script>
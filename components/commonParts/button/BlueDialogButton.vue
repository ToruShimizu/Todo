<template>
  <v-btn color="blue darken-1" outlined @click="handleDialogButton">
    <v-icon>{{ icon }}</v-icon>
    <span class="font-italic">{{ title }} </span>
  </v-btn>
</template>

<script>
export default {
  props: { title: String, icon: String },
  methods: {
    handleDialogButton() {
      this.$emit('dialog-button')
    }
  }
}
</script>
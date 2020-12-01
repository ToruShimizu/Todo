<template>
  <v-btn color="blue accent-3" @click="handleDialogButton" class="white--text">
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
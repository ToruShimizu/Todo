<template>
  <div>
    <v-btn class="white--text" color="red darken-1" @click="handleDeleteButton" :loading="loading">
      <v-icon left>{{ icon }}</v-icon>
      <span class="font-italic">{{ title }}</span>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDeleteButton() {
      this.$emit('delete-button')
    }
  }
}
</script>

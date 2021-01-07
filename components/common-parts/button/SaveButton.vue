<template>
  <div>
    <v-btn
      color="blue accent-3"
      @click="handleSaveButton"
      :loading="loading"
      class="ml-2 white--text"
    >
      <v-icon left>{{ icon }} </v-icon>
      <span class="font-italic">{{ title }} </span>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleSaveButton() {
      this.$emit('save-button')
    }
  }
}
</script>

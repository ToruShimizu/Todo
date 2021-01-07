<template>
  <v-card-actions class="justify-end">
    <CloseButton :title="closeButtonTitle" @close-button="closeButton" />
    <SaveButton
      :title="saveButtonTitle"
      :loading="loading"
      @save-button="saveButton"
      :icon="icon"
    />
  </v-card-actions>
</template>

<script>
export default {
  props: {
    icon: String,
    closeButtonTitle: {
      type: String,
      required: true
    },
    saveButtonTitle: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    saveButton() {
      this.$emit('save-button')
    },
    closeButton() {
      this.$emit('close-button')
    }
  }
}
</script>

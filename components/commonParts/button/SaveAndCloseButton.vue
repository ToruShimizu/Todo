<template>
  <v-card-actions class="justify-end">
    <CloseButton :title="closeButtonTitle" @close-button="closeButton" />
    <SaveButton
      :title="saveButtonTitle"
      :loader="loader"
      :loading="loading"
      @save-button="saveButton"
      @stop-loading="stopLoading"
      :icon="icon"
    >
    </SaveButton>
  </v-card-actions>
</template>

<script>
import SaveButton from '@/components/commonParts/button/SaveButton'
import CloseButton from '@/components/commonParts/button/CloseButton'
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
      required: false,
      default: false
    },
    loader: {
      type: null,
      required: true
    }
  },
  components: {
    SaveButton,
    CloseButton
  },
  methods: {
    saveButton() {
      this.$emit('save-button')
    },
    closeButton() {
      this.$emit('close-button')
    },
    stopLoading() {
      this.$emit('stop-loading')
    }
  }
}
</script>
<template>
  <v-card-actions class="justify-end">
    <CloseButton :title="closeButtonTitle" @close-button="closeButton" />
    <SaveButton :title="saveButtonTitle" @save-button="saveButton"
      ><template v-slot:saveButton><slot name="save"></slot></template
    ></SaveButton>
  </v-card-actions>
</template>

<script>
import SaveButton from '@/components/commonParts/button/SaveButton'
import CloseButton from '@/components/commonParts/button/CloseButton'
export default {
  props: {
    closeButtonTitle: {
      type: String,
      required: true
    },
    saveButtonTitle: {
      Type: String,
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
    }
  }
}
</script>
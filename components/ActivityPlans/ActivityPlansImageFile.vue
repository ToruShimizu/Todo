<template>
  <div>
    <v-dialog v-model="imageFileDialog" persistent max-width="400" transition="scroll-y-transition">
      <v-card max-width="400">
        <LoadingImg :src="contents.photoURL" :width="'400'" :height="'400'" />
        <v-card-actions class="justify-end">
          <TextButton :title="'close'" class="primary--text" @handle-text-button="closeImageFile" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormDialog from '@/components/commonParts/dialog/FormDialog'
import LoadingImg from '@/components/commonParts/v-img/LoadingImg'
import FormView from '@/components/commonParts/form/FormView'
import TextButton from '@/components/commonParts/button/textButton/TextButton'

export default {
  components: {
    FormDialog,
    LoadingImg,
    FormView,
    TextButton
  },
  props: {
    contents: {
      type: Object
    },
    imageFileDialog: {
      type: Boolean
    }
  },
  methods: {
    closeImageFile() {
      this.$emit('close-image-file')
    }
  }
}
</script>
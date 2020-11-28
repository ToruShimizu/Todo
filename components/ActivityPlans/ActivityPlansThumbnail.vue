<template>
  <LoadingImg :src="photoURL" :width="'90%'" :height="'200'" @handle-image-file="openImageFile" />
</template>

<script>
import LoadingImg from '@/components/commonParts/v-img/LoadingImg'

export default {
  props: {
    photoURL: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    LoadingImg
  },
  methods: {
    openImageFile() {
      this.$emit('open-image-file')
    }
  }
}
</script>
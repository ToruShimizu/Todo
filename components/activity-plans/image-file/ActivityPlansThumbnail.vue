<template>
  <LoadingImg :src="photoURL" :width="'100%'" :height="'200'" @handle-image-file="openImageFile" />
</template>

<script>
export default {
  props: {
    photoURL: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    openImageFile() {
      this.$emit('open-image-file')
    }
  }
}
</script>

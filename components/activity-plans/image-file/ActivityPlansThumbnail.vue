<template>
  <LoadingImg :src="photoURL" @remove-image-file="openImageFile" />
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

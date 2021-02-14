<template>
  <v-img
    v-if="src"
    :src="src"
    :lazy-src="src"
    aspect-ratio="1"
    class="grey lighten-2"
    :max-width="width"
    :max-height="height"
    @click="removeImageFile"
  >
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200'
    }
  },
  methods: {
    removeImage() {
      this.$emit('remove-image')
    },
    removeImageFile() {
      this.$emit('remove-image-file')
    }
  }
}
</script>

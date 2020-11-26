<template>
  <v-row class="justify-center">
    <v-img
      :src="src"
      :lazy-src="src"
      aspect-ratio="1"
      class="grey lighten-2"
      :max-width="width"
      :max-height="height"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </v-row>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false,
      default: ''
    },
    height: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
    handleDeleteImage() {
      console.log('jj')
      this.$emit('delete-image')
    }
  }
}
</script>
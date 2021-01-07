<template>
  <div>
    <Loading>
      <template v-slot:loading>
        <v-btn
          class="white--text"
          color="red darken-1"
          @click="handleDeleteButton"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon left>{{ icon }}</v-icon>
          <span class="font-italic">{{ title }}</span>
        </v-btn>
      </template>
    </Loading>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String,
    loading: {
      type: Boolean,
      default: false
    },
    loader: {
      type: null,
      default: null
    }
  },
  watch: {
    loader() {
      setTimeout(() => {
        this.stopLoading()
      }, 2000)
    }
  },
  methods: {
    handleDeleteButton() {
      this.$emit('delete-button')
    },
    stopLoading() {
      this.$emit('stop-loading')
    }
  }
}
</script>

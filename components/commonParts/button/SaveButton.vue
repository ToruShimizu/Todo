<template>
  <div>
    <Loading>
      <template v-slot:loading>
        <v-btn
          color="blue accent-3"
          @click="handleSaveButton"
          :loading="loading"
          :disabled="loading"
          class="ml-2 white--text"
        >
          <v-icon left>{{ icon }} </v-icon>
          <span class="font-italic">{{ title }} </span>
        </v-btn>
      </template>
    </Loading>
  </div>
</template>

<script>
import Loading from '@/components/commonParts/button/Loading/'

export default {
  components: {
    Loading
  },
  props: {
    icon: String,
    title: String,
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    loader: {
      type: null,
      required: false,
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
    handleSaveButton() {
      this.$emit('save-button')
    },
    stopLoading() {
      this.$emit('stop-loading')
    }
  }
}
</script>


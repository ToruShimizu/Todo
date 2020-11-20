<template>
  <div>
    <Loading>
      <template v-slot:loading>
        <v-btn
          color="blue darken-1"
          outlined
          @click="handleSaveButton"
          :loading="loading"
          :disabled="loading"
        >
          <slot name="saveButton"> </slot>
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
      console.log('watch')
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


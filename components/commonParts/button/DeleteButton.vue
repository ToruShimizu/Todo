<template>
  <div>
    <Loading>
      <template v-slot:loading>
        <v-btn
          color="red darken-1"
          outlined
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
import Loading from '@/components/commonParts/button/Loading/'

export default {
  components: {
    Loading
  },
  props: {
    title: String,
    icon: String,
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
    handleDeleteButton() {
      this.$emit('delete-button')
    }
  }
}
</script>
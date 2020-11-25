<template>
  <div>
    <Loading>
      <template v-slot:loading>
        <v-btn
          height="48px"
          outlined
          width="100%"
          class="text-capitalize caption"
          style="border-color: #979797"
          tile
          @click="login"
          :loading="loading"
          :disabled="loading"
        >
          <v-icon>{{ icon }}</v-icon>
          {{ title }}
          <slot name="icon"></slot>
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
    login() {
      this.$emit('login')
    },
    stopLoading() {
      this.$emit('stop-loading')
    }
  }
}
</script>


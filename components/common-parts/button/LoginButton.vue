<template>
  <div>
    <v-btn
      height="48px"
      outlined
      width="100%"
      class="text-capitalize caption"
      style="border-color: #979797"
      tile
      @click="login"
      :loading="loading"
    >
      <v-icon>{{ icon }}</v-icon>
      {{ title }}
      <slot name="icon"></slot>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    title: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    login() {
      this.$emit('login')
    }
  }
}
</script>

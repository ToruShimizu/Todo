<template>
  <v-btn
    height="48px"
    outlined
    width="100%"
    class="text-capitalize caption"
    style="border-color: #979797"
    tile
    @click="login"
  >
    <slot name="icon"></slot>
  </v-btn>
</template>

<script>
export default {
  methods: {
    login() {
      this.$emit('login')
    }
  }
}
</script>
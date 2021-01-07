<template>
  <v-text-field
    v-model="innerDetail"
    label="詳細"
    prepend-inner-icon="mdi-briefcase-outline"
    clearable
  />
</template>
<script>
export default {
  props: {
    detail: {
      type: String,
      default: ''
    }
  },
  computed: {
    innerDetail: {
      get() {
        return this.detail
      },
      set(detail) {
        this.$emit('update:detail', detail)
      }
    }
  }
}
</script>

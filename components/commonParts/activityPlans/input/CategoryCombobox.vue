<template>
  <v-combobox
    ref="category"
    v-model="innerCategory"
    prepend-inner-icon="mdi-pencil-outline"
    :items="items"
    label="やること"
    persistent-hint
    :rules="categoryRules"
    hint="文字入力の場合はEnterキーを押してください"
  />
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    category: {
      type: '',
      required: false,
      default: ''
    }
  },
  computed: {
    innerCategory: {
      get() {
        return this.category
      },
      set(category) {
        this.$emit('update:category', category)
      }
    }
  },
  data() {
    return {
      categoryRules: [(v) => v.length > 0 || 'カテゴリは必須です']
    }
  }
}
</script>
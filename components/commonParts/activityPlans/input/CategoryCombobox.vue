<template>
  <v-combobox
    ref="category"
    v-model="innerCategory"
    prepend-inner-icon="mdi-pencil-outline"
    :items="items"
    label="やること"
    persistent-hint
    hint="文字入力の場合はEnterキーを押してください"
    :rules="[validRules.categoryRules.required]"
  />
</template>

<script>
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],

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
  }
}
</script>
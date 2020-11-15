<template>
  <v-col cols="8" sm="8" md="8">
    <v-text-field
      v-model="innnerSearchPlanContentsCategory"
      prepend-inner-icon="mdi-magnify"
      label="カテゴリ検索"
      clearable
    ></v-text-field>
  </v-col>
</template>

<script>
export default {
  props: {
    searchPlanContentsCategory: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    innnerSearchPlanContentsCategory: {
      get() {
        return this.searchPlanContentsCategory
      },
      set(searchPlanContentsCategory) {
        this.$emit('update:search-plan-contents-category', searchPlanContentsCategory)
      }
    }
  }
}
</script>

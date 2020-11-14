<template>
  <v-col cols="8" sm="8" md="8">
    <v-text-field
      v-model="innnerSearchPlanContentsCategorys"
      prepend-inner-icon="mdi-magnify"
      label="カテゴリ検索"
      clearable
    ></v-text-field>
  </v-col>
</template>

<script>
export default {
  props: {
    searchPlanContentsCategorys: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    innnerSearchPlanContentsCategorys: {
      get() {
        return this.searchPlanContentsCategorys
      },
      set(searchPlanContentsCategorys) {
        this.$emit('update:search-plan-contents-categorys', searchPlanContentsCategorys)
      }
    }
  }
}
</script>

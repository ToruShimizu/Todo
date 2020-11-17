<template>
  <v-col cols="7" sm="8" md="8">
    <v-combobox
      v-model="searchedCategoryKeyword"
      prepend-inner-icon="mdi-magnify"
      :items="todoCategorys"
      label="カテゴリ検索"
      clearable
      persistent-hint
      hint="文字入力の場合はEnterキーを押してください"
      @click:clear="$nextTick(() => (searchedCategoryKeyword = null))"
    />
  </v-col>
</template>

<script>
export default {
  props: {
    searchCategoryKeyword: {
      type: String,
      required: false,
      default: ''
    },
    todoCategorys: {
      type: Array
    }
  },
  computed: {
    searchedCategoryKeyword: {
      get() {
        return this.searchCategoryKeyword
      },
      set(searchedCategoryKeyword) {
        this.$emit('update:searched-category-keyword', searchedCategoryKeyword)
      }
    }
  }
}
</script>

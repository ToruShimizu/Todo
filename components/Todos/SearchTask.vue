<template>
  <v-col cols="8" sm="8" md="8">
    <v-text-field
      v-model="innerSearchTask"
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="タスクを検索する"
      clearable
    ></v-text-field>
  </v-col>
</template>

<script>
export default {
  props: {
    searchTaskKeyword: {
      type: String,
      required: false,
      default: ''
    }
  },
  computed: {
    innerSearchTask: {
      get() {
        return this.searchTaskKeyword
      },
      set(searchTaskKeyword) {
        this.$emit('update:search-task-keyword', searchTaskKeyword)
      }
    }
  }
}
</script>

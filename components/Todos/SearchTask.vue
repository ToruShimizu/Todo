<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="8">
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
  </v-row>
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
      set(value) {
        this.$emit('update:search', value)
      }
    }
  }
}
</script>

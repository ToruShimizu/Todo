<template>
  <v-row justify="center">
    <v-col cols="8">
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
    searchTask: {
      type: String
    }
  },
  computed: {
    innerSearchTask: {
      get() {
        return this.$props.searchTask
      },
      set(value) {
        console.log(value)
        this.$emit('update:search', value)
      }
    }
  }
}
</script>

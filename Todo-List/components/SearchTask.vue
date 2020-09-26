<template>
  <v-text-field
    v-model="innerSearchTask"
    flat
    solo-inverted
    hide-details
    prepend-inner-icon="mdi-magnify"
    label="タスクを検索する"
    clearable
  ></v-text-field>
</template>

<script>
export default {
  props: {
    searchTask: {
      type: String,
      // required: true,
    },
  },
  computed: {
    innerSearchTask: {
      get() {
        return this.$props.searchTask
      },
      set(value) {
        console.log(value)
        this.$emit('update:search', value)
      },
    },
    // handleInput: {
    //   get: function() {
    //     return this.taskfilter;
    //   },
    //   set: function(value) {
    //     this.$emit("update:filterdTask", value);
    //   }
    // }
  },
}
</script>

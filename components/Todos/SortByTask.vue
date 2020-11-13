<template>
  <v-col cols="4" sm="4" md="4">
    <v-select
      v-model="selectedSortTask"
      :items="sortTaskStates"
      label="並べ替え"
      single-line
    ></v-select>
  </v-col>
</template>

<script>
export default {
  props: {
    selectSortTask: {
      type: Array,
      required: false,
      default: () => []
    },
    sortTaskStates: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortTaskDialog: false
    }
  },
  computed: {
    selectedSortTask: {
      get() {
        return this.selectSortTask
      },
      set(selectedSortTask) {
        this.$emit('update:selected-sort-task', selectedSortTask)
      }
    }
  }
}
</script>

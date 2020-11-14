<template>
  <v-col cols="4" sm="4" md="4">
    <v-select
      v-model="selectedSortActivityPlans"
      :items="sortActivityPlansStates"
      label="並べ替え"
      single-line
    ></v-select>
  </v-col>
</template>

<script>
export default {
  props: {
    selectSortActivityPlans: {
      type: Array,
      required: false,
      default: () => []
    },
    sortActivityPlansStates: {
      type: Array,
      required: true
    }
  },
  computed: {
    selectedSortActivityPlans: {
      get() {
        return this.selectSortActivityPlans
      },
      set(selectedSortActivityPlans) {
        this.$emit('update:selected-sort-activity-plans', selectedSortActivityPlans)
      }
    }
  }
}
</script>

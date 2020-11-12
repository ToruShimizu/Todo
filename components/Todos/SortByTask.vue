<template>
  <div>
    <v-col cols="6">
      <v-select
        v-model="selectedSortTask"
        :items="items"
        item-text="state"
        item-value="abbr"
        label="並べ替え"
        return-object
        single-line
      ></v-select>
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    selectSortTask: {
      type: String,
      required: false,
      default: ''
    },
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    todosFiltered: {
      type: Array,
      required: false,
      default: () => []
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
        console.log(selectedSortTask.state)
        this.$emit('update:selected-sort-task', selectedSortTask)
      }
    }
  }
}
</script>

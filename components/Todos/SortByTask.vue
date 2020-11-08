<template>
  <div class="mt-5">
    <v-bottom-sheet v-model="sortTaskDialog" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon> <v-icon>mdi-dots-vertical</v-icon> </v-btn>
      </template>
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" text color="error" @click="sortTaskDialog = !sortTaskDialog">
          close
        </v-btn>
        <div class="py-1"><v-btn text @click="selectedSortTask = 'title'">五十音順</v-btn></div>
        <div class="py-1"><v-btn text @click="selectedSortTask = 'ascDate'">日付昇順</v-btn></div>
        <div class="py-1">
          <v-btn text @click="selectedSortTask = 'descDate'">日付降順</v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  props: {
    selectSortTask: {
      type: String
    },
    todosFiltered: {
      type: Array
    }
  },
  data() {
    return {
      sortTaskTitleOrder: 1,
      sortTaskDateOrder: 1,
      sortTaskDialog: false
    }
  },
  computed: {
    selectedSortTask: {
      get() {
        return this.selectSortTask
      },
      set(value) {
        this.$emit('update:selected', value)
      }
    }
  },
  methods: {
    sortByTask() {
      let returnvalue
      // SortByTaskコンポーネントのメソッドを呼び出す

      switch (this.selectSortTask) {
        case 'title':
          returnvalue = this.sortByTaskTitle
          console.log(this.selectSortTask)
          break
        case 'ascDate':
          returnvalue = this.sortByAscDate
          console.log(this.selectSortTask)

          break
        case 'descDate':
          returnvalue = this.sortByDescDate

          console.log(this.selectSortTask)

          break
        default:
      }
      return returnvalue
    }
  }
}
</script>

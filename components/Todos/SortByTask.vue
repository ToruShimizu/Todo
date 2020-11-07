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
    todoList: {
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
    sortByTaskTitle() {
      // 検索された状態でもソートができるように
      const todos = this.todoList
      return todos.sort((a, b) => {
        return a.task.title < b.task.title
          ? -this.sortTaskTitleOrder
          : a.task.title > b.task.title
          ? this.sortTaskTitleOrder
          : 0
      })
    },
    sortByAscDate() {
      // 検索された状態でもソートができるように
      const todos = this.todoList
      return todos.sort((a, b) => {
        return a.task.date < b.task.date
          ? -this.sortTaskDateOrder
          : a.task.date > b.task.date
          ? this.sortTaskDateOrder
          : 1
      })
    },
    sortByDescDate() {
      // 検索された状態でもソートができるように
      const todos = this.todoList
      return todos.sort((a, b) => {
        return a.task.date < b.task.date
          ? -this.sortTaskDateOrder
          : a.task.date > b.task.date
          ? this.sortTaskDateOrder
          : -1
      })
    }
  }
}
</script>

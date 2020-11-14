<template>
  <v-container style="max-width: 500px" class="mb-5">
    <v-layout>
      <!-- トータルtodos表示 -->
      <h2 class="display-1 grey--text pl-4">
        totalTodos:&nbsp;
        {{ todos.length }}
      </h2>
      <v-spacer />
      <AddTask
        :create-task.sync="task"
        :task-dialog="taskDialog"
        @open-add-task="openAddTask"
        @close-add-task="closeAddTask"
      />
    </v-layout>
    <v-divider class="mt-4" />
    <v-card class="mb-5">
      <FilteredTask :selected-task-filter.sync="taskFilter" />
      <v-divider />
      <v-layout>
        <SearchTask :search-task-keyword.sync="searchTaskKeyword" />
        <SortByTask :selected-sort-task.sync="selectSortTask" :sortTaskStates="sortTaskStates" />
      </v-layout>
      <Pagination
        :todos-page.sync="todosPage"
        @change-todos-page="changeTodosPage"
        :todos-page-length="todosPageLength"
      />
      <TaskTable :displayTodos="displayTodos" />
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AddTask from '@/components/Todos/AddTask'
import FilteredTask from '@/components/Todos/FilteredTask'
import SearchTask from '@/components/Todos/SearchTask'
import SortByTask from '@/components/Todos/SortByTask'
import Pagination from '@/components/Todos/Pagination'
import TaskTable from '@/components/Todos/TaskTable'

export default {
  middleware: 'authenticated',
  components: {
    AddTask,
    FilteredTask,
    SearchTask,
    SortByTask,
    Pagination,
    TaskTable
  },
  data() {
    return {
      task: {
        title: '',
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        done: false
      },
      taskFilter: 'all',
      searchTaskKeyword: '',
      selectSortTask: [],
      sortTaskStates: ['名前順', '日付降順↓', '日付昇順↑'],
      todosPage: 1,
      todosPageSize: 7,
      taskDialog: false,
      todosPageLength: 0,
      todoList: [],
      displayTodos: []
    }
  },
  watch: {
    todosFiltered() {
      let displayTodos = this.displayTodos
      const pageSize = this.todosPageSize
      const todos = this.todosFiltered

      displayTodos = todos.slice(0, pageSize)
      this.todosPageLength = Math.ceil(todos.length / pageSize)
      this.todosPage = 1
      this.changeTodosPage(this.todosPage)
    }
  },
  // 完了状態の絞り込み
  computed: {
    todosFiltered() {
      let returnvalue
      const todos = this.searchTask
      switch (this.taskFilter) {
        case 'all':
          returnvalue = todos

          break
        case 'active':
          returnvalue = todos.filter((todo) => !todo.done)

          break
        case 'done':
          returnvalue = todos.filter((todo) => todo.done)

          break
        default:
      }
      return returnvalue
    },
    // タスクの検索
    searchTask() {
      const todos = this.sortByTask
      const searchKeyword = this.searchTaskKeyword
      // vuetifyのclearableを使用するとnullになり表示されなくなるためnullの場合の処理を記述
      if (searchKeyword === null) {
        return todos
      }
      return todos.filter((todo) => {
        return todo.title.includes(searchKeyword)
      })
    },
    sortByTask() {
      let returnvalue
      const todos = this.todos
      switch (this.selectSortTask) {
        case '名前順':
          returnvalue = todos.slice().sort((a, b) => {
            if (a.title < b.title) return -1
          })
          break
        case '日付降順↓':
          returnvalue = todos.slice().sort((a, b) => {
            if (a.date > b.date) return -1
          })
          break
        case '日付昇順↑':
          returnvalue = todos.slice().sort((a, b) => {
            if (a.date < b.date) return -1
          })
          break
        default:
          returnvalue = todos
      }
      return returnvalue
    },
    ...mapGetters('modules/todos', ['remainingTodos', 'completedTodos']),
    ...mapState('modules/todos', ['todos'])
  },
  methods: {
    // ページ番号のボタンが押された時にページを切り替える
    changeTodosPage(pageNumber) {
      const todos = this.todosFiltered
      const pageSize = this.todosPageSize
      this.displayTodos = todos.slice(pageSize * (pageNumber - 1), pageSize * pageNumber)
    },
    openAddTask() {
      this.taskDialog = true
    },
    closeAddTask() {
      this.taskDialog = false
    }
  }
}
</script>

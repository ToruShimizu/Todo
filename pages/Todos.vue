<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex>
        <!-- トータルtodos表示 -->
        <h2 class="display-1 grey--text pl-4">
          totalTodos:&nbsp;
          {{ todos.length }}
        </h2>
      </v-flex>
      <v-flex>
        <AddTask
          :task="task"
          :task-dialog="taskDialog"
          @open-add-task="openAddTask"
          @close-add-task="closeAddTask"
        />
      </v-flex>
    </v-layout>
    <v-divider class="mt-4" />
    <v-card class="mb-5">
      <FilteredTask :selected-task-filter.sync="taskFilter" />
      <v-divider />
      <v-layout>
        <SearchTask :search-task-keyword.sync="searchTaskKeyword" />
        <SortByTask :selected-sort-task.sync="selectSortTask" :items="items" />
      </v-layout>
      <TaskTable
        :set-todos-page.sync="todosPage"
        :todos-page-size="todosPageSize"
        :todos-filtered="todosFiltered"
        :sort-by-task="sortByTask"
        @change-todos-page="changeTodosPage"
      />
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AddTask from '@/components/Todos/AddTask'
import FilteredTask from '@/components/Todos/FilteredTask'
import SearchTask from '@/components/Todos/SearchTask'
import SortByTask from '@/components/Todos/SortByTask'
import TaskTable from '@/components/Todos/TaskTable'

export default {
  middleware: 'authenticated',
  components: {
    AddTask,
    FilteredTask,
    SearchTask,
    SortByTask,
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
      selectSortTask: { state: '名前順' },
      items: [{ state: '名前順' }, { state: '日付降順↓' }, { state: '日付昇順↑' }],
      todosPage: 1,
      todosPageSize: 7,
      taskDialog: false
    }
  },
  computed: {
    todoList: {
      get() {
        // 絞り込が行われたあとのデータを使用
        const todos = this.todosFiltered
        const pageSize = this.todosPageSize
        const page = this.todosPage
        // 1ページあたりの最大表示数に合わせて切り分ける
        return todos.slice(pageSize * (page - 1), pageSize * page)
      },
      set(changeTodosPage) {
        return changeTodosPage
      }
    },
    // 完了状態の絞り込み
    todosFiltered() {
      let returnvalue
      switch (this.taskFilter) {
        case 'all':
          returnvalue = this.todos

          break
        case 'active':
          returnvalue = this.remainingTodos

          break
        case 'done':
          returnvalue = this.completedTodos

          break
        default:
      }
      return returnvalue
    },
    // タスクの検索
    searchTask() {
      let todoList = this.todoList
      const todos = this.todosFiltered
      const searchKeyword = this.searchTaskKeyword
      // vuetifyのclearableを使用するとnullになり表示されなくなるためnullの場合の処理を記述
      // nullの場合は元の値であるstateのtodosを入れて返す
      if (searchKeyword === null) {
        todoList = this.todos
        return todoList
      }
      return todos.filter((todo) => {
        return todo.title.includes(searchKeyword)
      })
    },
    sortByTask() {
      let returnvalue
      const todos = this.todosFiltered
      switch (this.selectSortTask.state) {
        case '名前順':
          returnvalue = todos.slice().sort((a, b) => {
            if (a.title < b.title) return -1
          })

          break
        case '日付降順':
          returnvalue = todos.slice().sort((a, b) => {
            if (a.date > b.date) return -1
          })

          break
        case '日付昇順':
          returnvalue = todos.slice().sort((a, b) => {
            if (a.date < b.date) return -1
          })

          break
        default:
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
      this.todoList = todos.slice(pageSize * (pageNumber - 1), pageSize * pageNumber)
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

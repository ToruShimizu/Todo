<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex>
        <!-- トータルtodos表示 -->
        <h2 class="display-1 grey--text pl-4">
          totalTodos:&nbsp;
          <span :key="`todos-${todos.length}`">{{ todos.length }}</span>
        </h2>
      </v-flex>
      <v-flex>
        <AddTask
          @close-add-task="closeAddTask"
          @open-add-task="openAddTask"
          :taskDialog="taskDialog"
        />
      </v-flex>
    </v-layout>
    <v-divider class="mt-4" />
    <v-card class="mb-5">
      <FilteredTask :filterdTask.sync="taskFilter" />
      <v-divider />
      <v-layout>
        <SearchTask :search.sync="searchTaskKeyword" />
        <SortByTask
          ref="sortByTask"
          :selected.sync="selectSortTask"
          :todosFiltered="todosFiltered"
        />
      </v-layout>
      <TaskTable
        ref="taskTable"
        :todosPage.sync="todosPage"
        :todosPageSize="todosPageSize"
        :todosFiltered="todosFiltered"
        :todoList="todoList"
        :sortByTask="sortByTask"
        :selectSortTask="selectSortTask"
        :searchTask="searchTask"
        @change-todos-page="changeTodosPage"
      />
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FilteredTask from '@/components/Todos/FilteredTask'
import SearchTask from '@/components/Todos/SearchTask'
import SortByTask from '@/components/Todos/SortByTask'
import TaskTable from '@/components/Todos/TaskTable'
import AddTask from '@/components/Todos/AddTask'

export default {
  components: {
    FilteredTask,
    SearchTask,
    SortByTask,
    AddTask,
    TaskTable
  },
  data() {
    return {
      task: {
        title: '',
        detail: '',
        date: new Date().toISOString(),
        done: false
      },
      todosPage: 1,
      todosPageSize: 7,
      searchTaskKeyword: '',
      selectSortTask: 'ascDate',
      taskFilter: 'all',
      taskDialog: false
    }
  },
  computed: {
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
        return todo.task.title.includes(searchKeyword)
      })
    },
    sortByTask() {
      let returnvalue
      const todos = this.todosFiltered
      switch (this.selectSortTask) {
        case 'title':
          // returnvalue = this.sortByTaskTitle
          returnvalue = todos.slice().sort((a, b) => {
            if (a.task.title < b.task.title) return -1
          })

          break
        case 'ascDate':
          returnvalue = todos.slice().sort((a, b) => {
            if (a.task.date > b.task.date) return -1
          })

          break
        case 'descDate':
          returnvalue = todos.slice().sort((a, b) => {
            if (a.task.date < b.task.date) return -1
          })

          break
        default:
      }
      return returnvalue
    },
    ...mapGetters('modules/todos', ['todosCount', 'remainingTodos', 'completedTodos']),
    ...mapState('modules/todos', ['todos'])
  },
  methods: {
    // ページ番号のボタンが押された時にページを切り替える
    changeTodosPage(pageNumber) {
      const todos = this.todosFiltered
      const pageSize = this.todosPageSize
      this.todoList = todos.slice(pageSize * (pageNumber - 1), todosPageSize * pageNumber)
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

<style>
a {
  text-decoration: none;
}
/* Vuetifyの仕様上スタイルが適用されてしまうため非表示にする */
.v-slide-group__prev {
  display: none !important;
}
</style>

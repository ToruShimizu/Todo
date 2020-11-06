<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex>
        <!-- トータルtodos表示 -->
        <h2 class="display-1 grey--text pl-4">
          totalTodos:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`todos-${todos.length}`">{{ todos.length }}</span>
          </v-fade-transition>
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
        <SortByTask ref="sortByTask" :selected.sync="selectSortTask" :searchTask="searchTask" />
      </v-layout>
      <TaskTable
        ref="taskTable"
        :sortByTask="sortByTask"
        :todosPage.sync="todosPage"
        :todosPageSize="todosPageSize"
        :todosFiltered="todosFiltered"
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
    todoList: {
      get() {
        // 絞り込が行われたあとのデータを使用
        const todos = this.todosFiltered()
        // 1ページあたりの最大表示数に合わせて切り分ける
        return todos.slice(
          this.todosPageSize * (this.todosPage - 1),
          this.todosPageSize * this.todosPage
        )
      },
      set(changeTodosPage) {
        return changeTodosPage
      }
    }
  },
  methods: {
    // 完了状態の絞り込み
    todosFiltered() {
      let returnvalue
      const todos = this.todos
      switch (this.taskFilter) {
        case 'all':
          returnvalue = todos
          console.log(this.taskFilter)
          break
        case 'active':
          returnvalue = todos.filter((todo) => !todo.task.done)
          console.log(this.taskFilter)

          break
        case 'done':
          returnvalue = todos.filter((todo) => todo.task.done)
          console.log(this.taskFilter)

          break
        default:
      }
      return returnvalue
    },
    // タスクの検索
    searchTask() {
      // vuetifyのclearableを使用するとnullになり表示されなくなるためnullの場合の処理を記述
      // nullの場合は元の値であるstateのtodosを入れて返す
      if (this.searchTaskKeyword === null) {
        this.todoList = this.todos
        return this.todoList
      }
      return this.todoList.filter((todo) => {
        return todo.task.title.includes(this.searchTaskKeyword)
      })
    },
    sortByTask() {
      let returnvalue
      // SortByTaskコンポーネントのメソッドを呼び出す
      const ref = this.$refs.sortByTask

      switch (this.selectSortTask) {
        case 'title':
          returnvalue = ref.sortByTaskTitle()
          console.log(this.selectSortTask)
          break
        case 'ascDate':
          returnvalue = ref.sortByAscDate()
          console.log(this.selectSortTask)

          break
        case 'descDate':
          returnvalue = ref.sortByDescDate()

          console.log(this.selectSortTask)

          break
        default:
      }
      return returnvalue
    },
    // ページ番号のボタンが押された時にページを切り替える
    changeTodosPage(pageNumber) {
      const todos = this.todosFiltered()
      this.todoList = todos.slice(
        this.todosPageSize * (pageNumber - 1),
        this.todosPageSize * pageNumber
      )
      console.log(pageNumber)
      console.log('page', this.todosPage)
    },
    openAddTask() {
      this.taskDialog = true
    },
    closeAddTask() {
      this.task.title = ''
      this.task.detail = ''
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

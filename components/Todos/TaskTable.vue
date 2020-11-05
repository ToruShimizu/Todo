<template>
  <v-app>
    <v-card>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">状態</th>
              <th class="text-left">タスク</th>
              <th class="text-left">日時</th>
              <th class="text-left">削除</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="todo in displayTodos">
              <transition name="list" :key="todo.task.title">
                <tr>
                  <td>
                    <v-btn icon @click="doneTask(todo)">
                      <v-icon :class="(!todo.task.done && 'grey--text') || 'primary--text'"
                        >mdi-check-circle-outline</v-icon
                      >
                    </v-btn>
                  </td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <td
                        v-bind="attrs"
                        :class="(todo.task.done && 'grey--text') || 'primary--text'"
                        v-on="on"
                        @click="openUpdateTask(todo)"
                      >
                        {{ todo.task.title }}
                      </td>
                    </template>
                    <span>{{ todo.task.title }}の詳細を開く</span>
                  </v-tooltip>
                  <td :class="(todo.task.done && 'grey--text') || 'black--text'" class="pa-0">
                    {{ todo.task.date }}
                  </td>
                  <td>
                    <v-btn icon>
                      <v-icon @click="removeTask(todo)">mdi-delete-outline</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </transition>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <div class="text-center py-2">
      <v-pagination v-model="todosPage" :length="todosPageCount" @input="changeTodosPage" />
    </div>
    <UpdateTask
      :editTodo="editTodo"
      :updateTaskDialog="updateTaskDialog"
      @close-update-task="closeUpdateTask"
      @cancel-update-task="cancelUpdateTask"
    />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import UpdateTask from '@/components/Todos/UpdateTask.vue'
export default {
  components: {
    UpdateTask
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        title: '',
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        done: false
      })
    },
    searchTaskKeyword: {
      type: String
    },
    selectSortTask: {
      type: String
    },
    sortTaskDateOrder: {
      type: Number
    },
    sortTaskTitleOrder: {
      type: Number
    },
    taskFilter: {
      type: String
    }
  },
  data() {
    return {
      headers: [
        { text: '状態', align: 'start', sortable: false, value: 'task.done' },
        {
          text: 'タスク',
          sortable: false,
          value: 'task.title'
        },
        { text: '期限', value: 'task.date', search: false },
        { text: '削除', value: 'remove', sortable: false }
      ],
      todosPage: 1,
      todosPageSize: 7,
      editTodo: null,
      cancelTodo: null,
      updateTaskDialog: false
    }
  },
  computed: {
    displayTodos() {
      return this.sortByTask()
    },
    todoList: {
      get() {
        return this.todos.slice(
          this.todosPageSize * (this.todosPage - 1),
          this.todosPageSize * this.todosPage
        )
      },
      set(changeTodos) {
        return changeTodos
      }
    },
    todosPageCount() {
      return Math.ceil(this.todos.length / this.todosPageSize)
    },
    ...mapState('modules/todos', ['todos'])
  },
  methods: {
    todosFiltered() {
      // 完了状態の絞り込み
      let returnvalue
      switch (this.taskFilter) {
        case 'all':
          returnvalue = this.todoList
          console.log(this.taskFilter)
          break
        case 'active':
          returnvalue = this.todoList.filter((todo) => !todo.task.done)
          console.log(this.taskFilter)

          break
        case 'done':
          returnvalue = this.todoList.filter((todo) => todo.task.done)
          console.log(this.taskFilter)

          break
        default:
      }
      return returnvalue
    },
    // 選択されたpageNumberによって表示するページを切り替える
    changeTodosPage(pageNumber) {
      this.todoList = this.todos.slice(
        this.todosPageSize * (pageNumber - 1),
        this.todosPageSize * pageNumber
      )
    },
    searchTask() {
      const todos = this.todosFiltered()
      return todos.filter((todo) => {
        return todo.task.title.includes(this.searchTaskKeyword)
      })
      //   // vuetifyのclearableを使用するとnullになり表示されなくなるためnullの場合の処理を記述
    },
    sortByTask() {
      let returnvalue

      switch (this.selectSortTask) {
        case 'title':
          returnvalue = this.sortByTaskTitle()
          console.log(this.selectSortTask)
          break
        case 'ascDate':
          returnvalue = this.sortByAscDate()
          console.log(this.selectSortTask)

          break
        case 'descDate':
          returnvalue = this.sortByDescDate()

          console.log(this.selectSortTask)

          break
        default:
      }
      return returnvalue
    },
    sortByTaskTitle() {
      const todos = this.searchTask()
      return todos.sort((a, b) => {
        return a.task.title < b.task.title
          ? -this.sortTaskTitleOrder
          : a.task.title > b.task.title
          ? this.sortTaskTitleOrder
          : 0
      })
    },
    sortByAscDate() {
      const todos = this.searchTask()
      return todos.sort((a, b) => {
        return a.task.Date < b.task.Date
          ? -this.sortTaskDateOrder
          : a.task.Date > b.task.Date
          ? this.sortTaskDateOrder
          : 0
      })
    },
    sortByDescDate() {
      const todos = this.searchTask()
      return todos.sort((a, b) => {
        return a.task.Date < b.task.Date
          ? -this.sortTaskDateOrder
          : a.task.Date > b.task.Date
          ? this.sortTaskDateOrder
          : -1
      })
    },
    removeTask(todo) {
      if (!confirm(todo.task.title + 'を削除しますか？')) return
      this.$store.dispatch('modules/todos/removeTask', { id: todo.task.id })
    },
    doneTask(todo) {
      this.$store.dispatch('modules/todos/doneTask', {
        todo,
        id: todo.task.id
      })
    },
    async openUpdateTask(todo) {
      const id = String(todo.task.id)
      await this.$store.dispatch('modules/todos/fetchComments', id)
      this.editTodo = todo
      this.updateTaskDialog = true
      console.log(this.editTodo)
    },
    closeUpdateTask() {
      this.updateTaskDialog = false
    },
    // FIXME キャンセル時の処理はあとで記述
    cancelUpdateTask() {
      this.updateTaskDialog = false
    }
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.8s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
.list-move {
  transition: transform 0.5s;
}
</style>

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
      <v-pagination v-model="todosPageNumber" :length="todosPageCount" @input="changeTodosPage" />
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
    sortByTask: {
      type: Function
    },
    todosPage: {
      type: Number
    },
    todosPageSize: {
      type: Number
    },
    todosFiltered: {
      type: Function
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
      editTodo: null,
      cancelTodo: null,
      updateTaskDialog: false
    }
  },
  computed: {
    displayTodos() {
      return this.sortByTask()
    },
    todosPageNumber: {
      get() {
        return this.todosPage
      },
      set(todosPage) {
        this.$emit('update:todosPage', todosPage)
      }
    },
    todosPageCount() {
      const todos = this.todosFiltered()
      return Math.ceil(todos.length / this.todosPageSize)
    },
    ...mapState('modules/todos', ['todos'])
  },
  methods: {
    // 選択されたpageNumberによって表示するページを切り替える
    changeTodosPage(pageNumber) {
      this.$emit('change-todos-page', pageNumber)
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
      await this.$store.dispatch('modules/comment/fetchComments', id)
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

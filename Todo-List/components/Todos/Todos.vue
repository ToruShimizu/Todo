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
        <v-dialog
          v-model="taskDialog"
          persistent
          max-width="600px"
          transition="scroll-y-transition"
        >
          <AddTask @close-add-task="closeTaskDialog" />
        </v-dialog>

        <v-btn color="primary" dark class="hidden-xs-only" @click="openAddTask">
          <v-icon>mdi-pen-plus</v-icon>タスクを追加する
        </v-btn>
        <v-btn color="primary" dark class="hidden-sm-and-up">
          <v-icon>mdi-pen-plus</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-divider class="mt-4" />

    <v-card v-if="todos.length > 0">
      <FilteredTask @update:filterdTask="taskFilter = $event" />
      <v-divider />
    
          <SearchTask :search.sync="searchTask" />
 
      <v-data-table
        :headers="headers"
        :items="todoList"
        :items-per-page="itemsPerPage"
        :search="searchTask"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:body="props">
          <tbody name="list" is="transition-group">
            <template>
              <tr v-for="(todo, index) in props.items" :key="index">
                <v-dialog
                  v-model="updateTaskDialog"
                  persistent
                  max-width="600px"
                  transition="scroll-y-transition"
                >
                  <UpdateTask
                    :editTodo="editTodo"
                    :updateTaskDialog="updateTaskDialog"
                    @close-update-task="closeUpdateTask(todo)"
                  />
                </v-dialog>
                <td>
                  <v-btn icon @click="doneTask(todo)">
                    <v-icon :color="(!todo.task.done && 'grey') || 'primary'"
                      >mdi-check-circle-outline</v-icon
                    >
                  </v-btn>
                </td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <td
                      v-bind="attrs"
                      :class="(todo.task.done && 'grey--text') || 'primary--text'"
                      class="ml-2"
                      v-on="on"
                      @click="openUpdateTask(todo)"
                    >
                      {{ todo.task.title }}
                    </td>
                  </template>
                  <span>{{ todo.task.title }}の詳細を開く</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <td :class="(todo.task.done && 'grey--text') || 'black--text'">
                      {{ todo.task.date }}
                      <v-icon
                        v-if="task.date > todo.task.date"
                        v-bind="attrs"
                        :class="(todo.task.done && 'grey--text') || 'red--text'"
                        v-on="on"
                        >mdi-alert-outline</v-icon
                      >
                    </td>
                  </template>
                  <span>期限が切れています</span>
                </v-tooltip>
                <td>
                  <v-btn icon>
                    <v-icon @click="removeTask(todo)">mdi-delete-outline</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>
          </tbody>
        </template>
      </v-data-table>
      <div class="text-center py-2">
        <v-pagination v-model="page" :length="pageCount" />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FilteredTask from '@/components/FilteredTask'
import SearchTask from '@/components/SearchTask'
import AddTask from '@/components/Task/AddTask'
import UpdateTask from '@/components/Task/UpdateTask'

export default {
  components: {
    FilteredTask,
    SearchTask,
    AddTask,
    UpdateTask
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        title: '',
        detail: '',
        date: new Date().toISOString(),
        done: false
      })
    }
  },

  data() {
    return {
      cancel: null,
      editTodo: null,
      taskFilter: 'all',
      searchTask: '',
      taskDialog: false,
      updateTaskDialog: false,
      headers: [
        { text: '状態', align: 'start', sortable: false, value: 'task.done' },
        {
          text: 'タスク',
          sortable: false,
          value: 'task.title'
        },
        { text: '期限', value: 'task.date' },
        { text: '削除', value: 'remove', sortable: false }
      ],
      itemsPerPage: 7,
      page: 1,
      pageCount: 0
    }
  },
  computed: {
    todoList() {
      return this.todosFiltered()
    },
    // タスク検索
    ...mapGetters('modules/todos', ['todosCount']),
    ...mapState('modules/todos', ['todos'])
  },
  methods: {
    removeTask(todo) {
      if (!confirm(todo.task.title + 'を削除しますか？')) return
      this.$store.dispatch('modules/todos/removeTask', { id: todo.task.id })
    },
    // FIXME:アーカイブに移す
    toggleRemoveSwitch(todo) {
      this.$store.dispatch('modules/todos/toggleRemoveSwitch', {
        todo,
        id: todo.id
      })
      if (todo.task.done === true && todo.task.autoRemoveSwitch === false) {
        setTimeout(
          function () {
            if (confirm(todo.task.title + 'を削除しますか？')) {
              this.$store.dispatch('modules/todos/removeTask', { id: todo.id })
            } else {
              // FIXME: setTimeoutを解除する
              this.$store.dispatch('modules/todos/toggleRemoveSwitch', {
                todo,
                id: todo.id
              })
            }
          }.bind(this),
          4000
        )
      }
    },
    doneTask(todo) {
      this.$store.dispatch('modules/todos/doneTask', {
        todo,
        id: todo.task.id
      })
      // FIXME:アーカイブに移す
      if (todo.task.done === false && todo.task.autoRemoveSwitch === true) {
        setTimeout(
          function () {
            if (confirm(todo.task.title + 'を削除しますか？')) {
              this.$store.dispatch('modules/todos/removeTask', { id: todo.id })
            } else {
              // FIXME:setTimeoutを解除する
              this.$store.dispatch('modules/todos/toggleRemoveSwitch', {
                todo,
                id: todo.id
              })
            }
          }.bind(this),
          5000
        )
      }
    },
    openAddTask() {
      this.taskDialog = true
    },
    openUpdateTask(todo) {
      const id = String(todo.task.id)
      this.$store.dispatch('modules/todos/fetchComments', id)
      this.editTodo = todo
      this.updateTaskDialog = true
    },
    closeTaskDialog() {
      this.task.title = ''
      this.task.detail = ''
      this.taskDialog = false
    },
    closeUpdateTask() {
      this.updateTaskDialog = false
    },
    todosFiltered() {
      // 完了状態の絞り込み
      let returnvalue
      switch (this.taskFilter) {
        case 'all':
          returnvalue = this.todos
          break
        case 'active':
          returnvalue = this.todos.filter((todo) => !todo.task.done)

          break
        case 'done':
          returnvalue = this.todos.filter((todo) => todo.task.done)

          break
        default:
      }
      return returnvalue
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
tr {
  display: table-row;
}
a {
  text-decoration: none;
}
/* Vuetifyの仕様上スタイルが適用されてしまうため非表示にする */
.v-slide-group__prev {
  display: none !important;
}
</style>

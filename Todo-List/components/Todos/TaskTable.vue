<template>
  <v-app>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="todosFiltered"
        :items-per-page="itemsPerPage"
        :search="searchTask"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
        item-key="name"
        class="elevation-1"
      >
        <template v-slot:body="{ items }">
          <tbody name="list" is="transition-group">
            <tr v-for="todo in items" :key="todo.task.title">
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
              <td :class="(todo.task.done && 'grey--text') || 'black--text'">
                {{ todo.task.date }}
              </td>
              <td>
                <v-btn icon>
                  <v-icon @click="removeTask(todo)">mdi-delete-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-center py-2">
      <v-pagination v-model="page" :length="pageCount" />
    </div>
    <UpdateTask
      :editTodo="editTodo"
      :updateTaskDialog="updateTaskDialog"
      @close-update-task="closeUpdateTask"
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
    todosFiltered: {
      type: Array,
      required: true
    },
    searchTask: {
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
      itemsPerPage: 7,
      page: 1,
      pageCount: 0,
      editTodo: null,
      cancelTodo: null,
      updateTaskDialog: false
    }
  },
  computed: {
    ...mapState('modules/todos', ['todos'])
  },
  methods: {
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
    openUpdateTask(todo) {
      const id = String(todo.task.id)
      this.$store.dispatch('modules/todos/fetchComments', id)
      this.editTodo = todo
      this.updateTaskDialog = true
      console.log(this.editTodo)
    },
    closeUpdateTask() {
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
tr {
  display: table-row;
}
</style>

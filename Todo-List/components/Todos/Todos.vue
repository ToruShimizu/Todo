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
    <v-card v-if="todos.length > 0">
      <FilteredTask @update:filterdTask="taskFilter = $event" />
      <v-divider />
      <SearchTask :search.sync="searchTask" />
      <TaskTable :searchTask="searchTask" :todosFiltered="todosFiltered" />
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FilteredTask from '@/components/FilteredTask'
import SearchTask from '@/components/SearchTask'
import TaskTable from '@/components/TaskTable'
import AddTask from '@/components/Task/AddTask'

export default {
  components: {
    FilteredTask,
    SearchTask,
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
      taskFilter: 'all',
      searchTask: '',
      taskDialog: false
    }
  },
  computed: {
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
    },
    ...mapGetters('modules/todos', ['todosCount']),
    ...mapState('modules/todos', ['todos'])
  },
  methods: {
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

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
        <AddTask />
      </v-flex>
    </v-layout>

    <v-divider class="mt-4" />

    <v-card v-if="todos.length > 0">
        <!-- 完了、未完了のタブ切り替え -->
        <v-tabs>
          <v-tab @click="taskFilter = 'all'">すべて:{{ todos.length }}</v-tab>

          <v-divider vertical />

          <v-tab @click="taskFilter = 'active'">未完了:{{ remainingTodos }}</v-tab>

          <v-divider vertical />

          <v-tab @click="taskFilter = 'done'">
            完了: {{ completedTodos }}/{{todos.length}}
            <!-- 完了率の表示 -->
            <v-progress-circular
              :value="progress"
              :rotate="270"
              :size="45"
              class="ml-1"
              color="success"
            >{{progress}}</v-progress-circular>
          </v-tab>
        </v-tabs>
                  <v-divider  />

            <v-divider  />

      <v-list>
            <v-list-item v-for="todo in todosFiltered" :key="todo.id">
              <!-- 完了、未完了切り替えチェックボックス -->
              <v-btn icon>
                <v-icon
                  :color="(!todo.done && 'grey') || 'primary'"
                  @click="doneTask(todo)"
                >mdi-check-circle-outline</v-icon>
              </v-btn>
              <v-list-item-content>
                <v-list-item-title
                  @click="openTask(todo)"
                  :class="(todo.done && 'grey--text') || 'primary--text'"
                  class="ml-2"
                >{{ todo.title }}</v-list-item-title>
                <!-- 編集用のテキストエリア -->
              </v-list-item-content>
              <!-- 削除ボタン -->
              <v-btn icon>
                <v-icon @click="removeTask(todo.id)">mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import AddTask from "@/components/AddTask";
import Detail from "@/components/Detail";
// import UpdateTask from "@/components/UpdateTask"

export default {
  components: {
    AddTask,
    Detail
    // UpdateTask
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      time: '',
      taskFilter: 'all',
      searchTask: '',
      editTitle: '',
      editDetail: '',
      editDate: '',
      editTime: '',
      detailTask: false,
      selectDate: false,
      selectTime: false
    };
  },
    created() {
    this.$store.dispatch('fetchTodos')
  },
  computed: {
    todosFiltered() {
      // タスク検索
      let arr = [];
      let data = this.todos;
      if (this.searchTask) {
        data.forEach(el => {
          if (
            el.task.toLowerCase().indexOf(this.searchTask.toLowerCase()) >= 0
          ) {
            arr.push(el);
          }
        });
        return arr;
      }
      // 完了状態の絞り込み
      else if (this.taskFilter == "all") {
        return this.todos;
      } else if (this.taskFilter == "active") {
        return this.todos.filter(todo => !todo.done);
      } else if (this.taskfilter == "done")
        return this.todos.filter(todo => todo.done);
    },
    ...mapGetters([
      "completedTodos",
      "progress",
      "remainingTodos",
      "todosCount",
    ]),
    ...mapState(["todos"])
  },

  methods: {
     removeTask(id) {
      if (!confirm('Are you sure?')) return

      this.$store.dispatch('removeTask', { id })
      .then(() => {
        setTimeout(() => {
          this.$store.dispatch('fetchTodos')
        }, 1000)
      })
  },

    doneTask(todo) {
      this.$store.dispatch("doneTask", todo);
    },
    openTask(todo) {
      this.detailTask = true
      this.editTitle = todo.title
      this.editDetail = todo.detail
      this.editDate = todo.date
      this.editTime = todo.time
    },
    updateTask(todo) {
      this.$store.dispatch('updateTask', todo)
      todo.title = this.editTitle
      todo.detail = this.editDetail
      todo.date = this.editDate
      todo.time = this.editTime
      this.detailTask = false
    }
  }
    // ...mapActions(['doneTask'])
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

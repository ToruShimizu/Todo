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
           <nuxt-link :to="{ name: 'edit-id', }">

         <v-btn color="primary" dark  class="hidden-xs-only">タスクを追加する</v-btn>
              </nuxt-link>
        <v-btn color="primary" dark class="hidden-sm-and-up">
          <v-icon>mdi-pen-plus</v-icon>
        </v-btn>
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
      <v-divider />
      <v-divider />
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
              :class="(todo.done && 'grey--text') || 'primary--text'"
              class="ml-2"
            >
              <nuxt-link :to="{ name: 'edit-id',params:{
              id: todo.id}}">
              {{ todo.task.title }}
              </nuxt-link>
            </v-list-item-title>
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
import { mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      taskFilter: 'all',
    }
  },
  computed: {
    todosFiltered() {
      // タスク検索
      let arr = []
      let data = this.todos
      if (this.searchTask) {
        data.forEach((el) => {
          if (
            el.task.title.toLowerCase().indexOf(this.searchTask.toLowerCase()) >= 0
          ) {
            arr.push(el)
          }
        })
        return arr
      }
      // 完了状態の絞り込み
      else if (this.taskFilter == 'all') {
        return this.todos
      } else if (this.taskFilter == 'active') {
        return this.todos.filter((todo) => !todo.done)
      } else if (this.taskfilter == 'done')
        return this.todos.filter((todo) => todo.done)
    },
    ...mapGetters([
      'completedTodos',
      'progress',
      'remainingTodos',
      'todosCount',
    ]),
    ...mapState(['todos']),
  },

  methods: {
    removeTask(id) {
      if (!confirm('Are you sure?'))return
      this.$store.dispatch('removeTask', { id })
    },

    doneTask(todo) {
      this.$store.dispatch('doneTask', todo)
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
a {
  text-decoration: none;
}
</style>

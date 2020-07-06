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

    <!-- タスク検索入力エリア -->
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-if="todos.length > 0"
        v-model="searchTask"
        label="タスクを検索する"
        prepend-inner-icon="mdi-pencil-plus-outline"
        persistent-hint
      />
    </v-col>

    <v-card v-if="todos.length > 0">
      <v-list>
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

        <v-divider class="mb-4" />

        <v-slide-y-transition class="py-0" group tag="v-list">
          <template v-for="(item, i) in todosFiltered">

            <v-divider v-if="i !== 0" :key="`${i}-divider`" />

            <v-list-item :key="`${i}-${item.task}`">
              <!-- 完了、未完了切り替えチェックボックス -->
              <v-checkbox
                :checked="item.done"
                :color="(item.done && 'grey') || 'primary'"
                @change="toggleDone(item)"
              />
              <v-list-item-content>
                <v-list-item-title
                  v-if="!item.editEditing"
                  :class="(item.done && 'grey--text') || 'primary--text'"
                  class="ml-4"
                >{{ item.task }}</v-list-item-title>

                <!-- 編集用のテキストエリア -->
                <v-text-field
                  v-else
                  v-model="item.editTask"
                  label="タスクを変更する"
                  outlined
                  dense
                  @blur="addEditTask(item)"
                  @keyup.enter="addEditTask(item)"
                  @keyup.esc="cancelEdit(item)"
                />
              </v-list-item-content>

              <v-spacer />

              <!-- 編集用ボタン -->
              <v-btn icon>
                <v-icon @click="taskEdit(item)" bottom>mdi-lead-pencil</v-icon>
              </v-btn>

              <!-- 削除ボタン -->
              <v-btn icon>
                <v-icon @click="removeTask(item)">mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item>
          </template>
        </v-slide-y-transition>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import AddTask from '@/components/AddTask'

export default {
  components: {
    AddTask
  },
  props: {},
  data() {
    return {
      task: '',
      editEditing: false,
      editTask: '',
      taskFilter: 'all',
      searchTask: '',
    }
  },

  computed: {
    todosFiltered() {
      // タスク検索
      let arr = []
      let data = this.todos
      if (this.searchTask.length > 0) {
        data.forEach(el => {
          if (
            el.task.toLowerCase().indexOf(this.searchTask.toLowerCase()) >= 0
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
        return this.todos.filter(todo => !todo.done)
      } else if (this.taskfilter == 'done')
        return this.todos.filter(todo => todo.done)
    },
    ...mapGetters([
      'completedTodos',
      'progress',
      'updateTodo',
      'remainingTodos',
      'todosCount',
      'userName',
      'photoURL'
    ]),
    ...mapActions([]),
    ...mapState(['todos'])
  },

  methods: {
    removeTask(item) {
      if (confirm(item.task + 'を削除しますか？'))
        this.$store.dispatch('removeTask', item)
    },
    toggleDone(item) {
      this.$store.dispatch('toggleDone', item)
    },
    taskEdit(item) {
      item.editEditing = true
      this.beforeEditCache = item.task
      item.editTask = item.task
    },
    addEditTask(item) {
      this.$store.dispatch('addEditTask', item)
      item.editEditing = false
      item.done = false
    },
    cancelEdit(item) {
      item.task = this.beforeEditCache
      item.editEditing = false
    },
  }
}
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

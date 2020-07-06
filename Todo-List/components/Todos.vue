<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex>
        <!-- タスク追加テキストエリア -->
            <AddTask />


        <!-- タスク検索テキストエリア -->
        <v-text-field
          v-if="todos.length > 0"
          v-model="task"
          label="タスクを検索する"
          prepend-inner-icon="mdi-magnify"
          persistent-hint
          outlined
          @blur="cancelSerchTask"
        />
      </v-flex>
      <v-flex mt-1 ml-2>
        <!-- 送信ボタン -->
        <transition name="fade">

          <v-btn
            v-if="taskExists"
            type="submit"
            color="success"
            @click="addTask"
            value="add"
            bottom
          >
            <v-icon >mdi-pen-plus</v-icon>
          <span>add</span>
          </v-btn>
        </transition>
        <!-- 検索ボタン -->
        <v-btn v-if="todos.length > 0" @click="searchTask">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn v-if="searchKeyword" @click="cancelSerchTask">
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <h2 class="display-1 grey--text pl-4">
      totalTodos:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`todos-${todos.length}`">{{ todos.length }}</span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4" />

    <v-card v-if="todos.length > 0">
      <v-list>
        <!-- 完了、未完了のタブ切り替え -->
        <v-tabs>
          <v-tab @click="taskFilter = 'all'">
            すべて:{{ todos.length }}
          </v-tab>
          <v-divider vertical />

          <v-tab @click="taskFilter = 'active'">
            未完了:{{ remainingTodos }}
          </v-tab>
          <v-divider vertical />

          <v-tab @click="taskFilter = 'done'">
            完了: {{ completedTodos }}/{{todos.length}}

            <!-- 完了率の表示 -->
            <v-progress-circular
              :value="progress"
              :rotate="270"
              :size="45"
              class="ml-1 "
              color="success"
            > {{progress}}</v-progress-circular>
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
                >
                  {{ item.task }}
                </v-list-item-title>

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
              <v-btn icon >
              <v-icon @click="taskEdit(item)" bottom>
                mdi-lead-pencil
              </v-icon>
              </v-btn>

              <!-- 削除ボタン -->
              <v-btn icon >
              <v-icon @click="removeTask(item)">
                mdi-delete-outline
              </v-icon>
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
  data() {
    return {
      done: false,
      editEditing: false,
      editTask: '',
      taskFilter: 'all',
      searchKeyword: false
    }
  },

  computed: {
    taskExists() {
      if (!this.searchKeyword) return this.task.length > 0

    },
    todosFiltered() {
      // タスク検索
      let arr = []
      let data = this.todos
      if(this.searchKeyword) {
        data.forEach(el => {
          if (el.task.toLowerCase().indexOf(this.task.toLowerCase()) >= 0) {
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
    addTask() {
      this.$store.dispatch('addTask', {
        task: this.task,
        done: false
      })
      this.task = ''
    },
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
    searchTask() {
      this.searchKeyword = true
    },
    cancelSerchTask() {
      this.searchKeyword = false
      this.task = ''
    }
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

<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex>
        <!-- タスク追加テキストエリア -->
        <v-text-field
          v-model="task"
          label="タスクを追加する"
          prepend-inner-icon="mdi-lead-pencil"
          @keydown.enter="addTask"
          persistent-hint
          outlined
        ></v-text-field>
        </v-flex>
      <v-flex mt-1 ml-2>
        <!-- 送信ボタン -->
        <transition name="fade">
          <v-btn
            v-if="taskExists"
            @click="addTask"
            type="submit"
            color="success"
          >
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>
        </transition>
      </v-flex>
    </v-layout>

    <h2 class="display-1 success--text pl-4">
      Todos:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`todos-${todos.length}`">{{ todos.length }}</span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-card v-if="todos.length > 0">
      <v-list>
        <!-- 完了、未完了のタブ切り替え -->
        <v-tabs>
          <v-tab @click="taskFilter = 'all'">すべて:{{ todos.length }}</v-tab>
          <v-divider vertical></v-divider>

          <v-tab name="disp" @click="taskFilter = 'active'"
            >未完了:{{ remainingTodos }}</v-tab
          >
          <v-divider vertical></v-divider>

          <v-tab name="disp" @click="taskFilter = 'done'">
            完了: {{ completedTodos }}

            <!-- 完了率の表示 -->
            <v-progress-circular
              :value="progress"
              class="ml-3"
              color="success"
            ></v-progress-circular
          ></v-tab>
        </v-tabs>

        <v-divider class="mb-4"></v-divider>
        <v-slide-y-transition class="py-0" group tag="v-list">
          <template v-for="(item, i) in todosFiltered">
            <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
            <v-list-item :key="`${i}-${item.task}`">
              <!-- 完了、未完了切り替えチェックボックス -->
              <v-checkbox
                :checked="item.done"
                @change="toggleDone(todo)"
                :color="(item.done && 'grey') || 'primary'"
              >
              </v-checkbox>
              <v-list-item-content>
                <v-list-item-title
                  :class="(item.done && 'grey--text') || 'primary--text'"
                  class="ml-4"
                  v-if="!item.editEditing"
                  >{{ item.task }}</v-list-item-title
                >

                <!-- 編集用のテキストエリア -->
                <v-text-field
                  v-else
                  v-model="item.editTask"
                  @blur="addEditTask(todo)"
                  @keyup.enter="addEditTask(todo)"
                  @keyup.esc="cancelEdit(todo)"
                  label="タスクを変更する"
                  outlined
                  dense
                ></v-text-field>
              </v-list-item-content>

              <v-spacer></v-spacer>

              <!-- 編集用ボタン -->
              <v-icon @click="taskEdit(todo)">mdi-lead-pencil</v-icon>

              <!-- 削除ボタン -->
              <v-icon @click="removeTask(todo)">mdi-delete-outline</v-icon>
            </v-list-item>
          </template>
        </v-slide-y-transition>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      task: '',
      done: false,
      editEditing: false,
      editTask: '',
      filter: 'all'
    }
  },

  computed: {
    titleExists() {
      return this.task.length > 0
    },
    todosFiltered() {
      if (this.filter == 'all') {
        return this.todos
      } else if (this.filter == 'active') {
        return this.todos.filter(todo => !todo.done)
      } else if (this.filter == 'done')
        return this.todos.filter(todo => todo.done)
    },
    // page_items () {
    //   let arr = []
    //   let data = this.todos
    //   data.forEach(element => {
    //     if(element.content.toLowerCase().indexOf(this.content.toLowerCase()) >= 0){
    //       arr.push(element)
    //     }
    //   })
    //   return arr
    // },
    ...mapGetters([
      'completedTodos',
      'progress',
      'updateTodo',
      'remainingTodos',
      'todosCount',
      'userName',
      'photoURL'
    ]),
    ...mapActions([
      
    ]),
    ...mapState(['todos'])
  },

  methods: {
  addTask () {
      this.$store.dispatch('addTask',{
        task: this.task,
        done:false
      })
      this.task = ''
   },
    removeTask(todo) {
      if (confirm( 'を削除しますか？'))
        this.$store.dispatch('removeTask', todo)
        console.log(todo)
        console.log(todo.task)
    },
    toggleDone (todo) {
      this.$store.dispatch('toggleDone', todo)
    },
    taskEdit (todo) {
      todo.editEditing = true
      this.beforeEditCache = todo.task
      todo.editTask = todo.task
    },
    addEditTask (todo) {
      this.$store.dispatch('addEditTask', todo)
      todo.editEditing = false
    },
    cancelEdit(todo) {
      todo.task = this.beforeEditCache
      todo.editEditing = false
    }
  }
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
</style>

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
        prepend-inner-icon="mdi-magnify"
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
          <template v-for="(todo, i) in todosFiltered">
            <v-divider v-if="i !== 0" :key="`${i}-divider`" />

            <v-list-item :key="`${i}-${todo.task}`">
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
                >{{ todo.task }}</v-list-item-title>
                <!-- 編集用のテキストエリア -->
              </v-list-item-content>
              <v-row justify="center">
                <v-dialog v-model="detailTask" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">EditToTask</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <!-- 日付変更エリア -->
                            <v-menu
                              ref="menu"
                              v-model="selectDate"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editDate"
                                  label="日付を変更する"
                                  prepend-icon="mdi-calendar-today"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="editDate" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="selectDate = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(editDate)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <!-- 時間変更エリア -->
                            <v-menu
                              ref="menu"
                              v-model="selectTime"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              :return-value.sync="time"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editTime"
                                  label="Picker in menu"
                                  prepend-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="selectTime"
                                v-model="editTime"
                                full-width
                                @click="$refs.menu.save(editTime)"
                              ></v-time-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <!-- タスク変更エリア -->
                            <v-text-field
                              v-model="editTask"
                              label="タスクを変更する"
                              prepend-inner-icon="mdi-pencil-outline"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12">
                            <!-- 詳細変更エリア -->
                            <v-text-field
                              v-model="editDetail"
                              label="詳細を変更する"
                              prepend-inner-icon="mdi-briefcase-outline"
                              required
                              clearable
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="detailTask = false">Close</v-btn>
                      <v-btn color="blue darken-1" text @click="updateTask(todo)">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- <v-spacer /> -->
              <!-- <updateTask :task="todo.task" :detail="todo.detail" :date="todo.date"  :time="todo.time" /> -->

              <!-- <updateTask :task="item.task" :detail="item.detail" :date="item.date" :time="item.time" @click="updateTask(todo)"/> -->

              <!-- 削除ボタン -->

              <v-btn icon>
                <v-icon @click="removeTask(todo)">mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item>
          </template>
        </v-slide-y-transition>
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
      editTask: '',
      editDetail: '',
      editDate: '',
      editTime: '',
      detailTask: false,
      selectDate: false,
      selectTime: false
    };
  },

  computed: {
    todosFiltered() {
      // タスク検索
      let arr = [];
      let data = this.todos;
      if (this.searchTask.length > 0) {
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
      "userName",
      "photoURL"
    ]),
    ...mapState(["todos"])
  },

  methods: {
    removeTask(item) {
      if (confirm(item.task + "を削除しますか？"))
        this.$store.dispatch("removeTask", item);
    },
    doneTask(todo) {
      this.$store.dispatch("doneTask", todo);
    },
    openTask(todo) {
      this.detailTask = true
      this.editTask = todo.task
      this.editDetail = todo.detail
      this.editDate = todo.date
      this.editTime = todo.time
    },
    updateTask(todo) {
      this.$store.dispatch('updateTask', todo)
      todo.task = this.editTask
      todo.detail = this.editDetail
      todo.date = this.editDate
      todo.time = this.editTime
      this.detailTask = false
    }
    // ...mapActions(['doneTask'])
  }
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

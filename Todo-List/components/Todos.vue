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
        <nuxt-link :to="{ name: 'edit-id' }">
          <v-btn color="primary" dark class="hidden-xs-only">
            <v-icon>mdi-pen-plus</v-icon>タスクを追加する
          </v-btn>
          <v-btn color="primary" dark class="hidden-sm-and-up">
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>
        </nuxt-link>
      </v-flex>
    </v-layout>

    <v-divider class="mt-4" />

    <v-card v-if="todos.length > 0">
      <FilteredTask @update:filterdTask="taskFilter = $event" />
      <v-divider />
      <v-row justify="center">
        <v-col cols="8">
          <v-layout>
            <SearchTask :search.sync="searchTask" />
            <v-spacer />
            <SortByTask :handleAscTodos="ascTodos" :handleDescTodos="descTodos" />
          </v-layout>
        </v-col>
      </v-row>

      <v-slide-y-transition class="py-0" group tag="v-list">
        <v-list v-for="(todo, i) in todoList" :key="todo.id">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <v-list-item>
            <!-- 完了、未完了切り替えチェックボックス -->
            <v-btn icon @click="doneTask(todo)">
              <v-icon :color="(!todo.done && 'grey') || 'primary'">mdi-check-circle-outline</v-icon>
            </v-btn>
            <v-list-item-content>
              <nuxt-link
                :to="{
                  name: 'edit-id',
                  params: {
                    id: todo.id
                  }
                }"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item-title
                      v-bind="attrs"
                      v-on="on"
                      :class="(todo.done && 'grey--text') || 'primary--text'"
                      class="ml-2"
                    >{{ todo.task.title }}</v-list-item-title>
                  </template>
                  <span>詳細を開く</span>
                </v-tooltip>
              </nuxt-link>
            </v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-if="task.date > todo.task.date"
                      v-bind="attrs"
                      v-on="on"
                      :class="(todo.done && 'grey--text') || 'red--text'"
                    >mdi-alert-outline</v-icon>
                  </template>
                  <span>期限が切れています</span>
                </v-tooltip>
              <!-- 編集用のテキストエリア -->


            <v-btn icon>
              <v-icon @click="removeTask(todo)">mdi-delete-outline</v-icon>
            </v-btn>
            <!-- 削除ボタン -->
          </v-list-item>
        </v-list>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import FilteredTask from "@/components/FilteredTask";
import SortByTask from "@/components/SortByTask";
import SearchTask from "@/components/SearchTask";

export default {
  props: {
    task: {
      type: Object,
      default: () => ({
        title: "",
        detail: "",
        date: new Date().toISOString(),
        done: false,
      }),
    },
  },
  components: {
    FilteredTask,
    SortByTask,
    SearchTask,
  },

  data() {
    return {
      taskFilter: "all",
      sortTask: 1,
      searchTask: "",
    };
  },
  computed: {
    todoList() {
      // FIXME: 複数メソッドの実行ができるようにする
      return this.searchTasks(), this.sortByTask(), this.todosFiltered();
    },
    // タスク検索
    ...mapGetters(["todosCount"]),
    ...mapState(["todos"]),
  },
  methods: {
    removeTask(todo) {
      if (!confirm(todo.task.title + 'を削除しますか？')) return;
      this.$store.dispatch("removeTask", { id:todo.id });
    },
    doneTask(todo) {
      this.$store.dispatch("doneTask",  {todo:todo,id: todo.id} );
    },
    sortByTask() {
      return this.todos.sort((a, b) => {
        return a.task.date < b.task.date
          ? -this.sortTask
          : a.task.date > b.task.date
          ? this.sortTask
          : 0;
      });
    },
    ascTodos() {
      this.sortTask = 1;
    },
    descTodos() {
      this.sortTask = -1;
    },
    todosFiltered() {
      // 完了状態の絞り込み
      switch (this.taskFilter) {
        case "all":
          return this.todos;

          break;
        case "active":
          return this.todos.filter((todo) => !todo.done);

          break;
        case "done":
          return this.todos.filter((todo) => todo.done);

          break;
        default:
      }
    },
    searchTasks() {
      let arr = [];
      let data = this.todos;
      data.forEach((el) => {
        if (
          el.task.title.toLowerCase().indexOf(this.searchTask.toLowerCase()) >=
          0
        )
          console.log(el.task.title);
        {
          arr.push(el);
        }
      });
      return arr;
    },
  },
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
a {
  text-decoration: none;
}
/* Vuetifyの仕様上スタイルが適用されてしまうため非表示にする */
.v-slide-group__prev {
  display: none !important;
}
</style>

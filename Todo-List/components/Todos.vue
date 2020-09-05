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
            <v-icon>mdi-pen-plus</v-icon>Add
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
        <v-col cols="8"></v-col>
      </v-row>
      <SortByTask :handleAscTodos="ascTodos" :handleDescTodos="descTodos" />
      <v-slide-y-transition class="py-0" group tag="v-list">
        <v-list v-for="(todo, i) in todoList" :key="todo.id">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <v-list-item>
            <!-- 完了、未完了切り替えチェックボックス -->
            <v-btn icon>
              <v-icon
                :color="(!todo.done && 'grey') || 'primary'"
                @click="doneTask(todo)"
                >mdi-check-circle-outline</v-icon
              >
            </v-btn>
            <v-list-item-content>
              <v-list-item-title
                :class="(todo.done && 'grey--text') || 'primary--text'"
                class="ml-2"
              >
                <nuxt-link
                  :to="{
                    name: 'edit-id',
                    params: {
                      id: todo.id
                    }
                  }"
                  >{{ todo.task.title }}</nuxt-link
                >
              </v-list-item-title>
              <!-- 編集用のテキストエリア -->
            </v-list-item-content>
            <!-- 削除ボタン -->
            <v-btn icon>
              <v-icon @click="removeTask(todo.id)">mdi-delete-outline</v-icon>
            </v-btn>
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

export default {
  components: {
    FilteredTask,
    SortByTask
  },

  data() {
    return {
      taskFilter: "all",
      sortTask: 1
    };
  },
  computed: {
    todoList() {
      return this.sortByTask();
    },

    // タスク検索
    ...mapGetters(["todosCount"]),
    ...mapState(["todos"])
  },
  methods: {
    removeTask(id) {
      if (!confirm("Are you sure?")) return;
      this.$store.dispatch("removeTask", { id });
    },
    doneTask(todo) {
      this.$store.dispatch("doneTask", { todo });
    },
    sortByTask() {
      return this.todos.sort((a, b) => {
        return a.task.title < b.task.title
          ? -this.sortTask
          : a.task.title > b.task.title
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
          return this.todos.filter(todo => !todo.done);
          break;
        case "done":
          return this.todos.filter(todo => todo.done);
          break;
        default:
      }
    }
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
a {
  text-decoration: none;
}
/* Vuetifyの仕様上スタイルが適用されてしまうため非表示にする */
.v-slide-group__prev {
  display: none !important;
}
</style>

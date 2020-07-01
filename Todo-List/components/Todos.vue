<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex>
        <!-- タスク追加テキストエリア -->
        <v-text-field
          v-model="content"
          label="タスクを追加する"
          prepend-inner-icon="mdi-map-marker"
          @keydown.enter="create"
          persistent-hint
          outlined
        ></v-text-field>
      </v-flex>
      <v-flex mt-1 ml-2>
        <!-- 送信ボタン -->
        <transition name="fade">
          <v-btn
            v-if="contentExists"
            @click="create"
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
      <!-- 完了、未完了のタブ切り替え -->
      <v-tabs>
        <v-tab name="disp" value="0" v-model="disp"
          >すべて:{{ todos.length }}</v-tab
        >
        <v-divider vertical></v-divider>

        <v-tab name="disp" value="1" v-model="disp"
          >未完了:{{ remainingTodos }}</v-tab
        >
        <v-divider vertical></v-divider>

        <v-tab name="disp" value="2" v-model="disp">
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
        <template v-for="(todo, i) in todos" >
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item :key="`${i}-${todo.content}`">
            <v-checkbox
              :checked="todo.done"
              @change="toggle(todo)"
              :color="(todo.done && 'grey') || 'primary'"
            >
            </v-checkbox>
            <v-list-item-content>
              <v-list-item-title
                :class="(todo.done && 'grey--text') || 'primary--text'"
                class="ml-4"
                v-if="!todo.editing"
                @click="editTodo(todo)"
                >{{ todo.content }}</v-list-item-title
              >
              <v-text-field
                v-else
                v-model="todo.content"
                @blur="doneEdit(todo)"
                @keyup.enter="doneEdit(todo)"
                @keyup.esc="cancelEdit(todo)"
                v-focus
                label="タスクを変更する"
                outlined
                dense
              ></v-text-field>
            </v-list-item-content>
            <v-spacer></v-spacer>
            <v-icon @click="editTodo(todo)">mdi-lead-pencil</v-icon>

            <!-- </v-list-item-action> -->
            <v-spacer></v-spacer>

            <!-- <v-scroll-x-transition>
              <v-icon v-if="todo.done" color="success">check</v-icon>
            </v-scroll-x-transition> -->

            <!-- 編集用ボタン -->

            <!-- <v-icon  @click="editTodo(todo)">mdi-lead-pencil</v-icon> -->
            <!-- 削除ボタン -->
            <v-icon @click="remove(todo)">mdi-delete-outline</v-icon>
          </v-list-item>
        </template>
      </v-slide-y-transition>

      <!-- リストの増減に応じてスライド -->
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      content: "",
      beforeEditCache:'',
      done: false,
      editing: true,
      text: "",
      disp: 0,
      title: ""
    };
  },

  computed: {
    contentExists() {
      return this.content.length > 0;
    },
    computedTodos() {
      switch (this.disp) {
        case 0:
          return this.todos;
        case 1:
          return this.remainingTodos;
        case 3:
          return this.completedTodos;
      }
    },
    ...mapGetters([
      "completedTodos",
      "progress",
      "updateTodo",
      "remainingTodos",
      "todosCount"
    ]),
     theValue: {
      get() {
        return this.$store.theValue
      },
      set(value) {
        this.$store.dispatch("setTheValue", value)
      }
    },
    ...mapState(["todos"])
  },

  methods: {
    create() {
      this.$store.dispatch("create", {
        content: this.content
      });
      this.content = "";
    },

    remove(todo) {
      if (confirm(todo.content + "を削除しますか？"))
        this.$store.dispatch("remove", todo);
    },
    toggle(todo) {
      this.$store.dispatch("toggle", todo);
    },
    editTodo(todo) {
      this.beforeEditCache = todo.content
      todo.editing = true;
    },
    doneEdit(todo) {
      if(todo.content.trim()== '') {
        todo.content = this.beforeEditCache
      }
      todo.editing = false;
    },
    candelEdit(todo) {
      todo.content = this.beforeEditCache
      todo.editing = false
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
</style>

<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex>
        <!-- <v-icon>mdi-pen-plus</v-icon> -->
        <v-text-field
          v-if="editing"
          v-model="content"
          label="タスクを追加する"
          solo
          @keydown.enter="create"
        ></v-text-field>
        <v-text-field
          v-else
          v-model="dammyContent"
          :content.sync="content"
          label="タスクを変更する"
          solo
          @keydown.enter="create"
        ></v-text-field>
      </v-flex>
      <v-flex mt-1 ml-2>
        <transition name="fade">
          <v-btn v-if="contentExists" @click="create" type="submit" color="success">
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>
        </transition>
      </v-flex>

      <v-fade-transition v-slot:append></v-fade-transition>
    </v-layout>

    <h2 class="display-1 success--text pl-4">
      Todos:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`todos-${todos.length}`">{{ todos.length }}</span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <v-tabs>
        <v-tab name="disp" value="0" v-model="disp">すべて:{{ todos.length }}</v-tab>
        <v-divider vertical></v-divider>

        <v-tab name="disp" value="1" v-model="disp">未完了:{{ remainingTodos }}</v-tab>
        <v-divider vertical></v-divider>

        <v-tab name="disp" value="2" v-model="disp">完了: {{ completedTodos }}</v-tab>
      </v-tabs>
      <div class="todo-list__header">
        <input type="radio" id="all" name="disp" value="0" v-model="disp" />
        <label for="all">All ({{todosCount}})</label>
        <input type="radio" id="notDone" name="disp" value="1" v-model="disp" />
        <label for="notDone">Not Done ({{remainingTodos}})</label>
        <input type="radio" id="done" name="disp" value="2" v-model="disp" />
        <label for="done">Done ({{completedTodos}})</label>
      </div>
      <v-divider vertical></v-divider>

      <v-spacer></v-spacer>

      <v-progress-circular :value="progress" class="mr-2" color="success"></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="todos.length > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <template v-for="(todo, i) in computedTodos" :text="todo.content">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <v-list-item :key="`${i}-${todo.content}`" :text="todo.content">
            <v-list-item-action>
              <v-checkbox
                :checked="todo.done"
                @change="toggle(todo)"
                :color="(todo.done && 'grey') || 'primary'"
              >
                <template v-slot:label>
                  <div
                    :class="(todo.done && 'grey--text') || 'primary--text'"
                    class="ml-4"
                    v-html="todo.content"
                  ></div>

                  <v-spacer></v-spacer>
                  <v-icon @click="edit">mdi-lead-pencil</v-icon>
                  <v-icon @click="remove(todo)">mdi-delete-outline</v-icon>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon v-if="todo.done" color="success">check</v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      content: '',
      done: false,
      editing: true,
      text: '',
      disp: '0'
    }
  },

  computed: {
    contentExists() {
      return this.content.length > 0
    },
    computedTodos() {
      switch (this.disp) {
        case '0':
          return this.todos
        case '1':
          return this.remainingTodos
        case '2':
          return this.completedTodos
      }
    },
    ...mapGetters([
      'completedTodos',
      'progress',
      'updateTodo',
      'remainingTodos',
      'todosCount'
    ]),
    dammyContent: {
      get() {
        return this.content
      },
      set(value) {
        this.$emit('update:title', value)
      }
    },
    ...mapState(['todos'])
  },

  methods: {
    create() {
      this.$store.dispatch('create', {
        content: this.content
      })
      this.content = ''
    },
    remove(todo) {
      if (confirm(todo.content + 'を削除しますか？'))
        this.$store.dispatch('remove', todo)
    },
    toggle(todo) {
      this.$store.dispatch('toggle', todo)
    },
    edit() {
      this.editing = !this.editing
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

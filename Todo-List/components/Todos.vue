<template>
  <v-container style="max-width: 500px">
    <v-layout>
    <v-flex>
    <!-- <v-icon>mdi-pen-plus</v-icon> -->
    <v-text-field
      v-model="content"
      label="タスクを追加する"
      solo
      @keydown.enter="create"
    >
    </v-text-field>
      </v-flex>
    <v-flex mt-1 ml-2>
      <transition name="fade">
        <v-btn v-if="contentExists"  @click="create" type="submit"  color="success">

        <v-icon>
          mdi-pen-plus
        </v-icon>
        </v-btn>
      </transition>
    </v-flex>
  
      <v-fade-transition v-slot:append>
    
      </v-fade-transition>
    </v-layout>

    <h2 class="display-1 success--text pl-4">
      Todos:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`todos-${todos.length}`">
          {{ todos.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2">
        未完了: {{ remainingTodos }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        完了: {{ completedTodos }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="todos.length > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <template v-for="(todo, i) in todos">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <v-list-item :key="`${i}-${todo.content}`">
            <v-list-item-action>
              <v-checkbox
                v-model="todo.done"
                :color="(todo.done && 'grey') || 'primary'"
              >
                <template v-slot:label>
                  <div
                    :class="(todo.done && 'grey--text') || 'primary--text'"
                    class="ml-4"
                    v-text="todo.content"
                  ></div>
                 <v-icon @click="remove(todo)">mdi-delete-outline</v-icon>
                </template>
              </v-checkbox>

            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon v-if="todo.done" color="success">
                check
              </v-icon>
            </v-scroll-x-transition>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      content: '',
      done: false
    }
   
  },

  computed: {
      contentExists () {
      return this.content.length > 0
    },
    completedTodos () {
      return this.todos.filter(task => task.done).length
    },
    progress () {
      return (this.completedTodos / this.todos.length) * 100
    },
    remainingTodos () {
      return this.todos.length - this.completedTodos
    },
      ...mapState([
      'todos'
    ]),
  },

  methods: {
    create () {
      this.$store.dispatch('create', {
        content: this.content,
        done: false,
      })
      this.content = ''
    },
     remove (todo){
      this.$store.dispatch('remove', todo)
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

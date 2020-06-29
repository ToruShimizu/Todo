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
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2">
        未完了: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">
        完了: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <template v-for="(task, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <v-list-item :key="`${i}-${task.content}`">
            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                :color="(task.done && 'grey') || 'primary'"
              >
                <template v-slot:label>
                  <div
                    :class="(task.done && 'grey--text') || 'primary--text'"
                    class="ml-4"
                    v-text="task.content"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>
              <v-icon v-if="task.done" color="success">
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
    completedTasks () {
      return this.tasks.filter(task => task.done).length
    },
    progress () {
      return (this.completedTasks / this.tasks.length) * 100
    },
    remainingTasks () {
      return this.tasks.length - this.completedTasks
    },
      ...mapState([
      'tasks'
    ]),
  },

  methods: {
    create () {
      this.$store.dispatch('create', {
        content: this.content,
        done: false,
      })
      this.content = ''
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

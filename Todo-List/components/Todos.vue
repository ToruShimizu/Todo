<template>
  <v-container style="max-width: 500px">
    <v-layout>

    <v-icon mt-3>mdi-pen-plus</v-icon>
    <v-text-field
      v-model="content"
      label="タスクを追加する"
      solo
      @keydown.enter="create"
    >
      <v-fade-transition v-slot:append>
        <v-icon v-if="task" @click="create">
          add_circle
        </v-icon>
      </v-fade-transition>
    </v-text-field>
    </v-layout>
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
      this.content = null
    }
  }
}
</script>

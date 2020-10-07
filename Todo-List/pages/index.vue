<template>
  <v-app>
    <v-container>
      <Todos />
    </v-container>
  </v-app>
</template>

<script>
import Todos from '@/components/Todos/Todos'
import { mapState, mapActions } from 'vuex'
export default {
  middleware: 'authenticated',
  components: {
    Todos,
  },
  created() {
    this.fetchTodos();
  },
  data() {
    return {
      task: {
        title: '',
        detail: '',
        date: [new Date().toISOString().substr(0, 10)],
        done: false,
      },
      validate: true,
      titleRules: [(v) => !!v || 'タイトルは必須入力です'],
      datePicker: false,
    }
    },
  methods: {
    ...mapActions('modules/auth',[
      "setLoginUser",
      "deleteLoginUser",
    ]),
    ...mapActions('modules/todos',[
      "fetchTodos",
      "fetchComments",
    ]),
  },
}
</script>

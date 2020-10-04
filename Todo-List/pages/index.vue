<template>
  <v-app>
    <v-container>
      <Todos />
    </v-container>
  </v-app>
</template>

<script>
import Todos from '@/components/Todos'
import { mapState, mapActions } from 'vuex'
export default {
  middleware: 'authenticated',
  components: {
    Todos,
  },
  created() {
        this.fetchTodos();
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

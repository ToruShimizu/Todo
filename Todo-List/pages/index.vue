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
    if (this.todos.length === 0) {
      this.fetchTodos()
    }
  },
  computed: {
    ...mapState('modules/todos', ['todos']),
  },
  methods: {
    ...mapActions('modules/todos', ['fetchTodos']),
  },
}
</script>

<template>
  <v-app>
    <Todos />
  </v-app>
</template>

<script>
import Todos from '@/components/Todos/Todos'
export default {
  middleware: 'authenticated',
  components: {
    Todos
  }
}
</script>

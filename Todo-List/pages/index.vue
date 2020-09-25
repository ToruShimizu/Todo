<template>
  <v-app>
    <v-container mt-12>
      <Todos />
    </v-container>
  </v-app>
</template>

<script>
import Todos from '@/components/Todos/Todos'
export default {
  middleware: 'authenticated',

  components: {
    Todos,
  },
}
</script>

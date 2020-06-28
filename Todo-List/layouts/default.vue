<template>
  <v-app dark>
      <todos/>
        <nuxt />
      
  </v-app>
</template>

<script>
import Todos from '@/components/Todos'
export default {
  components: {
    Todos
  },
  data () {
    return {
      
    }
  }
}
</script>

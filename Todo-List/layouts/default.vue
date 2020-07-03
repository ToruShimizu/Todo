<template>
  <v-app dark>

      <todos/>
        <nuxt />
      
  </v-app>
</template>

<script>
import Todos from '@/components/Todos'
import {mapActions} from 'vuex'
import firebase from 'firebase'

export default {
  components: {
    Todos
  },
 
  data () {
    return {
      
    }
  },
  methods: {
    ...mapActions(['login','setLoginUser'])
  }
}
</script>

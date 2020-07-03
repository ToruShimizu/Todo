<template>
  <v-app dark> 
    <v-card
    color="grey lighten-4"
    flat
    tile
  >
      <v-toolbar color="indigo darken-2" dense dark >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-title>
        ToDo
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon @click="logout">mdi-logout-variant</v-icon>
      <v-icon @click="login">mdi-account</v-icon>
    </v-toolbar>
    </v-card>
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
   created () {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setLoginUser(user)
      }else {
        this.deleteLoginUser()
      }
  })
  },
    async asyncData ({ redirect, store }) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const { uid, displayName, email } = user
        store.dispatch ('setUser', { user: { id: uid, name: displayName, email: email }})

        const cookies = new Cookies()
        const cookie = {id: uid, name: displayName, email: email}
        cookies.set('user', JSON.stringify(cookie))
        redirect('/todos')
      }
    })
    return {
    }
  },
  
 

  methods: {
    
    ...mapActions(['login','setLoginUser','logout'])
  }
}
</script>

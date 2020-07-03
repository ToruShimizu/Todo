<template>
     <v-container text-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1></h1>
        <p>Googleアカウントでログインしてください。</p>
      </v-flex>
    <v-toolbar-items>
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>
      <v-flex xs12 mt-5>
        <v-btn color='info' @click="login">Googleアカウントでログイン</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import firebase from 'firebase'


export default {
  components: {
  
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
    methods: {
    ...mapActions(['login','setLoginUser','deleteLoginUser','logout'])
  }
}
</script>

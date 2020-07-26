<template>
  <v-app>
           <v-navigation-drawer v-model="drawer" app>Navigation Lists</v-navigation-drawer>
        <v-card color="grey lighten-4" flat tile>
      <v-app-bar color="indigo darken-2" dense dark app>
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>ToDo</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-toolbar-items v-if="$store.state.login_user">
          <v-toolbar-title>{{userName}}</v-toolbar-title>
          <v-avatar size="40">
      <img
      v-if="photoURL"
        :src="photoURL"
      >
    </v-avatar>
          <v-icon @click="logout">mdi-logout-variant</v-icon>
        </v-toolbar-items>
        <v-toolbar-items v-if="!$store.state.login_user">
          <v-icon @click="login">mdi-account</v-icon>
        </v-toolbar-items>
      </v-app-bar>
    </v-card>
    <todos />
     <v-footer color="indigo darken-2" dark app>
      Todo
    </v-footer>
  </v-app>
</template>

<script>
import Todos from "@/components/Todos";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";

export default {
  components: {
    Todos
  },

  data() {
    return {
      drawer: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setLoginUser(user);
      } else {
        this.deleteLoginUser();
      }
    });
  },
  computed: {
    ...mapGetters(["userName", "photoURL"])
  },

  methods: {
    ...mapActions(["login", "setLoginUser", "logout", "deleteLoginUser"])
  }
};
</script>


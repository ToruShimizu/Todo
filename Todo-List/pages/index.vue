<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-container>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title grey--text text--darken-2">Login User</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list dense nav>
          <v-list-item v-if="$store.state.login_user">
            <v-list-item-icon v-if="photoURL">
              <v-avatar size="50">
                <img :src="photoURL" />
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="title grey--text text--darken-2">{{userName}}</v-list-item-title>
              <v-list-item-title class="title grey--text text--darken-2" v-if='!userName'>{{userEmail}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-else>
            <v-list-item-content>
              <v-list-item-title>Not Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="indigo darken-2" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ToDo</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if="$store.state.login_user">
        <v-icon @click="logout">mdi-logout-variant</v-icon>
      </v-toolbar-items>
      <v-toolbar-items v-if="!$store.state.login_user">
        <v-icon @click="login">mdi-account</v-icon>
      </v-toolbar-items>
    </v-app-bar>
    <v-container mt-12>
      <todos />
    </v-container>
    <v-footer color="indigo darken-2" dark app>
      <span class="grey--text text--lighten-2">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Todos from "@/components/Todos";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";

export default {
  components: {
    Todos,
  },

  data() {
    return {
      drawer: null,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        this.fetchTodos();
        if (this.$router.currentRoute.name === "signIn") this.$router.push("/");
      } else {
        this.deleteLoginUser();
        this.$router.push("signIn");
      }
    });
  },
  computed: {
    ...mapGetters(["userName", "photoURL","userEmail"]),
  },

  methods: {
    ...mapActions([
      "login",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "fetchTodos",
    ]),
  },
};
</script>


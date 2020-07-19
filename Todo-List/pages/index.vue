<template>
  <div>
        <v-card color="grey lighten-4" flat tile>
      <v-toolbar color="indigo darken-2" dense dark>
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
      </v-toolbar>
    </v-card>
    <todos />
  </div>
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
    return {};
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
  async asyncData({ redirect, store }) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const { uid, displayName, email } = user;
        store.dispatch("setUser", {
          user: { id: uid, name: displayName, email: email }
        });

        const cookies = new Cookies();
        const cookie = { id: uid, name: displayName, email: email };
        cookies.set("user", JSON.stringify(cookie));
        redirect("/todos");
      }
    });
    return {};
  },
  computed: {
    ...mapGetters(["userName", "photoURL"])
  },

  methods: {
    ...mapActions(["login", "setLoginUser", "logout", "deleteLoginUser"])
  }
};
</script>


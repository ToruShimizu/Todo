<template>
  <v-app>
           <v-navigation-drawer v-model="drawer" app clipped>
              <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title grey--text text--darken-2">
          Login User
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
      <v-list dense nav>
      <v-list-item v-if="$store.state.login_user" >
        <v-list-item-icon>
         <v-avatar size="50">
          <img
          v-if="photoURL"
        :src="photoURL"
      >
    </v-avatar>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="title grey--text text--darken-2">{{userName}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>
            ログインユーザーはいません
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
        </v-navigation-drawer>
        <v-card color="grey lighten-4" flat tile>
      <v-app-bar color="indigo darken-2"  dark app clipped-left>
        <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>ToDo</v-toolbar-title>
        <v-spacer></v-spacer>
            <v-col cols="12" sm="6" md="4">

        <v-text-field
        flat
        solo-inverted
        hide-details
        v-model="searchTask"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
        clearable
      ></v-text-field>
          </v-col>

        <v-spacer></v-spacer>

        <v-toolbar-items v-if="$store.state.login_user">
          <v-icon @click="logout">mdi-logout-variant</v-icon>
        </v-toolbar-items>
        <v-toolbar-items v-if="!$store.state.login_user">
          <v-icon @click="login">mdi-account</v-icon>
        </v-toolbar-items>
      </v-app-bar>
    </v-card>
    <todos />
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
    ...mapActions(["login","setLoginUser", "logout", "deleteLoginUser"])
  }
};
</script>


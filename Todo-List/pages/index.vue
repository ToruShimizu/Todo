<template>
  <v-app>
    <v-container mt-12>
      <Todos />
    </v-container>
  </v-app>
</template>

<script>
import Todos from "@/components/Todos";
import { mapActions } from "vuex";
import firebase from "firebase";

export default {
  components: {
    Todos,
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setLoginUser(user);
        this.fetchTodos();
        this.fetchComments();
        if (this.$router.currentRoute.name === "signIn") this.$router.push("/");
      } else {
        this.deleteLoginUser();
        this.$router.push("signIn");
      }
    });
  },
  methods: {
    ...mapActions([
      "setLoginUser",
      "deleteLoginUser",
      "fetchTodos",
      "fetchComments"
    ]),
  },
};
</script>


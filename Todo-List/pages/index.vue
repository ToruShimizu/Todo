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
  props: {
    searchTask: {
      type: String,
    },
  },
  created() {
    this.fetchTodos(),
    this.setLoginUser(),
    this.fetchComments();
    if (this.$router.currentRoute.name === "signIn") this.$router.push("/");
  },
  methods: {
    ...mapActions([
      "setLoginUser",
      "deleteLoginUser",
      "fetchTodos",
      "fetchComments",
    ]),
  },
};
</script>


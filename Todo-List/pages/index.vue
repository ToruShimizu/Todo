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
    // FIXME:actionに書く
    firebase.auth().onAuthStateChanged((loginUser) => {

      if ( loginUser ) {
        this.setLoginUser( loginUser );
        this.fetchTodos();
        if (this.$router.currentRoute.name === "signIn")
          this.$router.push({ name: "/" });
      } else {
        this.deleteLoginUser();
        this.$router.push({ name: "signIn" });
      }
    });

  },
  methods: {
    ...mapActions("modules/auth", ["setLoginUser", "deleteLoginUser"]),
    ...mapActions("modules/todos", ["fetchTodos", "fetchComments"]),
  },
};
</script>


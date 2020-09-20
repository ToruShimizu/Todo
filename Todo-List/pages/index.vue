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
  middleware: "authenticated",
  components: {
    Todos,
  },
  props: {
    searchTask: {
      type: String,
    },
  },
  created() {
    this.fetchTodos();
  },
  methods: {
    ...mapActions("modules/auth", ["setLoginUser", "deleteLoginUser"]),
    ...mapActions("modules/todos", ["fetchTodos", "fetchComments"]),
  },
};
</script>


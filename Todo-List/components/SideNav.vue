<template>
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
          <v-list-item-title class="title grey--text text--darken-2" v-if="!userName">{{userEmail}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else>
        <v-list-item-content>
          <v-list-item-title>Not Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userName", "photoURL", "userEmail"]),
  },
};
</script>


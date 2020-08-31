<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <SideNav />
    </v-navigation-drawer>

    <v-app-bar color="indigo darken-2" dark app clipped-left>
      <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>ToDo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="$store.state.login_user">
        <v-icon @click="logout">mdi-logout-variant</v-icon>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions,} from "vuex";
import SideNav from "@/components/SideNav";

export default {
  components: {
    SideNav,
  },
  data() {
    return {
      drawer: null,
    };
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>


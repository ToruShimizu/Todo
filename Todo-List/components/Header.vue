<template>
  <v-app>
    <header>
      <v-navigation-drawer v-model="drawer" app clipped>
        <SideNav />
      </v-navigation-drawer>
      <v-app-bar color="indigo darken-2" dark app clipped-left>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>ToDo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="this.login_user">
          <v-icon @click="logout">mdi-logout-variant</v-icon>
        </v-toolbar-items>
      </v-app-bar>
    </header>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SideNav from '@/components/SideNav'
export default {
  components: {
    SideNav,
  },
  data() {
    return {
      drawer: null,
    }
  },
  computed: {
    ...mapState('modules/auth', ['login_user']),
  },
  methods: {
    ...mapActions('modules/auth', ['logout']),
  },
}
</script>

<style>
.v-application--wrap {
  min-height: 10vh;
}
</style>

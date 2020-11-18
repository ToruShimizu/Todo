<template>
  <v-app>
    <v-navigation-drawer v-model="sideNavDrawer" app clipped>
      <SideNav />
    </v-navigation-drawer>
    <v-app-bar color="indigo darken-2" dark app clipped-left>
      <v-app-bar-nav-icon @click="sideNavDrawer = !sideNavDrawer"></v-app-bar-nav-icon>
      <nuxt-link to="/activityPlans" class="white--text">
        <v-toolbar-title>QC活動管理</v-toolbar-title>
      </nuxt-link>
      <v-spacer />
      <v-toolbar-items v-if="loginUser">
        <v-icon @click="logout"> mdi-account-arrow-right-outline </v-icon>
      </v-toolbar-items>
    </v-app-bar>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SideNav from '@/components/Header/SideNav/SideNav'
export default {
  components: {
    SideNav
  },
  data() {
    return {
      sideNavDrawer: null
    }
  },
  computed: {
    ...mapState('modules/user/auth', ['loginUser'])
  },
  methods: {
    ...mapActions('modules/user/auth', ['logout'])
  }
}
</script>

<style>
.v-application--wrap {
  min-height: 10vh;
}
</style>

<template>
  <v-menu transition="fab-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark color="grey" v-bind="attrs" v-on="on" text>
        <v-icon>mdi-pen </v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item>
        <v-btn text>
          <v-list-item-title @click="openEditTeam">サークル編集</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn text>
          <v-list-item-title @click="handleDeleteTeam">サークル削除</v-list-item-title>
        </v-btn>
      </v-list-item>
      <v-list-item v-if="this.$route.path !== '/createTeam'">
        <v-btn to="/createTeam" nuxt text>
          <v-list-item-title>メンバー編集</v-list-item-title>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    handleDeleteTeam() {
      if (!confirm('サークルを削除しますか？')) return
      this.removeTeam()
    },
    ...mapActions('modules/team/team', ['removeTeam'])
  }
}
</script>
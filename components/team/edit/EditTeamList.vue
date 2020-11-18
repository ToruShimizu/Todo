<template>
  <div>
    <v-menu transition="fab-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark color="grey" v-bind="attrs" v-on="on" text>
          <v-icon>mdi-pen </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-btn text>
            <v-list-item-title @click="openUpdateTeam">サークル編集</v-list-item-title>
          </v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn text>
            <v-list-item-title @click="handleDeleteTeam">サークル削除</v-list-item-title>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <UpdateTeam :update-team-dialog="updateTeamDialog" @close-update-team="closeUpdateTeam" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import UpdateTeam from '@/components/team/edit/UpdateTeam'
export default {
  data() {
    return {
      updateTeamDialog: false
    }
  },
  methods: {
    openUpdateTeam() {
      console.log('hoge')
      this.updateTeamDialog = true
    },
    closeUpdateTeam() {
      this.updateTeamDialog = false
    },
    handleDeleteTeam() {
      if (!confirm('サークルを削除しますか？')) return
      this.removeTeam()
    },
    ...mapActions('modules/team/team', ['removeTeam'])
  }
}
</script>
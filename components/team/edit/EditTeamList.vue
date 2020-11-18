<template>
  <div>
    <v-btn v-if="team === null" color="teal" dark class="font-italic mb-5" @click="openCreateTeam">
      <v-icon>mdi-account-plus</v-icon>サークル新規作成
    </v-btn>
    <v-menu transition="fab-transition" v-else>
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
    <CreateTeam :create-team-dialog="createTeamDialog" @close-team-dialog="closeCreateTeam" />
    <UpdateTeam :update-team-dialog="updateTeamDialog" @close-team-dialog="closeUpdateTeam" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UpdateTeam from '@/components/team/edit/UpdateTeam'
import CreateTeam from '@/components/team/CreateTeam'
export default {
  components: {
    UpdateTeam,
    CreateTeam
  },
  data() {
    return {
      createTeamDialog: false,
      updateTeamDialog: false
    }
  },
  computed: {
    ...mapState('modules/team/team', ['team'])
  },
  methods: {
    openCreateTeam() {
      this.createTeamDialog = true
    },
    openUpdateTeam() {
      this.updateTeamDialog = true
    },
    closeCreateTeam() {
      this.createTeamDialog = false
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
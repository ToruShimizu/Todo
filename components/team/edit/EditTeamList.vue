<template>
  <div>
    <v-menu transition="fab-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="grey" v-bind="attrs" v-on="on" outlined small class="mt-1 ml-5">
          <v-icon> mdi-pencil-outline </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title
            ><v-btn text @click="openUpdateTeam">
              <v-icon>mdi-pencil-outline </v-icon>サークル編集</v-btn
            ></v-list-item-title
          >
        </v-list-item>
        <v-list-item>
          <v-list-item-title @click="handleDeleteTeam"
            ><v-btn text
              ><v-icon>mdi-account-multiple-remove-outline </v-icon>サークル削除</v-btn
            ></v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-menu>
    <UpdateTeam :update-team-dialog="updateTeamDialog" @close-team-dialog="closeUpdateTeam" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UpdateTeam from '@/components/team/edit/UpdateTeam'
export default {
  components: {
    UpdateTeam
  },
  data() {
    return {
      updateTeamDialog: false
    }
  },
  computed: {
    ...mapGetters('modules/team/team', ['teamName'])
  },
  methods: {
    openUpdateTeam() {
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
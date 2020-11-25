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
          <v-list-item-title>
            <TextButton
              @handle-text-button="openUpdateTeam"
              :icon="'mdi-pencil-outline'"
              :title="'サークル編集'"
            />
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <TextButton
              @handle-text-button="handleDeleteTeam"
              :icon="'mdi-account-multiple-remove-outline'"
              :title="'サークル削除'"
            />
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <UpdateTeam
      :update-team-dialog="updateTeamDialog"
      @close-team-dialog="closeUpdateTeam"
      :edit-team="editTeam"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import UpdateTeam from '@/components/team/edit/UpdateTeam'
import TextButton from '@/components/commonParts/button/TextButton/TextButton'
export default {
  components: {
    UpdateTeam,
    TextButton
  },
  data() {
    return {
      editTeam: {
        name: '',
        imageFile: null,
        fileName: '',
        photoURL: ''
      },
      updateTeamDialog: false
    }
  },
  computed: {
    ...mapGetters('modules/team/team', ['teamName'])
  },
  methods: {
    openUpdateTeam() {
      this.editTeam.name = this.teamName
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
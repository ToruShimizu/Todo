<template>
  <FormCreateTeam
    :title="'サークル編集'"
    :team="editTeam"
    :team-dialog="updateTeamDialog"
    @save-team="handleUpdateTeam"
    @close-team-dialog="closeTeamDialog"
  />
</template>
<script>
import { mapActions } from 'vuex'
import FormCreateTeam from '@/components/commonParts/team/form/FormCreateTeam'
export default {
  components: {
    FormCreateTeam
  },
  props: {
    updateTeamDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      editTeam: {
        name: '',
        imageFile: null,
        fileName: '',
        photoURL: ''
      }
    }
  },
  methods: {
    async handleUpdateTeam() {
      const team = this.editTeam
      if (team.imageFile) {
        await this.updateTeamImageFile(team)
      } else {
        await this.updateTeam(team)
      }
    },
    closeTeamDialog() {
      this.$emit('close-team-dialog')
    },
    ...mapActions('modules/team/team', ['updateTeam', 'updateTeamImageFile'])
  }
}
</script>


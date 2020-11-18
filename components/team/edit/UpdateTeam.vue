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
        imageFile: null
      }
    }
  },
  methods: {
    changeTeamImageFile(event) {
      const file = event
      this.teamImageFile = file
    },
    handleUpdateTeam() {
      this.uploadTeamImageFile(this.teamImageFile)
    },
    closeTeamDialog() {
      this.$emit('close-team-dialog')
    },
    ...mapActions('modules/team/team', ['updateTeam', 'uploadTeamImageFile'])
  }
}
</script>


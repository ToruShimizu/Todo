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
    handleUpdateTeam(team) {
      this.updateTeam(team)
    },
    closeTeamDialog() {
      this.$emit('close-team-dialog')
    },
    ...mapActions('modules/team/team', ['updateTeam'])
  }
}
</script>


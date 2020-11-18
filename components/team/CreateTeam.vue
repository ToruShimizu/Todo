<template>
  <FormCreateTeam
    :title="'サークル新規作成'"
    :team="createTeam"
    :team-dialog="createTeamDialog"
    @save-team="handleCreateTeam"
    @close-team-dialog="closeTeamDialog"
  />
</template>
<script>
import FormCreateTeam from '@/components/commonParts/team/form/FormCreateTeam'
export default {
  props: {
    createTeamDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      createTeam: {
        name: '',
        imageFile: null
      }
    }
  },
  methods: {
    handleCreateTeam() {},
    closeTeamDialog() {
      this.$emit('close-team-dialog')
    }
  }
}
</script>
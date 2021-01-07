<template>
  <FormMember
    :title="'メンバー編集'"
    :team-member="editMember"
    :team-roles="teamRoles"
    :member-dialog="updateMemberDialog"
    :improvement-roles="improvementRoles"
    @close-member-dialog="closeUpdateMember"
    @save-member="handleUpdateMember"
  />
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: {
    editMember: {
      type: Object,
      required: true
    },
    teamRoles: {
      type: Array,
      required: true
    },
    improvementRoles: {
      type: Array,
      required: true
    },
    updateMemberDialog: {
      type: Boolean,
      required: false
    }
  },

  methods: {
    async handleUpdateMember() {
      const editMember = this.editMember
      await this.updateMember(editMember)
      this.closeUpdateMember()
    },

    closeUpdateMember() {
      this.$emit('close-update-member')
    },
    ...mapActions('modules/team/team', ['updateMember'])
  }
}
</script>

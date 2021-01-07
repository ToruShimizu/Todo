<template>
  <FormMember
    :title="'メンバー登録'"
    :team-member="teamMember"
    :team-roles="teamRoles"
    :member-dialog="memberDialog"
    :improvement-roles="improvementRoles"
    @close-member-dialog="closeRegistrationMember"
    @save-member="handleRegistrationMember"
  />
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    teamMember: {
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
    memberDialog: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async handleRegistrationMember() {
      const teamMember = this.teamMember
      await this.registrationMember(teamMember)
    },
    closeRegistrationMember() {
      this.$emit('close-registration-member')
    },
    ...mapActions('modules/team/team', ['registrationMember'])
  }
}
</script>

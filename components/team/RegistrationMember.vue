<template>
  <FormDialog :form-dialog="registrationMemberDialog">
    <template v-slot:dialog>
      <FormView :title="'メンバー登録'">
        <template v-slot:form>
          <v-form ref="form" lazy-validation>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <MemberName :name.sync="teamMember.name" :label="'名前'" />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <RoleComboBox :items="teamRoles" :role.sync="teamMember.role" :label="'役割'" />
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <ImprovementRoleComboBox
                  :items="improvementRoles"
                  :improvementRole.sync="teamMember.improvementRole"
                  :label="'改善担当'"
                />
              </v-col>
            </v-row>
          </v-form>

          <SaveAndCloseButton
            :close-button-title="'close'"
            :save-button-title="'save'"
            @close-button="closeRegistrationMember"
            @save-button="handleRegistrationMember"
          >
            <template v-slot:save>
              <v-icon left>mdi-account-plus</v-icon>
            </template>
          </SaveAndCloseButton>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'
import FormDialog from '@/components/commonParts/dialog/FormDialog'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import MemberName from '@/components/commonParts/team/input/MemberName'
import RoleComboBox from '@/components/commonParts/team/input/RoleComboBox'
import ImprovementRoleComboBox from '@/components/commonParts/team/input/ImprovementRoleComboBox'

export default {
  components: {
    FormDialog,
    SaveAndCloseButton,
    RoleComboBox,
    ImprovementRoleComboBox
  },
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
    registrationMemberDialog: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async handleRegistrationMember() {
      const teamMember = this.teamMember
      if (!teamMember.name) {
        this.$refs.form.validate()
        return
      }
      await this.registrationMember(teamMember)
      this.closeRegistrationMember()
    },
    closeRegistrationMember() {
      this.$refs.memberName.reset()
      this.teamMember.role = ''
      this.teamMember.improvementRoles = ''
      this.$emit('close-registration-member')
    },
    ...mapActions('modules/team/team', ['registrationMember'])
  }
}
</script>
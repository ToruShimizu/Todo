<template>
  <FormDialog :form-dialog="memberDialog">
    <template v-slot:dialog>
      <FormView :title="title">
        <template v-slot:form>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <MemberName :member-name.sync="teamMember.name" :label="'名前'" />
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
            </v-container>
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              @close-button="closeMemberDialog"
              @save-button="handleSaveMember"
            >
              <template v-slot:save>
                <v-icon left>mdi-account-plus</v-icon>
              </template>
            </SaveAndCloseButton>
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import FormDialog from '@/components/commonParts/dialog/FormDialog'
import FormView from '@/components/commonParts/form/FormView'
import MemberName from '@/components/commonParts/team/input/MemberName'
import RoleComboBox from '@/components/commonParts/team/input/RoleComboBox'
import ImprovementRoleComboBox from '@/components/commonParts/team/input/ImprovementRoleComboBox'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'

export default {
  components: {
    FormDialog,
    FormView,
    MemberName,
    RoleComboBox,
    ImprovementRoleComboBox,
    SaveAndCloseButton
  },

  props: {
    title: {
      type: String,
      required: true
    },
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
    closeMemberDialog() {
      this.$emit('close-member-dialog')
    },
    handleSaveMember() {
      if (!this.teamMember.name) {
        this.$refs.form.validate()
        return
      }
      this.$emit('save-member')
    }
  }
}
</script>
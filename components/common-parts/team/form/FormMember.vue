<template>
  <FormDialog :form-dialog="memberDialog">
    <template v-slot:dialog>
      <FormView :title="title">
        <template v-slot:form>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <MemberName
                    :team-member="teamMember"
                    :member-name.sync="teamMember.name"
                    :label="'名前'"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <RoleComboBox
                    :team-member="teamMember"
                    :items="teamRoles"
                    :role.sync="teamMember.role"
                    :label="'役割'"
                  />
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <ImprovementRoleComboBox
                    :team-member="teamMember"
                    :items="improvementRoles"
                    :improvement-role.sync="teamMember.improvementRole"
                    :label="'改善担当'"
                  />
                </v-col>
              </v-row>
            </v-container>
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              :loader="null"
              :icon="'mdi-account-plus'"
              @close-button="closeMemberDialog"
              @save-button="handleSaveMember"
            />
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
export default {
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
    async handleSaveMember() {
      if (!this.teamMember.name) {
        this.$refs.form.validate()
        return
      }
      await this.$emit('save-member')
      if (!this.teamMember.id) {
        this.$refs.form.reset()
        this.teamMember.name = ''
        this.teamMember.role = []
        this.teamMember.improvementRoles = []
        this.closeMemberDialog()
      }
      this.closeMemberDialog()
    }
  }
}
</script>

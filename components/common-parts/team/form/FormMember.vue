<template>
  <FormDialog :form-dialog="memberDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-form v-model="isValid" ref="form" lazy-validation>
          <v-row class="mx-2">
            <!-- メンバー名入力フォーム -->
            <v-col cols="12" sm="12" md="12">
              <MemberName
                :team-member="teamMember"
                :member-name.sync="teamMember.name"
                label="名前"
              />
            </v-col>
          </v-row>
          <!-- 役割入力フォーム -->
          <v-col cols="12" sm="12" md="12">
            <RoleComboBox
              :team-member="teamMember"
              :items="teamRoles"
              :role.sync="teamMember.role"
              label="役割"
            />
          </v-col>
          <!-- 改善担当入力フォーム -->
          <v-row class="mx-2">
            <v-col cols="12" sm="12" md="12">
              <ImprovementRoleComboBox
                :team-member="teamMember"
                :items="improvementRoles"
                :improvement-role.sync="teamMember.improvementRole"
                label="改善担当"
              />
            </v-col>
          </v-row>
          <v-row class="mx-2" justify="end">
            <AppButton :loading="isRunning" :disabled="isValid" @click="handleSaveMember"
              >保存する
            </AppButton>
            <AppButton :disabled="isRunning" color="success" outlined @click="closeMemberDialog"
              >キャンセル
            </AppButton>
          </v-row>
        </v-form>
        <v-divider />
      </v-card>
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
  data() {
    return {
      isRunning: false,
      isValid: false
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

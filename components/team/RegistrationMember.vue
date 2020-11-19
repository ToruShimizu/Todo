<template>
  <FormDialog :form-dialog="registrationMemberDialog">
    <template v-slot:dialog>
      <v-col cols="12" sm="12" md="12">
        <v-card width="600px" class="mx-auto">
          <v-card-text>
            <v-form ref="form" lazy-validation>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    ref="memberName"
                    v-model="teamMember.name"
                    label="名前"
                    required
                    clearable
                    dense
                    prepend-inner-icon="mdi-card-account-details-outline"
                    :rules="[validRules.nameRules.required]"
                  />
                </v-col>

                <v-col cols="12" sm="12" md="12">
                  <v-combobox
                    v-model="teamMember.role"
                    :items="teamRoles"
                    label="サークル役割"
                    clearable
                    multiple
                    small-chips
                    persistent-hint
                    dense
                    prepend-inner-icon="mdi-briefcase-account-outline"
                    hint="文字入力の場合はEnterキーを押してください"
                    @click:clear="$nextTick(() => (searchedCategoryKeyword = null))"
                  >
                  </v-combobox>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-combobox
                    v-model="teamMember.improvementRole"
                    :items="improvementRoles"
                    label="改善事例担当"
                    clearable
                    persistent-hint
                    hint="文字入力の場合はEnterキーを押してください"
                    multiple
                    small-chips
                    prepend-inner-icon="mdi-briefcase-outline"
                    @click:clear="$nextTick(() => (searchedCategoryKeyword = null))"
                  >
                  </v-combobox>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
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
        </v-card>
      </v-col>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'
import FormDialog from '@/components/commonParts/dialog/FormDialog'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'

import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],
  components: {
    FormDialog,
    SaveAndCloseButton
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
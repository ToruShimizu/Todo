<template>
  <FormDialog :form-dialog="updateMemberDialog">
    <template v-slot:dialog>
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-title>
            <span class="headline text--center">メンバー編集</span>
          </v-card-title>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <!-- タスク編集エリア -->
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    ref="editMemberName"
                    v-model="editMember.name"
                    label="名前"
                    required
                    clearable
                    dense
                    prepend-inner-icon="mdi-card-account-details-outline"
                    :rules="[validRules.nameRules.required]"
                  />
                </v-col>
                <!-- 日付編集エリア -->
                <v-col cols="12">
                  <v-combobox
                    v-model="editMember.role"
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
                  />
                </v-col>
                <!-- 詳細編集エリア -->
                <v-col cols="12">
                  <v-combobox
                    v-model="editMember.improvementRole"
                    :items="improvementRoles"
                    label="改善事例担当"
                    clearable
                    persistent-hint
                    hint="文字入力の場合はEnterキーを押してください"
                    multiple
                    small-chips
                    prepend-inner-icon="mdi-briefcase-outline"
                    @click:clear="$nextTick(() => (searchedCategoryKeyword = null))"
                  />
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeUpdateMember">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="handleUpdateMember">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </template>
  </FormDialog>
</template>
<script>
import { mapActions } from 'vuex'
import FormDialog from '@/components/commonParts/dialog/FormDialog'

import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],
  components: {
    FormDialog
  },
  props: {
    editMember: {
      type: Object,
      required: false
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
      if (!editMember.name) {
        this.$refs.form.validate()
        return
      }
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

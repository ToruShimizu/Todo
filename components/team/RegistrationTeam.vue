<template>
  <v-col cols="12" sm="12" md="12">
    <v-card width="600px" class="mx-auto">
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="teamMember.name"
              label="名前"
              required
              clearable
              dense
              prepend-inner-icon="mdi-card-account-details-outline"
              :rules="[validRules.nameRules.required]"
            />
          </v-col>

          <v-col cols="12" md="6">
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
          <v-col cols="12" md="6">
            <v-combobox
              v-model="teamMember.improvementRoles"
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
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="primary" @click="handleRegistrationMember">登録</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],

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
    }
  },
  methods: {
    handleRegistrationMember() {
      const teamMember = this.teamMember
      this.registrationMember(teamMember)
    },
    ...mapActions('modules/team/team', ['registrationMember'])
  }
}
</script>
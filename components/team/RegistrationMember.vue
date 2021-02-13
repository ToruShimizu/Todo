<template>
  <AppDialog :is-opened="isOpened" title="メンバー追加" @close="$emit('close', false)">
    <v-form v-model="isValid" ref="form" lazy-validation>
      <v-row class="mx-2">
        <!-- メンバー名入力フォーム -->
        <v-col cols="12">
          <v-text-field
            v-model="registrationMemberInput.name"
            required
            label="名前"
            clearable
            dense
            prepend-inner-icon="mdi-card-account-details-outline"
            :rules="nameRules"
          />
        </v-col>
      </v-row>
      <!-- 役割入力フォーム -->
      <v-col cols="12">
        <RoleComboBox
          :team-member="registrationMemberInput"
          :items="teamRoles"
          :role.sync="registrationMemberInput.role"
          label="役割"
        />
      </v-col>
      <!-- 改善担当入力フォーム -->
      <v-row class="mx-2">
        <v-col cols="12">
          <ImprovementRoleComboBox
            :team-member="registrationMemberInput"
            :items="improvementRoles"
            :improvement-role.sync="registrationMemberInput.improvementRole"
            label="改善担当"
          />
        </v-col>
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton :loading="isRunning" :disabled="isValid" @click="handleRegistrationMember"
        >保存する
      </AppButton>
      <AppButton :disabled="isRunning" color="success" outlined @click="$emit('close', false)"
        >キャンセル
      </AppButton>
    </template>
    <v-divider />
  </AppDialog>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  model: {
    prop: 'isOpened',
    event: 'close'
  },
  props: {
    isOpened: {
      type: Boolean,
      required: true
    },
    improvementRoles: {
      type: Array,
      default: () => []
    },
    teamRoles: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    registrationMemberInput: {
      name: '',
      role: [],
      improvementRole: []
    },
    nameRules: [v => !!v || '名前は必須です。'],
    isOpenedRegistrationMemberDialog: false,
    isRunning: false,
    isValid: false
  }),
  methods: {
    // メンバー登録
    handleRegistrationMember() {
      this.registrationMember(this.registrationMemberInput)
      this.$emit('close', false)
    },

    ...mapActions('modules/team/team', ['registrationMember'])
  }
}
</script>

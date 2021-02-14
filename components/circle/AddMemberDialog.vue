<template>
  <AppDialog
    :is-opened="isOpened"
    class="add-member-dialog"
    title="メンバー追加"
    @close="$emit('close', false)"
  >
    <v-form v-model="isValid" ref="form" lazy-validation>
      <v-row class="mx-2">
        <!-- メンバー名入力フォーム -->
        <v-col cols="12">
          <v-text-field
            v-model="addMemberInput.name"
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
          :circle-member="addMemberInput"
          :items="circleRoles"
          :role.sync="addMemberInput.role"
          label="役割"
        />
      </v-col>
      <!-- 改善担当入力フォーム -->
      <v-row class="mx-2">
        <v-col cols="12">
          <ImprovementRoleComboBox
            :circle-member="addMemberInput"
            :items="improvementRoles"
            :improvement-role.sync="addMemberInput.improvementRole"
            label="改善担当"
          />
        </v-col>
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton :loading="isRunning" :disabled="isValid" @click="runAddMember"
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
  name: 'AddMemberDialog',
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
    circleRoles: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    addMemberInput: {
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
    runAddMember() {
      this.addMember(this.addMemberInput)
      this.$emit('close', false)
    },

    ...mapActions('modules/circle', ['addMember'])
  }
}
</script>

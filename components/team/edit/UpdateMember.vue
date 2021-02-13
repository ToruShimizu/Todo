<template>
  <AppDialog :is-opened="isOpened" title="メンバー編集" @close="$emit('close', false)">
    <v-form v-model="isValid" ref="form" lazy-validation>
      <v-row class="mx-2">
        <!-- メンバー名入力フォーム -->
        <v-col cols="12">
          <v-text-field
            v-model="editMemberInput.name"
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
        <RoleComboBox :items="teamRoles" :role.sync="editMemberInput.role" label="役割" />
      </v-col>
      <!-- 改善担当入力フォーム -->
      <v-row class="mx-2">
        <v-col cols="12">
          <ImprovementRoleComboBox
            :items="improvementRoles"
            :improvement-role.sync="editMemberInput.improvementRole"
            label="改善担当"
          />
        </v-col>
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton :loading="isRunning" :disabled="isValid" @click="handleUpdateMember"
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
    editMember: {
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
  data() {
    return {
      editMemberInput: {
        name: '',
        role: [],
        improvementRole: []
      },
      isRunning: false,
      isValid: false,
      nameRules: [v => !!v || '名前は必須です。']
    }
  },

  methods: {
    // メンバー更新
    handleUpdateMember() {
      this.updateMember(this.editMemberInput)
      this.$emit('close', false)
    },
    ...mapActions('modules/team/team', ['updateMember'])
  }
}
</script>

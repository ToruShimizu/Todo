<template>
  <FormDialog :form-dialog="updatePasswordDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-card-subtitle class="text-center font-italic">
          ※ 変更完了後にログイン画面に戻ります。
        </v-card-subtitle>
        <v-divider />
        <v-form v-model="isValid" ref="form" lazy-validation @click="handleUpdatePassword">
          <!-- メールアドレス入力 -->
          <v-row class="mx-2">
            <FormUserEmail :user-email.sync="editUser.email" email-label="現在のメールアドレス" />
          </v-row>
          <!-- 現在のパスワード入力 -->
          <v-row class="mx-2">
            <FormUserPassword
              :user-password.sync="editUser.password"
              :show-password="isOpenedUserPassword"
              @handle-show-password="isOpenedUserPassword = !isOpenedUserPassword"
              password-label="現在のパスワード"
            />
          </v-row>
          <!-- 新しいパスワード入力 -->
          <v-row class="mx-2">
            <FormUserPassword
              :user-password.sync="editUser.editPassword"
              :show-password="isOpenedEditPassword"
              @handle-show-password="isOpenedEditPassword = !isOpenedEditPassword"
              password-label="新しいパスワード"
            />
          </v-row>
          <v-row class="mx-2" justify="end">
            <AppButton :disabled="isValid" outlined @click="handleUpdatePassword">
              保存する
            </AppButton>
            <AppButton
              :loading="isRunning"
              color="success"
              outlined
              @click="selectedUpdatePassword = 'closeUpdatePassword'"
            >
              キャンセル
            </AppButton>
          </v-row>
        </v-form>
      </v-card>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    updatePasswordDialog: {
      type: Boolean,
      required: true
    },
    selectUpdateUserInfo: {
      type: String,
      default: ''
    },
    editUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isOpenedUserPassword: false,
      isOpenedEditPassword: false,
      isRunning: false,
      isValid: false
    }
  },
  computed: {
    selectedUpdatePassword: {
      get() {
        return this.selectUpdateUserInfo
      },
      set(closeUpdatePassword) {
        this.$emit('update:close-update-password', closeUpdatePassword)
        this.$refs.form.reset()
      }
    }
  },
  methods: {
    // パスワード更新ボタン
    async handleUpdatePassword() {
      const editUser = this.editUser
      if (!editUser.email || !editUser.password || !editUser.editPassword) {
        this.$refs.form.validate()
        return
      }
      // ローディングをON
      this.isRunning = true
      await this.updatePassword({
        updatePassword: editUser.editPassword,
        email: editUser.email,
        password: editUser.password
      })
      this.$emit('update:close-update-password', 'closeUpdatePassword')
      // ローディングをOFF
      this.isRunning = false
    },
    ...mapActions('modules/user/userInfo', ['updatePassword'])
  }
}
</script>

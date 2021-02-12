<template>
  <FormDialog :form-dialog="resetPasswordDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-card-subtitle class="text-center font-italic">
          登録されているメールアドレスを入力してください。
          <br />パスワード再設定のURLが送信されます。
        </v-card-subtitle>

        <v-divider />
        <v-form ref="form" lazy-validation @submit.prevent="passwordReset">
          <v-row class="mx-2">
            <FormUserEmail
              :user-email.sync="resetUserPassword.email"
              email-label="現在のメールアドレス"
            />
          </v-row>
          <v-row class="mx-2">
            <AppButton
              :loading="isRunning"
              :disabled="isValid"
              color="accent"
              @click="handleResetPassword"
              >保存する
            </AppButton>
            <AppButton :disabled="isRunning" outlined @click="closeResetPassword"
              >キャンセル</AppButton
            >
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
    resetPasswordDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      resetUserPassword: {
        email: ''
      },
      isRunning: false,
      isValid: false
    }
  },
  methods: {
    // パスワードリセット実行
    async handleResetPassword() {
      const resetUserPassword = this.resetUserPassword
      if (resetUserPassword.email === 'test@example.com') {
        // ローディングをON
        isRunning = true
        alert('テストユーザーはパスワードを再設定することはできません')
        return
      } else if (!resetUserPassword.email) {
        this.$refs.form.validate()
        return
      }
      await this.resetPassword({
        email: resetUserPassword.email
      })
      this.closeResetPassword()
      // ローディングをOFF
      isRunning = false
    },
    // ダイアログを閉じる
    closeResetPassword() {
      this.$emit('close-reset-password')
      this.$refs.form.reset()
    },
    ...mapActions('modules/user/userInfo', ['resetPassword'])
  }
}
</script>

<template>
  <FormDialog :form-dialog="resetPasswordDialog">
    <template v-slot:dialog>
      <FormView title="パスワード再設定">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text>
              登録されているメールアドレスを入力してください。
              <br />パスワード再設定のURLが送信されます。
            </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @submit.prevent="passwordReset">
            <FormUserEmail
              :user-email.sync="resetUserPassword.email"
              email-label="現在のメールアドレス"
            />
            <SaveAndCloseButton
              :loading="resetPasswordLoading"
              close-button-title="close"
              save-button-title="send"
              icon="mdi-email-send"
              @close-button="closeResetPassword"
              @save-button="handleResetPassword"
            />
          </v-form>
        </template>
      </FormView>
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
      resetPasswordLoading: false
    }
  },
  methods: {
    // パスワードリセット実行
    async handleResetPassword() {
      const resetUserPassword = this.resetUserPassword
      if (resetUserPassword.email === 'test@example.com') {
        // ローディングをON
        resetPasswordLoading = true
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
      resetPasswordLoading = false
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

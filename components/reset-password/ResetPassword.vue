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
              :loader="resetPasswordLoader"
              close-button-title="close"
              save-button-title="send"
              icon="mdi-email-send"
              @close-button="closeResetPassword"
              @save-button="handleResetPassword"
              @stop-loading="stopResetPasswordLoading"
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
      resetPasswordLoading: false,
      resetPasswordLoader: null
    }
  },
  methods: {
    async handleResetPassword() {
      const resetUserPassword = this.resetUserPassword
      if (resetUserPassword.email === 'test@example.com') {
        alert('テストユーザーはパスワードを再設定することはできません')
        return
      } else if (!resetUserPassword.email) {
        this.$refs.form.validate()
        return
      }
      this.startResetPasswordLoading()
      await this.resetPassword({
        email: resetUserPassword.email
      })
      this.stopResetPasswordLoading()
      this.closeResetPassword()
    },
    closeResetPassword() {
      this.$emit('close-reset-password')
      this.$refs.form.reset()
    },
    startResetPasswordLoading() {
      this.resetPasswordLoading = true
      this.loginLoader = this.resetPasswordLoading
    },
    stopResetPasswordLoading() {
      this.resetPasswordLoading = false
      this.loginLoader = this.resetPasswordLoading
    },
    ...mapActions('modules/user/userInfo', ['resetPassword'])
  }
}
</script>

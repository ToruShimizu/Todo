<template>
  <FormDialog :form-dialog="resetPasswordDialog">
    <template v-slot:dialog>
      <FormView :title="'パスワード再設定'">
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
              :email-label="'現在のメールアドレス'"
            />
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'send'"
              @close-button="closeResetPassword"
              @save-button="handleResetPassword"
            >
              <template v-slot:save>
                <v-icon left>mdi-email-send</v-icon>
              </template>
            </SaveAndCloseButton>
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>


<script>
import { mapActions } from 'vuex'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormCardText from '@/components/commonParts/card/FormCardText'
import FormView from '@/components/commonParts/form/FormView'
import FormDialog from '@/components/commonParts/dialog/FormDialog'

export default {
  components: {
    SaveAndCloseButton,
    FormCardText,
    FormView,
    FormDialog
  },
  props: {
    resetPasswordDialog: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      resetUserPassword: {
        email: ''
      }
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
      await this.resetPassword({
        email: resetUserPassword.email
      })
      this.closeResetPassword()
    },
    closeResetPassword() {
      this.$emit('close-reset-password')
      this.$refs.form.reset()
    },
    ...mapActions('modules/user/userInfo', ['resetPassword'])
  }
}
</script>

<template>
  <!-- eslint-disable  -->

  <v-dialog
    v-model="resetPasswordDialog"
    persistent
    max-width="400px"
    transition="scroll-y-transition"
  >
    <!-- eslint-disable  -->

    <v-app>
      <v-col cols="12" sm="12" md="12">
        <v-card width="400px" class="mx-auto mt-5 text-center">
          <v-card-title class="text-center">
            <h4 class="fill-width">パスワード再設定</h4>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="passwordReset">
              <p>
                登録されているメールアドレスを入力してください。
                <br />パスワード再設定のURLが送信されます。
              </p>
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-app>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'

export default {
  components: {
    SaveAndCloseButton
  },
  props: {
    resetPasswordDialog: {
      type: Boolean,
      required: true
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

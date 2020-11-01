<template>
  <v-app>
    <v-dialog
      v-model="resetPasswordDialog"
      persistent
      max-width="400px"
      transition="scroll-y-transition"
    >
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
                <v-text-field
                  v-model="resetUserPassword.email"
                  prepend-inner-icon="mdi-email-outline"
                  label="登録されているメールアドレス"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-card-actions>
                  <v-btn color="primary" @click="closeResetPasswprd" class="hidden-sm-and-up">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-btn color="primary" @click="closeResetPasswprd" class="hidden-xs-only">
                    <v-icon left>mdi-login-variant</v-icon>ログイン画面へ戻る
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="success"
                    @click="passwordReset"
                    :loading="loadingResetPassword"
                    :disabled="loadingResetPassword"
                  >
                    <v-icon left>mdi-email-send</v-icon>送信
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-app>
    </v-dialog>
  </v-app>
</template>

<script>
import FormValidation from '@/mixins/FormValidation.vue'
import LoadingView from '@/mixins/LoadingView.vue'
export default {
  mixins: [FormValidation, LoadingView],

  props: {
    resetPasswordDialog: {
      type: Boolean
    }
  },
  data() {
    return {
      resetUserPassword: {
        email: ''
      },
      loadingResetPassword: false
    }
  },
  methods: {
    passwordReset() {
      if (this.resetUserPassword.email === 'test@example.com') {
        alert('テストユーザーはパスワードを再設定することはできません')
        return
      } else if (!this.resetUserPassword.email) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingResetPassword'
      this.$store.dispatch('modules/auth/passwordReset', { email: this.resetUserPassword.email })
      this.$refs.form.reset()
    },
    closeResetPasswprd() {
      this.$emit('close-reset-password')
      this.resetUserPassword.email = ''
      this.$refs.form.reset()
    }
  }
}
</script>

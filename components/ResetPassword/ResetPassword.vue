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
                  v-model="getUserEmail"
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
import StateUserEmail from '@/mixins/UserInfo/StateUserEmail.vue'
export default {
  mixins: [FormValidation, LoadingView, StateUserEmail],

  props: {
    resetPasswordDialog: {
      type: Boolean
    }
  },
  data() {
    return {
      loadingResetPassword: false,
      validate: true
    }
  },
  methods: {
    passwordReset() {
      if (this.getUserEmail === 'test@example.com') {
        alert('テストユーザーはパスワードを再設定することはできません')
        return
      } else if (!this.getUserEmail) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingResetPassword'
      this.$store.dispatch('modules/auth/passwordReset', { email: this.getUserEmail })
      this.$refs.form.reset()
    },
    closeResetPasswprd() {
      this.$emit('close-reset-password')
      this.getUserEmail = ''
    }
  }
}
</script>

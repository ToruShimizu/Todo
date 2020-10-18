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
            <v-card-title>
              <h2>パスワード再設定</h2>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="passwordReset">
                <p>
                  登録されているメールアドレスを入力してください。
                  <br />パスワード再設定のURLが送信されます。
                </p>
                <v-text-field
                  v-model="userEmail"
                  prepend-inner-icon="mdi-email-outline"
                  label="登録されているメールアドレス"
                  :rules="emailRules"
                  clearable
                />
                <v-card-actions>
                  <v-btn color="success" @click="passwordReset">
                    <v-icon left>mdi-email-send</v-icon>送信
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="closeResetPasswprd">
                    <v-icon left>mdi-login-variant</v-icon>ログイン画面へ戻る
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
export default {
  props: {
    resetPasswordDialog: {
      type: Boolean
    }
  },
  data() {
    return {
      userEmail: '',
      validate: true,
      emailRules: [
        (v) => !!v || 'メールアドレスは必須です',
        (v) => /.+@.+\..+/.test(v) || '正しいメールアドレスの形式で入力してください'
      ]
    }
  },
  methods: {
    passwordReset() {
      this.$store.dispatch('modules/auth/passwordReset', this.userEmail)
    },
    closeResetPasswprd() {
      this.$emit('close-reset-password')
    }
  }
}
</script>

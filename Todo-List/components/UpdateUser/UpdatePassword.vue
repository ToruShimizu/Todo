<template>
  <v-app>
    <v-dialog
      v-model="editPasswordDialog"
      persistent
      max-width="500px"
      transition="scroll-y-transition"
    >
      <v-col cols="12" sm="12" md="12">
        <v-card width="400px" class="mx-auto mt-5 text-center">
          <v-card-title>
            <h2>パスワード変更</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="updatePassword">
              <v-text-field
                v-model="loginUserEmail"
                prepend-inner-icon="mdi-email-outline"
                label="登録されているメールアドレス"
                :rules="emailRules"
                clearable
              />
              <v-text-field
                v-model="loginUserPassword"
                :type="showPassword ? 'text' : 'Password'"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="現在のPassword(6文字以上)"
                :rules="[passwordRules.required, passwordRules.min]"
                @click:append="showPassword = !showPassword"
              />
              <v-text-field
                v-model="updateUserPassword"
                :type="showEditPassword ? 'text' : 'Password'"
                prepend-inner-icon="mdi-lock-reset"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="新しいPassword(6文字以上)"
                :rules="[passwordRules.required, passwordRules.min]"
                @click:append="showEditPassword = !showEditPassword"
              />
              <v-card-actions>
                <v-btn color="success" @click="updatePassword">
                  <v-icon left>mdi-account</v-icon>SAVE
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="closeEditPassword">
                  <v-icon left>mdi-login-variant</v-icon>戻る
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  components: {},
  props: {
    editPasswordDialog: {
      type: Boolean
    }
  },
  data() {
    return {
      updateUserPassword: '',
      loginUserPassword: '',
      loginUserEmail: '',
      validate: true,
      showPassword: false,
      showEditPassword: false,
      emailRules: [
        (v) => !!v || 'メールアドレスは必須です',
        (v) => /.+@.+\..+/.test(v) || '正しいメールアドレスの形式で入力してください'
      ],
      passwordRules: {
        required: (v) => !!v || 'パスワードは必須です',
        min: (v) => v.length >= 6 || '6文字以上で入力してください'
      }
    }
  },
  methods: {
    updatePassword() {
      this.$store.dispatch('modules/auth/updatePassword', {
        newPassword: this.updateUserPassword,
        email: this.loginUserEmail,
        password: this.loginUserPassword
      })
      this.updateUserPassword = ''
      this.loginUserEmail = ''
      this.loginUserPassword = ''
    },
    openEditPassword() {
      this.$emit('open-edit-password')
    },
    closeEditPassword() {
      this.$emit('close-edit-password')
    }
  }
}
</script>

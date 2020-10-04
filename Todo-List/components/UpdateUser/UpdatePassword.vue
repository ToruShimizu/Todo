<template>
  <v-app class="mt-12">
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
              :type="showPassword ? 'text' : 'Password'"
              prepend-inner-icon="mdi-lock-reset"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="新しいPassword(6文字以上)"
              :rules="[passwordRules.required, passwordRules.min]"
              @click:append="showPassword = !showPassword"
            />
            <v-card-actions>
              <v-btn color="success" @click="updatePassword">
                <v-icon left>mdi-account</v-icon>SAVE
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$emit('close-edit-password')">
                <v-icon left>mdi-login-variant</v-icon>戻る
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      updateUserPassword: '',
      loginUserPassword: '',
      loginUserEmail: '',
      validate: true,
      showPassword: false,
      emailRules: [
        (v) => !!v || 'メールアドレスは必須です',
        (v) =>
          /.+@.+\..+/.test(v) || '正しいメールアドレスの形式で入力してください',
      ],
      passwordRules: {
        required: (v) => !!v || 'パスワードは必須です',
        min: (v) => v.length >= 6 || '6文字以上で入力してください',
      },
    }
  },
  methods: {
    updatePassword() {
<<<<<<< HEAD:Todo-List/components/UpdateUser/UpdatePassword.vue
      this.$store.dispatch('modules/auth/updatePassword', {
=======
      this.$store.dispatch("modules/auth/updatePassword", {
>>>>>>> #87ModuleDivision2:Todo-List/components/UpdatePassword.vue
        newPassword: this.updateUserPassword,
        email: this.loginUserPassword,
        password: this.loginUserPassword,
      })
    },
  },
}
</script>

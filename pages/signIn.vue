<template>
  <v-card width="500px" class="mx-auto mt-8 py-5">
    <v-card-title class="justify-center"> ログインはこちら</v-card-title>
    <v-divider />
    <!-- Googleログインボタン -->
    <v-row justify="center" class="my-3">
      <AppButton width="400" color="success" outlined @click="googleLogin">
        <img
          class="google-icon mr-4"
          src="https://madeby.google.com/static/images/google_g_logo.svg"
        />Googleアカウントでログイン
      </AppButton>
    </v-row>
    <!-- テストユーザーログインボタン -->
    <v-row justify="center" class="my-3">
      <AppButton
        :loading="isRunningTestLogin"
        width="400"
        color="success"
        outlined
        @click="testLogin"
        ><v-icon>mdi-account-arrow-left-outline</v-icon>テストユーザーでログイン
      </AppButton>
    </v-row>

    <v-divider />

    <v-card-title class="justify-center">
      または
    </v-card-title>

    <v-form ref="form" lazy-validation @submit.prevent="login">
      <v-row class="mx-2">
        <FormUserEmail :user-email.sync="signInUser.email" email-label="メールアドレス" />
      </v-row>
      <v-row class="mx-2">
        <FormUserPassword
          password-label="パスワード"
          :show-password="isOpenedShowPassword"
          :user-password.sync="signInUser.password"
          @handle-show-password="isOpenedShowPassword = !isOpenedShowPassword"
        />
      </v-row>
      <v-row justify="center">
        <AppButton text @click="isOpenedResetPasswordDialog = true"
          >※パスワードを忘れた方はこちら
        </AppButton>
      </v-row>

      <v-card-actions class="justify-end">
        <AppButton :disabled="isValid" :loading="isRunningLogin" @click="login">ログイン</AppButton>
        <AppButton outlined @click="isOpenedCreateUserDialog = true">新規作成</AppButton>
      </v-card-actions>
      <!-- 新規ユーザー作成ダイアログ -->
      <CreateUser v-model="isOpenedCreateUserDialog" />
      <!-- パスワードリセットダイアログ -->
      <ResetPassword v-model="isOpenedResetPasswordDialog" />
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      signInUser: {
        email: '',
        password: ''
      },
      isOpenedCreateUserDialog: false,
      isOpenedResetPasswordDialog: false,
      isRunningTestLogin: false,
      isRunningLogin: false,
      isOpenedShowPassword: false
    }
  },
  methods: {
    // テストログイン
    testLogin() {
      // ボタンのローディングをON
      this.isRunningTestLogin = true
      this.login({
        email: 'test@example.com',
        password: 'testUser',
        userName: 'テストユーザー'
      })
      // ボタンのローディングをOFF
      this.isRunningTestLogin = true
    },
    // メールアドレスログイン
    async login() {
      // ボタンのローディングをON
      this.isRunningLogin = true
      const signInUser = this.signInUser
      if (!signInUser.password || !signInUser.email) {
        this.$refs.form.validate()
        return
      }

      await this.login({
        email: signInUser.email,
        password: signInUser.password
      })
      // ボタンのローディングをOFF
      this.isRunningLogin = false
    },

    ...mapActions('modules/user/auth', ['googleLogin', 'login'])
  }
}
</script>

<style>
.google-icon {
  height: 24px;
}
</style>

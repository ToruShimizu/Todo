<template>
  <FormView :title="'ログインはこちら'" class="mt-8 py-5">
    <template v-slot:form>
      <FormCardText>
        <template v-slot:text>
          <LoginButton @login="googleLogin" class="mb-3">
            <template v-slot:icon>
              <img
                class="button-logo-img mr-4"
                src="https://madeby.google.com/static/images/google_g_logo.svg"
                style="height: 24px"
              />Googleアカウントでログイン
            </template>
          </LoginButton>
          <LoginButton
            :loader="loginLoader"
            :loading="testLoginLoading"
            @login="handleTestLogin"
            @stop-loading="stopTestLoginLoading"
            :icon="'mdi-account-arrow-left-outline'"
            :title="'テストユーザーとしてログイン'"
          >
          </LoginButton>
        </template>
      </FormCardText>
      <v-divider />
      <FormCardText>
        <template v-slot:text> またはこちらからログイン </template>
      </FormCardText>

      <v-form ref="form" lazy-validation @submit.prevent="login">
        <FormUserEmail :user-email.sync="signInUser.email" :email-label="'メールアドレス'" />
        <FormUserPassword
          :password-label="'パスワード'"
          :show-password="signInshowPassword"
          :user-password.sync="signInUser.password"
          @handle-show-password="toggleSignInShowPassword"
        />
        <v-btn text color="primary accent-4" @click="openResetPassword">
          ※パスワードを忘れた方はこちら</v-btn
        >
        <v-card-actions class="justify-end">
          <SaveButton
            :title="'login'"
            :loader="loginLoader"
            :loading="loginLoading"
            @save-button="handleLogin"
            @stop-loading="stopLoginLoading"
            :icon="'mdi-account-arrow-left'"
          >
          </SaveButton>
          <SaveButton :title="'new'" @save-button="openCreateUser" :icon="'mdi-account-plus'">
          </SaveButton>
        </v-card-actions>
        <CreateUser :create-user-dialog="createUserDialog" @close-create-user="closeCreateUser" />
        <ResetPassword
          :loader="loginLoader"
          :loading="resetPasswordLoading"
          :reset-password-dialog="resetPasswordDialog"
          @close-reset-password="closeResetPassword"
          @stop-loading="stopResetPasswordLoading"
        />
      </v-form>
    </template>
  </FormView>
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
      createUserDialog: false,
      resetPasswordDialog: false,
      testLoginLoading: false,
      loginLoading: false,
      signInshowPassword: false,
      resetPasswordLoading: false,
      loginLoader: null
    }
  },
  methods: {
    handleTestLogin() {
      this.startTestLoginLoading()
      this.login({
        email: 'test@example.com',
        password: 'testUser',
        userName: 'テストユーザー'
      })
    },
    async handleLogin() {
      const signInUser = this.signInUser
      if (!signInUser.password || !signInUser.email) {
        this.$refs.form.validate()
        return
      }
      this.startLoginLoading()
      await this.login({
        email: signInUser.email,
        password: signInUser.password
      })
      this.stopLoginLoading()
    },
    openCreateUser() {
      this.createUserDialog = true
    },
    closeCreateUser() {
      this.createUserDialog = false
    },
    openResetPassword() {
      this.resetPasswordDialog = true
    },
    closeResetPassword() {
      this.resetPasswordDialog = false
    },
    startTestLoginLoading() {
      this.testLoginLoading = true
      this.loginLoader = this.testLoginLoading
    },
    stopTestLoginLoading() {
      this.testLoginLoading = false
      this.loginLoader = this.testLoginLoading
    },
    startLoginLoading() {
      this.loginLoading = true
      this.loginLoader = this.loginLoading
    },
    stopLoginLoading() {
      this.loginLoading = false
      this.loginLoader = this.loginLoading
    },

    stopResetPasswordLoading() {
      this.resetPasswordLoading = false
      this.loginLoader = this.resetPasswordLoading
    },
    toggleSignInShowPassword() {
      this.signInshowPassword = !this.signInshowPassword
    },
    ...mapActions('modules/user/auth', ['googleLogin', 'login'])
  }
}
</script>

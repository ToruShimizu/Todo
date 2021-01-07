<template>
  <FormView title="ログインはこちら" class="mt-8 py-5">
    <template v-slot:form>
      <FormCardText>
        <template v-slot:text>
          <!-- Googleログインボタン -->
          <LoginButton @login="googleLogin" class="mb-3">
            <template v-slot:icon>
              <img
                class="button-logo-img mr-4"
                src="https://madeby.google.com/static/images/google_g_logo.svg"
                style="height: 24px"
              />Googleアカウントでログイン
            </template>
          </LoginButton>
          <!-- テストユーザーログインボタン -->
          <LoginButton
            :loading="testLoginLoading"
            @login="testLogin"
            icon="mdi-account-arrow-left-outline"
            title="テストユーザーとしてログイン"
          >
          </LoginButton>
        </template>
      </FormCardText>
      <v-divider />
      <FormCardText>
        <template v-slot:text> またはこちらからログイン </template>
      </FormCardText>

      <v-form ref="form" lazy-validation @submit.prevent="login">
        <FormUserEmail :user-email.sync="signInUser.email" email-label="メールアドレス" />
        <FormUserPassword
          password-label="パスワード"
          :show-password="signInshowPassword"
          :user-password.sync="signInUser.password"
          @handle-show-password="toggleSignInShowPassword"
        />
        <v-btn text color="primary accent-4" @click="openResetPassword">
          ※パスワードを忘れた方はこちら</v-btn
        >
        <v-card-actions class="justify-end">
          <SaveButton
            title="login"
            :loading="loginLoading"
            @save-button="login"
            icon="mdi-account-arrow-left"
          />

          <SaveButton title="new" @save-button="openCreateUser" icon="mdi-account-plus" />
        </v-card-actions>
        <!-- 新規ユーザー作成ダイアログ -->
        <CreateUser :create-user-dialog="createUserDialog" @close-create-user="closeCreateUser" />
        <!-- パスワードリセットダイアログ -->
        <ResetPassword
          :loading="resetPasswordLoading"
          :reset-password-dialog="resetPasswordDialog"
          @close-reset-password="closeResetPassword"
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
      resetPasswordLoading: false
    }
  },
  methods: {
    // テストログイン
    testLogin() {
      // ボタンのローディングをON
      this.testLoginLoading = true
      this.login({
        email: 'test@example.com',
        password: 'testUser',
        userName: 'テストユーザー'
      })
      // ボタンのローディングをOFF
      this.testLoginLoading = true
    },
    // メールアドレスログイン
    async login() {
      // ボタンのローディングをON
      this.loginLoading = true
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
      this.loginLoading = true
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
    toggleSignInShowPassword() {
      this.signInshowPassword = !this.signInshowPassword
    },
    ...mapActions('modules/user/auth', ['googleLogin', 'login'])
  }
}
</script>

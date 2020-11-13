<template>
  <v-app>
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto">
        <v-card-title class="text-center">
          <h4 class="fill-width">ログインはこちらから</h4>
        </v-card-title>
        <v-card-text>
          <v-btn
            class="fill-width text-capitalize caption"
            height="48px"
            outlined
            style="border-color: #979797"
            tile
            @click="googleLogin"
          >
            <img
              class="button-logo-img mr-4"
              src="https://madeby.google.com/static/images/google_g_logo.svg"
              style="height: 24px"
            />Googleアカウントでログイン
          </v-btn>
          <v-btn
            class="fill-width text-capitalize caption mt-5"
            height="48px"
            outlined
            style="border-color: #979797"
            tile
            :loading="loadingTestLogin"
            :disabled="loadingTestLogin"
            @click="handleTestLogin"
            ><v-icon>mdi-account-arrow-left-outline </v-icon> テストユーザーでログイン
          </v-btn>
        </v-card-text>
        <div class="separator separator_login_page">
          <div class="middle_separator">または</div>
        </div>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent="login">
            <v-text-field
              v-model="signInUser.email"
              prepend-inner-icon="mdi-email-outline"
              label="メールアドレスを入力する"
              :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
              clearable
            />
            <v-text-field
              v-model="signInUser.password"
              :type="showPassword ? 'text' : 'Password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワードを入力する(6文字以上)"
              :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
              counter="72"
              @click:append="showPassword = !showPassword"
            />
            <v-btn text color="primary accent-4" class="fill-width" @click="openResetPassword">
              パスワードを忘れた方はこちら</v-btn
            >
            <v-card-actions>
              <v-btn
                color="primary"
                :loading="loadingLogin"
                :disabled="loadingLogin"
                @click="handleLogin"
              >
                <v-icon left>mdi-login-variant</v-icon>ログイン
              </v-btn>
              <v-spacer />
              <v-btn color="success" @click="openCreateUser">
                <v-icon left>mdi-account-plus</v-icon>新規作成はこちら
              </v-btn>
              <CreateUser
                :create-user-dialog="createUserDialog"
                @close-create-user="closeCreateUser"
              />
              <ResetPassword
                :reset-password-dialog="resetPasswordDialog"
                @close-reset-password="closeResetPassword"
              />
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import CreateUser from '@/components/CreateUser/CreateUser'
import ResetPassword from '@/components/ResetPassword/ResetPassword'
import FormValidation from '@/mixins/FormValidation.vue'
import LoadingView from '@/mixins/LoadingView.vue'

export default {
  components: {
    CreateUser,
    ResetPassword
  },
  mixins: [FormValidation, LoadingView],

  data() {
    return {
      signInUser: {
        email: '',
        password: ''
      },
      loadingTestLogin: false,
      loadingLogin: false,
      showPassword: false,
      createUserDialog: false,
      resetPasswordDialog: false
    }
  },
  methods: {
    handleTestLogin() {
      this.loader = 'loadingTestLogin'
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
      this.loader = 'loadingLogin'
      await this.login({
        email: signInUser.email,
        password: signInUser.password
      })
      this.loader = null
      this.$refs.form.reset()
    },
    openCreateUser() {
      this.createUserDialog = true
    },
    closeCreateUser() {
      this.createUserDialog = false
      this.$refs.form.reset()
    },
    openResetPassword() {
      this.resetPasswordDialog = true
    },
    closeResetPassword() {
      this.resetPasswordDialog = false
    },
    ...mapActions('modules/user/auth', ['googleLogin', 'login'])
  }
}
</script>

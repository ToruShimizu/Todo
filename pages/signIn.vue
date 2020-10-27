<template>
  <v-app>
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto">
        <v-card-title class="text-center">
          <h4 class="fill-width">ログインはこちらから</h4>
        </v-card-title>
        <v-divider />

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
            @click="testLogin"
            ><v-icon>mdi-account-arrow-left-outline </v-icon> テストユーザーでログイン
          </v-btn>
        </v-card-text>
        <v-divider />
        <div class="separator separator_login_page">
          <div class="middle_separator">または</div>
        </div>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent="login">
            <v-text-field
              v-model="userEmail"
              prepend-inner-icon="mdi-email-outline"
              label="メールアドレスを入力する"
              :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
              clearable
            />
            <v-text-field
              v-model="userPassword"
              :type="showPassword ? 'text' : 'Password'"
              prepend-inner-icon="mdi-lock-outline"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワードを入力する(6文字以上)"
              :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
              @click:append="showPassword = !showPassword"
              counter="72"
            />
            <v-btn text color="primary accent-4" @click="openResetPassword" class="fill-width">
              パスワードを忘れた方はこちら</v-btn
            >
            <v-card-actions>
              <v-btn
                color="primary"
                @click="login"
                :loading="loadingLogin"
                :disabled="loadingLogin"
              >
                <v-icon left>mdi-login-variant</v-icon>ログイン
              </v-btn>
              <v-spacer />
              <v-btn color="success" @click="openCreateUser">
                <v-icon left>mdi-account-plus</v-icon>新規作成はこちら
              </v-btn>
              <CreateUser
                :createUserDialog="createUserDialog"
                @close-create-user="closeCreateUser"
              />
              <ResetPassword
                :resetPasswordDialog="resetPasswordDialog"
                @close-reset-password="closeResetPasswprd"
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
import FormValidation from '../mixins/FormValidation.vue'
import LoadingView from '../mixins/LoadingView.vue'
import CreateUser from '@/components/CreateUser/CreateUser'
import ResetPassword from '@/components/ResetPassword/ResetPassword'

export default {
  mixins: [FormValidation, LoadingView],
  components: {
    CreateUser,
    ResetPassword
  },

  data() {
    return {
      loadingTestLogin: false,
      loadingLogin: false,
      userEmail: '',
      userPassword: '',
      showPassword: false,
      validate: true,
      createUserDialog: false,
      resetPasswordDialog: false
    }
  },
  methods: {
    testLogin() {
      this.loader = 'loadingTestLogin'
      this.$store.dispatch('modules/auth/login', {
        email: 'test@example.com',
        password: 'testUser',
        userName: 'テストユーザー'
      })
    },
    login() {
      this.loader = 'loadingLogin'
      this.$store.dispatch('modules/auth/login', {
        email: this.userEmail,
        password: this.userPassword
      })
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
    closeResetPasswprd() {
      this.resetPasswordDialog = false
    },
    ...mapActions('modules/auth', ['googleLogin'])
  }
}
</script>

<style scoped>
.fill-width {
  width: 100%;
}
.link-caption {
  text-decoration: none;
  color: #666 !important;
  font-size: 0.75rem;
}
.separator {
  margin-top: 30px;
  margin-bottom: 30px;
  height: 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #fff;
  position: relative;
}
.middle_separator {
  position: absolute;
  padding: 0 16px;
  color: #ccc;
  background: #fff;
  font-size: 11px;
  text-shadow: 0 1px 0 #fff;
  text-transform: uppercase;
  top: -7px;
  left: 30%;
}
.middle_separator {
  color: #777;
  font-size: 13px;
  top: -9px;
  left: 41%;
}
</style>

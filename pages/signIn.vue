<template>
  <v-app class="mt-12">
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto mt-5 text-center">
        <v-card-title>
          <h1>Todo</h1>
          <p>
            ご利用の方は、
            <br />こちらからログインしてください。
          </p>
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
            @click="testLogin"
          >
            テストユーザーでログイン
          </v-btn>
        </v-card-text>
        <v-card-title>
          <h2>ログイン</h2>
        </v-card-title>
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
            <v-btn text color="primary accent-4" @click="openResetPassword">
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
import CreateUser from '@/components/CreateUser/CreateUser'
import ResetPassword from '@/components/ResetPassword/ResetPassword'
import FormValidation from '../mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],

  components: {
    CreateUser,
    ResetPassword
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  data() {
    return {
      loader: null,
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
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

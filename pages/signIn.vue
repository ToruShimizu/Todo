<template>
  <v-app>
    <FormView :title="'ログインはこちら'">
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
            <LoginButton @login="handleTestLogin">
              <template v-slot:icon>
                <v-icon>mdi-account-arrow-left-outline </v-icon> テストユーザーでログイン
              </template>
            </LoginButton>
          </template>
        </FormCardText>
        <v-divider />
        <FormCardText>
          <template v-slot:text> またはこちらからログイン </template>
        </FormCardText>

        <v-form ref="form" lazy-validation @submit.prevent="login">
          <FormUserEmail :user-email.sync="signInUser.email" :email-label="'メールアドレス'" />
          <FormUserPassword :password-label="'パスワード'" />
          <v-btn text color="primary accent-4" class="fill-width" @click="openResetPassword">
            ※パスワードを忘れた方はこちら</v-btn
          >
          <v-card-actions class="justify-end">
            <SaveButton :title="'login'" @save-button="handleLogin">
              <template v-slot:saveButton
                ><v-icon left>mdi-account-arrow-left-outline </v-icon></template
              >
            </SaveButton>
            <SaveButton :title="'new'" @save-button="openCreateUser">
              <template v-slot:saveButton>
                <v-icon left>mdi-account-plus-outline </v-icon></template
              >
            </SaveButton>
          </v-card-actions>
          <CreateUser :create-user-dialog="createUserDialog" @close-create-user="closeCreateUser" />
          <ResetPassword
            :reset-password-dialog="resetPasswordDialog"
            @close-reset-password="closeResetPassword"
          />
        </v-form>
      </template>
    </FormView>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import CreateUser from '@/components/CreateUser/CreateUser'
import ResetPassword from '@/components/ResetPassword/ResetPassword'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormUserPassword from '@/components/commonParts/user/form/FormUserPassword'
import SaveButton from '@/components/commonParts/button/SaveButton'
import FormView from '@/components/commonParts/form/FormView'

export default {
  components: {
    CreateUser,
    ResetPassword,
    FormUserEmail,
    FormUserPassword,
    SaveButton,
    FormView
  },

  data() {
    return {
      signInUser: {
        email: '',
        password: ''
      },
      createUserDialog: false,
      resetPasswordDialog: false
    }
  },
  methods: {
    handleTestLogin() {
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
      await this.login({
        email: signInUser.email,
        password: signInUser.password
      })
      this.$refs.form.reset()
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
    ...mapActions('modules/user/auth', ['googleLogin', 'login'])
  }
}
</script>

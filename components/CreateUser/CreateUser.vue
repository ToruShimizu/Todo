<template>
  <v-app>
    <v-dialog
      v-model="createUserDialog"
      persistent
      max-width="400px"
      transition="scroll-y-transition"
    >
      <v-app>
        <v-col cols="12" sm="12" md="12">
          <v-card width="400px" class="mx-auto mt-5 text-center">
            <v-card-title>
              <h1>Todo</h1>
            </v-card-title>
            <v-card-title>
              <h2>アカウント新規作成</h2>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="createUser">
                <p>
                  ○○○@example.comとすることで、
                  <br />サンプルのメールアドレスで作成することができます。
                </p>
                <v-text-field
                  v-model="userName"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  label="名前を入力する"
                  :rules="[validRules.nameRules.required]"
                  clearable
                />
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
                />
                <v-card-actions>
                  <v-btn
                    color="success"
                    @click="createUser"
                    :loading="loadingCreateUser"
                    :disabled="loadingCreateUser"
                  >
                    <v-icon left>mdi-account-plus</v-icon>新規作成
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="closeCreateUser">
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
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],

  props: {
    createUserDialog: {
      type: Boolean
    }
  },
  data() {
    return {
      userEmail: '',
      userPassword: '',
      userName: '',
      loader: null,
      loadingCreateUser: false,
      showPassword: false,
      validate: true
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  methods: {
    createUser() {
      this.loader = 'loadingCreateUser'
      this.$store.dispatch('modules/auth/createUser', {
        email: this.userEmail,
        password: this.userPassword,
        userName: this.userName
      })
    },
    closeCreateUser() {
      this.$emit('close-create-user')
      this.userEmail = ''
    }
  }
}
</script>

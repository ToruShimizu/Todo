<template>
  <v-app>
    <v-dialog
      v-model="createUserDialog"
      persistent
      max-width="500px"
      transition="scroll-y-transition"
    >
      <v-app>
        <v-col cols="12" sm="12" md="12">
          <v-card width="400px" class="mx-auto mt-5 text-center">
            <v-card-title class="text-center">
              <h4 class="fill-width">新規作成</h4>
            </v-card-title>
            <v-divider />
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="createUser">
                <p>
                  ○○○@example.comとすることで、
                  <br />サンプルのメールアドレスで作成することができます。
                </p>
                <v-text-field
                  v-model="getUserName"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  label="名前を入力する"
                  :rules="[validRules.nameRules.required]"
                  clearable
                />
                <v-text-field
                  v-model="getUserEmail"
                  prepend-inner-icon="mdi-email-outline"
                  label="メールアドレスを入力する"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-text-field
                  v-model="getUserPassword"
                  :type="showPassword ? 'text' : 'Password'"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="パスワードを入力する(6文字以上)"
                  :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
                  @click:append="showPassword = !showPassword"
                  counter="72"
                />
                <v-card-actions>
                  <v-btn color="primary" @click="closeCreateUser" class="hidden-xs-only">
                    <v-icon left>mdi-login-variant</v-icon>ログイン画面へ戻る
                  </v-btn>
                  <v-btn color="primary" @click="closeCreateUser" class="hidden-sm-and-up">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-spacer />

                  <v-btn
                    color="success"
                    @click="createUser"
                    :loading="loadingCreateUser"
                    :disabled="loadingCreateUser"
                  >
                    <v-icon left>mdi-account-plus</v-icon>新規作成
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
import LoadingView from '@/mixins/LoadingView.vue'
import StateUserName from '@/mixins/UserInfo/StateUserName.vue'
import StateUserEmail from '@/mixins/UserInfo/StateUserEmail.vue'
import StateUserPassword from '@/mixins/UserInfo/StateUserPassword.vue'

export default {
  mixins: [FormValidation, LoadingView, StateUserName, StateUserEmail, StateUserPassword],

  props: {
    createUserDialog: {
      type: Boolean
    }
  },
  data() {
    return {
      loadingCreateUser: false,
      showPassword: false
    }
  },
  methods: {
    async createUser() {
      this.loader = 'loadingCreateUser'
      if (!this.getUserPassword || !this.getUserEmail) {
        this.$refs.form.validate()
        return
      }
      await this.$store.dispatch('modules/auth/createUser', {
        email: this.getUserEmail,
        password: this.getUserPassword,
        userName: this.getUserName
      })
      this.loader = null
      this.$refs.form.reset()
    },
    closeCreateUser() {
      this.getUserName = ''
      this.getUserEmail = ''
      this.getUserPassword = ''
      this.$refs.form.reset()
      this.$emit('close-create-user')
    }
  }
}
</script>
<style scoped>
.fill-width {
  width: 100%;
}
</style>

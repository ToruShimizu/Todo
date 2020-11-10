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
                  v-model="createNewUser.name"
                  prepend-inner-icon="mdi-card-account-details-outline"
                  label="名前を入力する"
                  :rules="[validRules.nameRules.required]"
                  clearable
                />
                <v-text-field
                  v-model="createNewUser.email"
                  prepend-inner-icon="mdi-email-outline"
                  label="メールアドレスを入力する"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-text-field
                  v-model="createNewUser.password"
                  :type="showPassword ? 'text' : 'Password'"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="パスワードを入力する(6文字以上)"
                  :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
                  counter="72"
                  @click:append="showPassword = !showPassword"
                />
                <v-card-actions>
                  <v-btn color="primary" class="hidden-xs-only" @click="closeCreateUser">
                    <v-icon left>mdi-login-variant</v-icon>ログイン画面へ戻る
                  </v-btn>
                  <v-btn color="primary" class="hidden-sm-and-up" @click="closeCreateUser">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-spacer />
                  <v-btn
                    color="success"
                    :loading="loadingCreateUser"
                    :disabled="loadingCreateUser"
                    @click="handleCreateUser"
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
import { mapActions } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'
import LoadingView from '@/mixins/LoadingView.vue'

export default {
  mixins: [FormValidation, LoadingView],

  props: {
    createUserDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      createNewUser: {
        name: '',
        email: '',
        password: ''
      },
      showPassword: false,
      loadingCreateUser: false
    }
  },
  methods: {
    async handleCreateUser() {
      this.loader = 'loadingCreateUser'
      const createUser = this.createNewUser
      if (!createUser.password || !createUser.email) {
        this.$refs.form.validate()
        return
      }
      await this.createUser({
        email: createUser.email,
        password: createUser.password,
        userName: createUser.name
      })
      this.loader = null
    },
    closeCreateUser() {
      this.$emit('close-create-user')
      this.$refs.form.reset()
    },
    ...mapActions('modules/user/auth', ['createUser'])
  }
}
</script>
<style scoped>
.fill-width {
  width: 100%;
}
</style>

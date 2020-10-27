<template>
  <v-app>
    <v-dialog
      v-model="deleteUserDialog"
      persistent
      max-width="500px"
      transition="scroll-y-transition"
    >
      <v-app>
        <v-col cols="12" sm="12" md="12">
          <v-card width="400px" class="mx-auto text-center">
            <v-card-title class="text-center">
              <!-- FIXME classはscssに記述する -->
              <h4 class="fill-width">アカウント削除</h4>
            </v-card-title>
            <v-card-title>
              <v-card-text>
                登録されているメールアドレスと
                <br />パスワードを入力してください
              </v-card-text>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="deleteUser">
                <v-text-field
                  v-model="loginUserEmail"
                  prepend-inner-icon="mdi-email-outline"
                  label="登録されているメールアドレス"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-text-field
                  v-model="loginUserPassword"
                  :type="showPassword ? 'text' : 'Password'"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="現在のPassword(6文字以上)"
                  :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
                  @click:append="showPassword = !showPassword"
                  counter="72"
                />
                <v-card-actions>
                  <v-btn color="primary" @click="selectedDeleteUser = 'closeDeleteUser'">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-spacer />
                  <v-btn color="success" @click="deleteUser">
                    <v-icon left>mdi-account</v-icon>SAVE
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
export default {
  mixins: [FormValidation, LoadingView],
  props: {
    deleteUserDialog: {
      type: Boolean
    },
    selectedUpdateUserInfo: {
      type: String
    }
  },

  data() {
    return {
      loginUserPassword: '',
      loginUserEmail: '',
      loadingDeleteUser: false,
      validate: true,
      showPassword: false
    }
  },
  computed: {
    selectedDeleteUser: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selectedDeleteUser', value)
        this.loginUserEmail = ''
      }
    }
  },
  methods: {
    deleteUser() {
      this.loader = 'loadingDeleteUser'
      this.$store.dispatch('modules/auth/deleteUser', {
        email: this.loginUserEmail,
        password: this.loginUserPassword
      })
      this.loginUserEmail = ''
      this.loginUserPassword = ''
      this.$emit('update:selectedDeleteUser', 'closeDeleteUser')
    }
  }
}
</script>

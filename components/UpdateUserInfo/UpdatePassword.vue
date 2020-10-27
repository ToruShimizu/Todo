<template>
  <v-app>
    <v-dialog
      v-model="updatePasswordDialog"
      persistent
      max-width="500px"
      transition="scroll-y-transition"
    >
      <v-app>
        <v-col cols="12" sm="12" md="12">
          <v-card width="400px" class="mx-auto mt-5 text-center">
            <v-card-title>
              <h2>パスワード変更</h2>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="updatePassword">
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
                <v-text-field
                  v-model="updateUserPassword"
                  :type="showEditPassword ? 'text' : 'Password'"
                  prepend-inner-icon="mdi-lock-reset"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="新しいPassword(6文字以上)"
                  :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
                  @click:append="showEditPassword = !showEditPassword"
                  counter="72"
                />
                <v-card-actions>
                  <v-btn
                    color="success"
                    @click="updatePassword"
                    :loading="loadingResetPassword"
                    :disabled="loadingResetPassword"
                  >
                    <v-icon left>mdi-account</v-icon>SAVE
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="selectedUpdatePassword = 'closeUpdatePassword'">
                    <v-icon left>mdi-login-variant</v-icon>戻る
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
  components: {},
  props: {
    updatePasswordDialog: {
      type: Boolean
    },
    selectedUpdateUserInfo: {
      type: String
    }
  },
  computed: {
    selectedUpdatePassword: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selectedUpdatePassword', value)
      }
    }
  },
  data() {
    return {
      updateUserPassword: '',
      loginUserPassword: '',
      loginUserEmail: '',
      loader: null,
      loadingResetPassword: false,
      validate: true,
      showPassword: false,
      showEditPassword: false
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
    updatePassword() {
      this.loader = 'loadingResetPassword'
      this.$store.dispatch('modules/auth/updatePassword', {
        updatePassword: this.updateUserPassword,
        email: this.loginUserEmail,
        password: this.loginUserPassword
      })
      this.updateUserPassword = ''
      this.loginUserEmail = ''
      this.loginUserPassword = ''
      this.$emit('update:selectedUpdatePassword', 'closeUpdatePassword')
    }
  }
}
</script>

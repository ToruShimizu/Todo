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
          <v-card width="400px" class="mx-auto text-center">
            <v-card-title class="text-center">
              <!-- FIXME classはscssに記述する -->
              <h4 class="fill-width">パスワード変更</h4>
            </v-card-title>
            <v-divider />
            <v-card-title>
              <v-card-text>※ 変更完了後にログイン画面に戻ります。 </v-card-text>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="updatePassword">
                <v-text-field
                  v-model="getUserEmail"
                  prepend-inner-icon="mdi-email-outline"
                  label="登録されているメールアドレスを入力してください"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-text-field
                  v-model="getUserPassword"
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
                  <v-btn color="primary" @click="selectedUpdatePassword = 'closeUpdatePassword'">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-spacer />

                  <v-btn
                    color="success"
                    @click="updatePassword"
                    :loading="loadingResetPassword"
                    :disabled="loadingResetPassword"
                  >
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
import StateUserEmail from '@/mixins/UserInfo/StateUserEmail.vue'
import StateUserPassword from '@/mixins/UserInfo/StateUserPassword.vue'
export default {
  mixins: [FormValidation, LoadingView, StateUserEmail, StateUserPassword],
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
      loadingResetPassword: false,
      validate: true,
      showPassword: false,
      showEditPassword: false
    }
  },
  methods: {
    updatePassword() {
      if (!this.updateUserPassword || !this.getUserPassword || !this.getUserEmail) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingResetPassword'
      this.$store.dispatch('modules/auth/updatePassword', {
        updatePassword: this.updateUserPassword,
        email: this.getUserEmail,
        password: this.getUserPassword
      })
      this.updateUserPassword = ''
      this.getUserEmail = ''
      this.getUserPassword = ''
      this.$refs.form.reset()
      this.$emit('update:selectedUpdatePassword', 'closeUpdatePassword')
    }
  }
}
</script>

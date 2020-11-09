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
                  v-model="updateUser.email"
                  prepend-inner-icon="mdi-email-outline"
                  label="登録されているメールアドレスを入力してください"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-text-field
                  v-model="updateUser.loginPassword"
                  :type="showPassword ? 'text' : 'Password'"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="現在のPassword(6文字以上)"
                  :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
                  counter="72"
                  @click:append="showPassword = !showPassword"
                />
                <v-text-field
                  v-model="updateUser.newPassword"
                  :type="showEditPassword ? 'text' : 'Password'"
                  prepend-inner-icon="mdi-lock-reset"
                  :append-icon="showEditPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="新しいPassword(6文字以上)"
                  :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
                  counter="72"
                  @click:append="showEditPassword = !showEditPassword"
                />
                <v-card-actions>
                  <v-btn color="primary" @click="selectedUpdatePassword = 'closeUpdatePassword'">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                  <v-spacer />

                  <v-btn
                    color="success"
                    :loading="loadingResetPassword"
                    :disabled="loadingResetPassword"
                    @click="updatePassword"
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

export default {
  components: {},
  mixins: [FormValidation, LoadingView],
  props: {
    updatePasswordDialog: {
      type: Boolean,
      required: true
    },
    selectedUpdateUserInfo: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      updateUser: {
        email: '',
        loginPassword: '',
        newPassword: ''
      },
      loadingResetPassword: false,
      showPassword: false,
      showEditPassword: false
    }
  },
  computed: {
    selectedUpdatePassword: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(closeUpdatePassword) {
        this.$emit('update:selected-update-password', closeUpdatePassword)
        this.$refs.form.reset()
      }
    }
  },
  methods: {
    async updatePassword() {
      const updateUser = this.updateUser
      if (!updateUser.email || !updateUser.loginPassword || !updateUser.newPassword) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingResetPassword'
      await this.$store.dispatch('modules/user/userInfo/updatePassword', {
        updatePassword: updateUser.newPassword,
        email: updateUser.email,
        password: updateUser.loginPassword
      })
      this.$emit('update:selected-update-password', 'closeUpdatePassword')
      this.$refs.form.reset()
    }
  }
}
</script>

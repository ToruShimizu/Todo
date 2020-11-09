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
            <v-divider />
            <v-card-title>
              <v-card-text>
                登録されているメールアドレスと
                <br />パスワードを入力してください
              </v-card-text>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation @submit.prevent="deleteUser">
                <v-text-field
                  v-model="deleteUser.email"
                  prepend-inner-icon="mdi-email-outline"
                  label="登録されているメールアドレス"
                  :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                  clearable
                />
                <v-text-field
                  v-model="deleteUser.password"
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
                  <v-btn
                    color="error"
                    @click="deleteAccount"
                    :loading="loadingDeleteUser"
                    :disabled="loadingDeleteUser"
                  >
                    <v-icon left> mdi-account-multiple-remove-outline </v-icon>削除
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
      deleteUser: {
        email: '',
        password: ''
      },
      loadingDeleteUser: false,
      showPassword: false
    }
  },
  computed: {
    selectedDeleteUser: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selected-delete-user', value)
        this.deleteUser.email = ''
        this.deleteUser.password = ''
        this.$refs.form.reset()
      }
    }
  },
  methods: {
    deleteAccount() {
      if (!this.deleteUser.password || !this.deleteUser.email) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingDeleteUser'
      this.$store.dispatch('modules/user/userInfo/deleteAccount', {
        email: this.deleteUser.email,
        password: this.deleteUser.password
      })
      this.deleteUser.email = ''
      this.deleteUser.password = ''
      this.loader = null
      this.$refs.form.reset()
      this.$emit('update:selected-delete-user', 'closeDeleteUser')
    }
  }
}
</script>

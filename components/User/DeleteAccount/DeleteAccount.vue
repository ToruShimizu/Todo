<template>
  <v-dialog
    v-model="deleteAccountDialog"
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
            <v-form ref="form" lazy-validation>
              <v-text-field
                v-model="editUser.email"
                prepend-inner-icon="mdi-email-outline"
                label="登録されているメールアドレス"
                :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
                clearable
              />
              <v-text-field
                v-model="editUser.password"
                :type="showPassword ? 'text' : 'Password'"
                prepend-inner-icon="mdi-lock-outline"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                label="現在のPassword(6文字以上)"
                :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
                counter="72"
                @click:append="showPassword = !showPassword"
              />
              <v-card-actions>
                <v-btn color="primary" @click="selectedDeleteAccount = 'closeDeleteAccount'">
                  <v-icon left>mdi-login-variant</v-icon>戻る
                </v-btn>
                <v-spacer />
                <v-btn
                  color="error"
                  :loading="loadingDeleteUser"
                  :disabled="loadingDeleteUser"
                  @click="handleDeleteAccount"
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
</template>

<script>
import { mapActions } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'
import LoadingView from '@/mixins/LoadingView.vue'

export default {
  mixins: [FormValidation, LoadingView],
  props: {
    deleteAccountDialog: {
      type: Boolean,
      required: true
    },
    selectEditUserInfo: {
      type: String,
      required: false,
      default: ''
    },
    editUser: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data() {
    return {
      loadingDeleteUser: false,
      showPassword: false
    }
  },
  computed: {
    selectedDeleteAccount: {
      get() {
        return this.selectEditUserInfo
      },
      set(closeDeleteAccount) {
        this.$emit('update:close-delete-account', closeDeleteAccount)
        this.$refs.form.reset()
      }
    }
  },
  methods: {
    async handleDeleteAccount() {
      const editUser = this.editUser
      if (!editUser.password || !editUser.email) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingDeleteUser'
      await this.deleteAccount({
        email: editUser.email,
        password: editUser.password
      })
      this.$emit('update:selected-delete-user', 'closeDeleteUser')
      this.loader = null
    },
    ...mapActions('modules/user/userInfo', ['deleteAccount'])
  }
}
</script>

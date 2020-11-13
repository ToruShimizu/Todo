<template>
  <!-- eslint-disable  -->

  <v-dialog
    v-model="updatePasswordDialog"
    persistent
    max-width="500px"
    transition="scroll-y-transition"
  >
    <!-- eslint-disable  -->

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
            <v-form ref="form" lazy-validation @click="handleUpdatePassword">
              <v-text-field
                v-model="editUser.email"
                prepend-inner-icon="mdi-email-outline"
                label="登録されているメールアドレスを入力してください"
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
              <v-text-field
                v-model="editUser.editPassword"
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
                  @click="handleUpdatePassword"
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
</template>

<script>
import { mapActions } from 'vuex'
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
    selectUpdateUserInfo: {
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
      loadingResetPassword: false,
      showPassword: false,
      showEditPassword: false
    }
  },
  computed: {
    selectedUpdatePassword: {
      get() {
        return this.selectUpdateUserInfo
      },
      set(closeUpdatePassword) {
        this.$emit('update:close-update-password', closeUpdatePassword)
        this.$refs.form.reset()
      }
    }
  },
  methods: {
    async handleUpdatePassword() {
      const editUser = this.editUser
      let loader = this.loader
      loader = null
      if (!editUser.email || !editUser.password || !editUser.editPassword) {
        this.$refs.form.validate()
        return
      }
      loader = 'loadingResetPassword'
      await this.updatePassword({
        updatePassword: editUser.editPassword,
        email: editUser.email,
        password: editUser.password
      })
      this.$emit('update:close-update-password', 'closeUpdatePassword')
    },
    ...mapActions('modules/user/userInfo', ['updatePassword'])
  }
}
</script>

<template>
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
            <v-form ref="form" lazy-validation @click="handleUpdatePassword">
              <FormUserEmail :user-email.sync="editUser.email" :email-label="emailLabel" />
              <FormUserPassword
                :user-password.sync="editUser.password"
                :password-label="passwordLabel"
              />
              <v-text-field
                v-model="editUser.editPassword"
                label="'新しいパスワード'"
                :type="showEditPassword ? 'text' : 'Password'"
                prepend-inner-icon="mdi-lock-reset"
                :append-icon="showEditPassword ? 'mdi-eye' : 'mdi-eye-off'"
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
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormUserPassword from '@/components/commonParts/user/form/FormUserPassword'
import FormValidation from '@/mixins/FormValidation.vue'
import LoadingView from '@/mixins/LoadingView.vue'

export default {
  components: {
    FormUserEmail,
    FormUserPassword
  },
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
      showEditPassword: false,
      emailLabel: 'メールアドレス',
      passwordLabel: '現在のパスワード'
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
      console.log(editUser)
      this.loader = null
      if (!editUser.email || !editUser.password || !editUser.editPassword) {
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingResetPassword'
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

<template>
  <FormDialog :form-dialog="updatePasswordDialog">
    <template v-slot:dialog>
      <FormView title="パスワード変更">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text> ※ 変更完了後にログイン画面に戻ります。 </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @click="handleUpdatePassword">
            <!-- メールアドレス入力 -->
            <FormUserEmail :user-email.sync="editUser.email" email-label="現在のメールアドレス" />
            <!-- 現在のパスワード入力 -->
            <FormUserPassword
              :user-password.sync="editUser.password"
              :show-password="showUserPassword"
              @handle-show-password="showUserPassword = !showUserPassword"
              password-label="現在のパスワード"
            />
            <!-- 新しいパスワード入力 -->
            <FormUserPassword
              :user-password.sync="editUser.editPassword"
              :show-password="showEditPassword"
              @handle-show-password="showEditPassword = !showEditPassword"
              password-label="新しいパスワード"
            />
            <SaveAndCloseButton
              close-button-title="close"
              save-button-title="save"
              icon="mdi-account-key"
              @save-button="handleUpdatePassword"
              @close-button="selectedUpdatePassword = 'closeUpdatePassword'"
            />
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    updatePasswordDialog: {
      type: Boolean,
      required: true
    },
    selectUpdateUserInfo: {
      type: String,
      default: ''
    },
    editUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showUserPassword: false,
      showEditPassword: false,
      loading: false
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
    // パスワード更新ボタン
    async handleUpdatePassword() {
      const editUser = this.editUser
      if (!editUser.email || !editUser.password || !editUser.editPassword) {
        this.$refs.form.validate()
        return
      }
      // ローディングをON
      this.loading = true
      await this.updatePassword({
        updatePassword: editUser.editPassword,
        email: editUser.email,
        password: editUser.password
      })
      this.$emit('update:close-update-password', 'closeUpdatePassword')
      // ローディングをOFF
      this.loading = false
    },
    ...mapActions('modules/user/userInfo', ['updatePassword'])
  }
}
</script>

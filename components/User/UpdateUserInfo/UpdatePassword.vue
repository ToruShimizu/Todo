<template>
  <FormDialog :form-dialog="updatePasswordDialog">
    <template v-slot:dialog>
      <FormView :title="'パスワード変更'">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text> ※ 変更完了後にログイン画面に戻ります。 </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @click="handleUpdatePassword">
            <FormUserEmail
              :user-email.sync="editUser.email"
              :email-label="'現在のメールアドレス'"
            />
            <FormUserPassword
              :user-password="editUser.password"
              :show-password="showUserPassword"
              @handle-show-password="toggleShowUserPassword"
              :password-label="'現在のパスワード'"
            />
            <FormUserPassword
              :user-password.sync="editUser.editPassword"
              :show-password.sync="showEditPassword"
              @handle-show-password="toggleShowEditPassword"
              :password-label="'新しいパスワード'"
            />
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              @save-button="handleUpdatePassword"
              @close-button="selectedUpdatePassword = 'closeUpdatePassword'"
            >
              <template v-slot:save><v-icon left>mdi-account-key-outline </v-icon></template>
            </SaveAndCloseButton>
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormUserPassword from '@/components/commonParts/user/form/FormUserPassword'
import FormView from '@/components/commonParts/form/FormView'
import FormCardText from '@/components/commonParts/card/FormCardText'
import FormDialog from '@/components/commonParts/dialog/FormDialog'

export default {
  components: {
    FormUserEmail,
    FormUserPassword,
    SaveAndCloseButton,
    FormView,
    FormCardText,
    FormDialog
  },
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
      showUserPassword: false,
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
      if (!editUser.email || !editUser.password || !editUser.editPassword) {
        this.$refs.form.validate()
        return
      }
      await this.updatePassword({
        updatePassword: editUser.editPassword,
        email: editUser.email,
        password: editUser.password
      })
      this.$emit('update:close-update-password', 'closeUpdatePassword')
    },
    toggleShowUserPassword(showPassword) {
      this.showUserPassword = !this.showUserPassword
    },
    toggleShowEditPassword() {
      this.showEditPassword = !this.showEditPassword
    },
    ...mapActions('modules/user/userInfo', ['updatePassword'])
  }
}
</script>

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
              :user-password.sync="editUser.password"
              :show-password="showUserPassword"
              @handle-show-password="toggleShowUserPassword"
              :password-label="'現在のパスワード'"
            />
            <FormUserPassword
              :user-password.sync="editUser.editPassword"
              :show-password="showEditPassword"
              @handle-show-password="toggleShowEditPassword"
              :password-label="'新しいパスワード'"
            />
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              :loading="loading"
              :loader="loader"
              :icon="'mdi-account-key'"
              @stop-loading="stopLoading"
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
import SaveAndCloseButton from '@/components/common-parts/button/SaveAndCloseButton'
import FormUserEmail from '@/components/common-parts/user/form/FormUserEmail'
import FormUserPassword from '@/components/common-parts/user/form/FormUserPassword'
import FormView from '@/components/common-parts/form/FormView'
import FormCardText from '@/components/common-parts/card/FormCardText'
import FormDialog from '@/components/common-parts/dialog/FormDialog'

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
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    loader: {
      type: null,
      required: false,
      default: null
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
      console.log(editUser)
      if (!editUser.email || !editUser.password || !editUser.editPassword) {
        this.$refs.form.validate()
        return
      }
      this.startLoading()
      await this.updatePassword({
        updatePassword: editUser.editPassword,
        email: editUser.email,
        password: editUser.password
      })
      this.stopLoading()
      this.$emit('update:close-update-password', 'closeUpdatePassword')
    },
    toggleShowUserPassword(showPassword) {
      this.showUserPassword = !this.showUserPassword
    },
    toggleShowEditPassword() {
      this.showEditPassword = !this.showEditPassword
    },
    startLoading() {
      this.$emit('start-loading')
    },
    stopLoading() {
      this.$emit('stop-loading')
    },
    ...mapActions('modules/user/userInfo', ['updatePassword'])
  }
}
</script>

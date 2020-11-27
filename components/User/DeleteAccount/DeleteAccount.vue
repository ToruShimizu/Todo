<template>
  <FormDialog :form-dialog="deleteAccountDialog">
    <template v-slot:dialog>
      <FormView :title="'アカウント削除'">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text> ※ 削除後にログイン画面に戻ります。 </template>
          </FormCardText>
          <v-form ref="form" lazy-validation>
            <FormUserEmail
              :user-email.sync="editUser.email"
              :email-label="'現在のメールアドレス'"
            />
            <FormUserPassword
              :user-password.sync="editUser.password"
              :passwordLabel="'現在のパスワード'"
            />
            <v-card-actions class="justify-end">
              <CloseButton
                title="close"
                @close-button="selectedDeleteAccount = 'closeDeleteAccount'"
              />
              <DeleteButton
                :title="'delete'"
                :loading="loading"
                :loader="loader"
                :icon="'mdi-account-multiple-remove'"
                @delete-button="handleDeleteAccount"
                @stop-loading="stopLoading"
              />
            </v-card-actions>
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormUserPassword from '@/components/commonParts/user/form/FormUserPassword'
import DeleteButton from '@/components/commonParts/button/DeleteButton'
import CloseButton from '@/components/commonParts/button/CloseButton'
import FormView from '@/components/commonParts/form/FormView'
import FormCardText from '@/components/commonParts/card/FormCardText'
import FormDialog from '@/components/commonParts/dialog/FormDialog'

export default {
  components: {
    FormUserEmail,
    FormUserPassword,
    DeleteButton,
    CloseButton,
    FormView,
    FormCardText,
    FormDialog
  },
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
      this.startLoading()
      await this.deleteAccount({
        email: editUser.email,
        password: editUser.password
      })
      this.stopLoading()
      this.$emit('update:close-delete-account', 'closeDeleteAccount')
    },

    startLoading() {
      this.$emit('start-loading')
    },
    stopLoading() {
      this.$emit('stop-loading')
    },
    ...mapActions('modules/user/userInfo', ['deleteAccount'])
  }
}
</script>

<template>
  <FormDialog :form-dialog="deleteAccountDialog">
    <template v-slot:dialog>
      <FormView title="アカウント削除">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text> ※ 削除後にログイン画面に戻ります。 </template>
          </FormCardText>
          <v-form ref="form" lazy-validation>
            <!-- メールアドレス入力 -->
            <FormUserEmail :user-email.sync="editUser.email" email-label="現在のメールアドレス" />
            <!-- パスワード入力 -->
            <FormUserPassword
              :show-password="deleteAccountShowPassword"
              :user-password.sync="editUser.password"
              @handle-show-password="toggleDeleteAccountShowPassword"
              passwordLabel="現在のパスワード"
            />
            <v-card-actions class="justify-end">
              <CloseButton
                title="close"
                @close-button="selectedDeleteAccount = 'closeDeleteAccount'"
              />
              <DeleteButton
                title="delete"
                :loading="loading"
                :loader="loader"
                icon="mdi-account-multiple-remove"
                @delete-button="handleDeleteAccount"
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

export default {
  props: {
    deleteAccountDialog: {
      type: Boolean,
      required: true
    },
    selectEditUserInfo: {
      type: String,
      default: ''
    },
    editUser: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    loader: {
      type: null,
      default: null
    }
  },
  data() {
    return {
      deleteAccountShowPassword: false
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
      await this.deleteAccount({
        email: editUser.email,
        password: editUser.password
      })
      this.$emit('update:close-delete-account', 'closeDeleteAccount')
    },
    toggleDeleteAccountShowPassword() {
      this.deleteAccountShowPassword = !this.deleteAccountShowPassword
    },
    ...mapActions('modules/user/userInfo', ['deleteAccount'])
  }
}
</script>

<template>
  <FormDialog :form-dialog="deleteAccountDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-card-subtitle class="text-center font-italic">
          ※ 削除後にログイン画面に戻ります。
        </v-card-subtitle>

        <v-divider />
        <v-form ref="form" lazy-validation>
          <!-- メールアドレス入力 -->
          <v-row class="mx-2">
            <FormUserEmail :user-email.sync="editUser.email" email-label="現在のメールアドレス" />
          </v-row>
          <!-- パスワード入力 -->
          <v-row class="mx-2">
            <FormUserPassword
              :show-password="deleteAccountShowPassword"
              :user-password.sync="editUser.password"
              @handle-show-password="toggleDeleteAccountShowPassword"
              passwordLabel="現在のパスワード"
            />
          </v-row>
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
      </v-card>
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

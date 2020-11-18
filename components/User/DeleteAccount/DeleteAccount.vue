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
                <DeleteButton :title="'delete'" @delete-button="handleDeleteAccount"
                  ><template v-slot:deleteButton>
                    <v-icon left> mdi-account-multiple-remove-outline </v-icon></template
                  ></DeleteButton
                >
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
import DeleteButton from '@/components/commonParts/button/DeleteButton'
import CloseButton from '@/components/commonParts/button/CloseButton'

export default {
  components: {
    FormUserEmail,
    FormUserPassword,
    DeleteButton,
    CloseButton
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
    ...mapActions('modules/user/userInfo', ['deleteAccount'])
  }
}
</script>

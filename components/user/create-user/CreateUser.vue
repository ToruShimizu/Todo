<template>
  <FormDialog :form-dialog="createUserDialog">
    <template v-slot:dialog>
      <FormView title="新規作成">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text> ※ 作成後にログインします。 </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @submit.prevent="createUser">
            <FormUserName :user-name.sync="createNewUser.name" name-label="登録する名前" />
            <FormUserEmail
              :user-email.sync="createNewUser.email"
              email-label="登録するメールアドレス"
            />
            <FormUserPassword
              :user-password.sync="createNewUser.password"
              passwordLabel="登録するパスワード"
            />

            <SaveAndCloseButton
              close-button-title="close"
              save-button-title="save"
              :loading="createUserLoading"
              icon="mdi-account-plus"
              @close-button="closeCreateUser"
              @save-button="handleCreateUser"
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
    createUserDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      createNewUser: {
        name: '',
        email: '',
        password: ''
      },
      createUserLoading: false
    }
  },
  methods: {
    // ユーザー作成
    async handleCreateUser() {
      const createUser = this.createNewUser
      if (!createUser.password || !createUser.email || !createUser.name) {
        this.$refs.form.validate()
        return
      }
      // ローディングをON
      this.createUserLoading = true

      await this.createUser({
        email: createUser.email,
        password: createUser.password,
        userName: createUser.name
      })
      // ローディングをOFF
      this.createUserLoading = false
      this.closeCreateUser()
    },
    closeCreateUser() {
      this.$emit('close-create-user')
      this.$refs.form.reset()
    },

    ...mapActions('modules/user/auth', ['createUser'])
  }
}
</script>

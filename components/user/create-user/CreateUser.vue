<template>
  <FormDialog :form-dialog="createUserDialog">
    <template v-slot:dialog>
      <FormView :title="'新規作成'">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text> ※ 作成後にログインします。 </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @submit.prevent="createUser">
            <FormUserName :user-name.sync="createNewUser.name" :name-label="'登録する名前'" />
            <FormUserEmail
              :user-email.sync="createNewUser.email"
              :email-label="'登録するメールアドレス'"
            />
            <FormUserPassword
              :user-password.sync="createNewUser.password"
              :passwordLabel="'登録するパスワード'"
            />

            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              :loader="createUserLoader"
              :loading="createUserLoading"
              :icon="'mdi-account-plus'"
              @close-button="closeCreateUser"
              @save-button="handleCreateUser"
              @stop-loading="stopCreateUserLoading"
            />
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'
import FormUserName from '@/components/common-parts/user/form/FormUserName'
import FormUserEmail from '@/components/common-parts/user/form/FormUserEmail'
import FormUserPassword from '@/components/common-parts/user/form/FormUserPassword'
import SaveAndCloseButton from '@/components/common-parts/button/SaveAndCloseButton'
import FormView from '@/components/common-parts/form/FormView'
import FormCardText from '@/components/common-parts/card/FormCardText'
import FormDialog from '@/components/common-parts/dialog/FormDialog'

export default {
  components: {
    FormUserName,
    FormUserEmail,
    FormUserPassword,
    SaveAndCloseButton,
    FormView,
    FormCardText,
    FormDialog
  },

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
      createUserLoading: false,
      createUserLoader: null
    }
  },
  methods: {
    async handleCreateUser() {
      const createUser = this.createNewUser
      if (!createUser.password || !createUser.email || !createUser.name) {
        this.$refs.form.validate()
        return
      }
      this.startCreateUserLoading()
      await this.createUser({
        email: createUser.email,
        password: createUser.password,
        userName: createUser.name
      })
      this.stopCreateUserLoading()
    },
    closeCreateUser() {
      this.$emit('close-create-user')
      this.$refs.form.reset()
    },
    startCreateUserLoading() {
      this.createUserLoading = true
      this.loginLoader = this.createUserLoading
    },
    stopCreateUserLoading() {
      this.createUserLoading = false
      this.loginLoader = this.createUserLoading
    },

    ...mapActions('modules/user/auth', ['createUser'])
  }
}
</script>

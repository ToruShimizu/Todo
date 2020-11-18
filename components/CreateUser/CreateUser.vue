<template>
  <v-dialog
    v-model="createUserDialog"
    persistent
    max-width="500px"
    transition="scroll-y-transition"
  >
    <FormView :title="'新規作成'">
      <template v-slot:form>
        <FormCardText>
          <template v-slot:text> ※ 作成後にログインします。 </template>
        </FormCardText>
        <v-form ref="form" lazy-validation @submit.prevent="createUser">
          <FormUserName :user-name.sync="createUser.name" :name-label="'登録する名前'" />
          <FormUserEmail
            :user-email.sync="createUser.email"
            :email-label="'登録するメールアドレス'"
          />
          <FormUserPassword
            :user-password.sync="createUser.password"
            :passwordLabel="'登録するパスワード'"
          />

          <SaveAndCloseButton
            :close-button-title="'close'"
            :save-button-title="'save'"
            @close-button="closeCreateUser"
            @save-button="handleCreateUser"
          >
            <template v-slot:save>
              <v-icon left>mdi-account-plus</v-icon>
            </template>
          </SaveAndCloseButton>
        </v-form>
      </template>
    </FormView>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import FormUserName from '@/components/commonParts/user/form/FormUserName'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormUserPassword from '@/components/commonParts/user/form/FormUserPassword'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormView from '@/components/commonParts/form/FormView'
import FormCardText from '@/components/commonParts/card/FormCardText'

export default {
  components: {
    FormUserName,
    FormUserEmail,
    FormUserPassword,
    SaveAndCloseButton,
    FormView,
    FormCardText
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
      }
    }
  },
  methods: {
    async handleCreateUser() {
      const createUser = this.createNewUser
      if (!createUser.password || !createUser.email || !createUser.name) {
        this.$refs.form.validate()
        return
      }
      await this.createUser({
        email: createUser.email,
        password: createUser.password,
        userName: createUser.name
      })
    },
    closeCreateUser() {
      this.$emit('close-create-user')
      this.$refs.form.reset()
    },
    ...mapActions('modules/user/auth', ['createUser'])
  }
}
</script>
<style scoped>
.fill-width {
  width: 100%;
}
</style>

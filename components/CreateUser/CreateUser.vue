<template>
  <v-dialog
    v-model="createUserDialog"
    persistent
    max-width="500px"
    transition="scroll-y-transition"
  >
    <v-app>
      <v-col cols="12" sm="12" md="12">
        <v-card width="400px" class="mx-auto mt-5 text-center">
          <v-card-title class="text-center">
            <h4 class="fill-width">新規作成</h4>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="createUser">
              <p>
                ○○○@example.comとすることで、
                <br />サンプルのメールアドレスで作成することができます。
              </p>
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-app>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import FormUserName from '@/components/commonParts/user/form/FormUserName'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormUserPassword from '@/components/commonParts/user/form/FormUserPassword'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'

export default {
  components: {
    FormUserName,
    FormUserEmail,
    FormUserPassword,
    SaveAndCloseButton
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

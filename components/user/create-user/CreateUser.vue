<template>
  <FormDialog :form-dialog="createUserDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-card-subtitle class="text-center font-italic">
          ※ 作成後にログインします
        </v-card-subtitle>

        <v-divider />
        <v-form v-model="isValid" ref="form" lazy-validation>
          <v-row class="mx-2">
            <FormUserName :user-name.sync="createNewUser.name" name-label="登録する名前" />
          </v-row>
          <v-row class="mx-2">
            <FormUserEmail
              :user-email.sync="createNewUser.email"
              email-label="登録するメールアドレス"
            />
          </v-row>
          <v-row class="mx-2">
            <FormUserPassword
              :user-password.sync="createNewUser.password"
              passwordLabel="登録するパスワード"
            />
          </v-row>
          <AppButton
            :disabled="isValid"
            :loading="isRunning"
            color="success"
            @click="handleCreateUser"
            >保存する</AppButton
          >
          <AppButton :disabled="isRunning" outlined @click="closeCreateUser">
            キャンセルする
          </AppButton>
        </v-form>
      </v-card>
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
      isRunning: false,
      isValid: false,
      isOpened: false
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
      this.isRunning = true

      await this.createUser({
        email: createUser.email,
        password: createUser.password,
        userName: createUser.name
      })
      // ローディングをOFF
      this.isRunning = false
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

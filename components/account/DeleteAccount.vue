<template>
  <AppDialog :is-opened="isOpened" @close="$emit('close', false)">
    <v-card width="500px" class="mx-auto">
      <v-card-subtitle class="text-center font-italic">
        ※ 削除後にログイン画面に戻ります。
      </v-card-subtitle>

      <v-divider />
      <v-form ref="form" lazy-validation>
        <!-- メールアドレス入力 -->
        <v-row class="mx-2">
          <FormUserEmail
            :user-email.sync="deleteAccountInput.email"
            email-label="現在のメールアドレス"
          />
        </v-row>
        <!-- パスワード入力 -->
        <v-row class="mx-2">
          <FormUserPassword
            :show-password="isOpenedShowPassword"
            :user-password.sync="deleteAccountInput.password"
            passwordLabel="現在のパスワード"
            @handle-show-password="isOpenedShowPassword = !isOpenedShowPassword"
          />
        </v-row>
      </v-form>
      <template slot="buttons">
        <AppButton color="success" outlined @click="$emit('close', false)">閉じる </AppButton>

        <AppButton color="warning" :loading="isRunning" @click="handleDeleteAccount"
          >削除する
        </AppButton>
      </template>
    </v-card>
  </AppDialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  model: {
    prop: 'isOpened',
    event: 'close'
  },
  props: {
    isOpened: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      deleteAccountInput: {
        email: '',
        password: ''
      },
      isOpenedShowPassword: false,
      isRunning: false
    }
  },
  methods: {
    async handleDeleteAccount() {
      if (!this.deleteAccountInput.password || !this.deleteAccountInput.email) {
        this.$refs.form.validate()
        return
      }
      await this.deleteAccount({
        email: this.deleteAccountInput.email,
        password: this.deleteAccountInput.password
      })
      this.$emit('close', false)
    },
    ...mapActions('modules/user/userInfo', ['deleteAccount'])
  }
}
</script>

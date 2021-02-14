<template>
  <AppDialog :is-opened="isOpened" class="remove-account-dialog" @close="$emit('close', false)">
    <v-card-subtitle class="text-center font-italic">
      ※ 削除後にログイン画面に戻ります。
    </v-card-subtitle>

    <v-divider />
    <v-form ref="form" lazy-validation>
      <!-- メールアドレス入力 -->
      <v-row class="mx-2">
        <FormUserEmail
          :user-email.sync="removeAccountInput.email"
          email-label="現在のメールアドレス"
        />
      </v-row>
      <!-- パスワード入力 -->
      <v-row class="mx-2">
        <FormUserPassword
          :show-password="isOpenedShowPassword"
          :user-password.sync="removeAccountInput.password"
          passwordLabel="現在のパスワード"
          @handle-show-password="isOpenedShowPassword = !isOpenedShowPassword"
        />
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton color="success" outlined @click="$emit('close', false)">閉じる </AppButton>

      <AppButton color="warning" :loading="isRunning" @click="runRemoveAccount"
        >削除する
      </AppButton>
    </template>
  </AppDialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RemoveAccountDialog',
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
      removeAccountInput: {
        email: '',
        password: ''
      },
      isOpenedShowPassword: false,
      isRunning: false
    }
  },
  methods: {
    async runRemoveAccount() {
      if (!this.removeAccountInput.password || !this.removeAccountInput.email) {
        this.$refs.form.validate()
        return
      }
      await this.removeAccount({
        email: this.removeAccountInput.email,
        password: this.removeAccountInput.password
      })
      this.$emit('close', false)
    },
    ...mapActions('modules/user/userInfo', ['removeAccount'])
  }
}
</script>

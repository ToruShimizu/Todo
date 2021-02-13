<template>
  <AppDialog
    :is-opened="isOpened"
    class="reset-password-dialog"
    title="パスワード再設定"
    @close="$emit('close', false)"
  >
    <v-card-subtitle class="text-center font-italic">
      登録されているメールアドレスを入力してください。
      <br />パスワード再設定のURLが送信されます。
    </v-card-subtitle>

    <v-divider />
    <v-form ref="form" lazy-validation @submit.prevent="passwordReset">
      <v-row class="mx-2">
        <FormUserEmail
          :user-email.sync="resetUserPasswordInput.email"
          email-label="現在のメールアドレス"
        />
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton :loading="isRunning" :disabled="isValid" color="accent" @click="runResetPassword"
        >保存する
      </AppButton>
      <AppButton :disabled="isRunning" outlined @click="$emit('close', false)"
        >キャンセル
      </AppButton>
    </template>
  </AppDialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ResetPasswordDialog',
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
      resetUserPasswordInput: {
        email: ''
      },
      isRunning: false,
      isValid: false
    }
  },
  methods: {
    // パスワードリセット実行
    async runResetPassword() {
      if (this.resetUserPasswordInput.email === 'test@example.com') {
        // ローディングをON
        isRunning = true
        alert('テストユーザーはパスワードを再設定することはできません')
        return
      } else if (!this.resetUserPasswordInput.email) {
        this.$refs.form.validate()
        return
      }
      await this.resetPassword({
        email: this.resetUserPasswordInput.email
      })
      this.$emit('close', false)

      // ローディングをOFF
      isRunning = false
    },
    ...mapActions('modules/user/userInfo', ['resetPassword'])
  }
}
</script>

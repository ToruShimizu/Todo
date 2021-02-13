<template>
  <AppDialog :is-opened="isOpened" title="パスワード再設定" @close="$emit('close', false)">
    <v-card-subtitle class="text-center font-italic">
      登録されているメールアドレスを入力してください。
      <br />パスワード再設定のURLが送信されます。
    </v-card-subtitle>

    <v-divider />
    <v-form ref="form" lazy-validation @submit.prevent="passwordReset">
      <v-row class="mx-2">
        <FormUserEmail
          :user-email.sync="resetUserPassword.email"
          email-label="現在のメールアドレス"
        />
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton
        :loading="isRunning"
        :disabled="isValid"
        color="accent"
        @click="handleResetPassword"
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
      resetUserPassword: {
        email: ''
      },
      isRunning: false,
      isValid: false
    }
  },
  methods: {
    // パスワードリセット実行
    async handleResetPassword() {
      const resetUserPassword = this.resetUserPassword
      if (resetUserPassword.email === 'test@example.com') {
        // ローディングをON
        isRunning = true
        alert('テストユーザーはパスワードを再設定することはできません')
        return
      } else if (!resetUserPassword.email) {
        this.$refs.form.validate()
        return
      }
      await this.resetPassword({
        email: resetUserPassword.email
      })
      this.$emit('close', false)

      // ローディングをOFF
      isRunning = false
    },
    ...mapActions('modules/user/userInfo', ['resetPassword'])
  }
}
</script>

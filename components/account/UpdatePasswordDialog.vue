<template>
  <AppDialog
    :is-opened="isOpened"
    class="update-password-dialog"
    title="パスワード変更"
    @close="$emit('close', false)"
  >
    <v-card-subtitle class="text-center font-italic">
      ※ 変更完了後にログイン画面に戻ります。
    </v-card-subtitle>
    <v-divider />
    <v-form v-model="isValid" ref="form" lazy-validation @click="handleUpdatePassword">
      <!-- メールアドレス入力 -->
      <v-row class="mx-2">
        <FormUserEmail
          :user-email.sync="updatePasswordInput.email"
          email-label="現在のメールアドレス"
        />
      </v-row>
      <!-- 現在のパスワード入力 -->
      <v-row class="mx-2">
        <FormUserPassword
          :user-password.sync="updatePasswordInput.password"
          :show-password="isOpenedPassword"
          @handle-show-password="isOpenedPassword = !isOpenedPassword"
          password-label="現在のパスワード"
        />
      </v-row>
      <!-- 新しいパスワード入力 -->
      <v-row class="mx-2">
        <FormUserPassword
          :user-password.sync="updatePasswordInput.newPassword"
          :show-password="isOpenedNewPassword"
          @handle-show-password="isOpenedNewPassword = !isOpenedNewPassword"
          password-label="新しいパスワード"
        />
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton :disabled="isValid" outlined @click="runUpdatePassword">
        保存する
      </AppButton>
      <AppButton :loading="isRunning" color="success" outlined @click="$emit('close', false)">
        キャンセル
      </AppButton>
    </template>
  </AppDialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UpdatePasswordDialog',
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
      updatePasswordInput: {
        email: '',
        password: '',
        newPassword: ''
      },
      isOpenedPassword: false,
      isOpenedNewPassword: false,
      isRunning: false,
      isValid: false
    }
  },
  methods: {
    // パスワード更新ボタン
    async handleUpdatePassword() {
      if (
        !this.updatePasswordInput.email ||
        !this.updatePasswordInput.password ||
        !this.updatePasswordInput.editPassword
      ) {
        this.$refs.form.validate()
        return
      }
      // ローディングをON
      this.isRunning = true
      await this.updatePassword({
        updatePassword: this.updatePasswordInput.editPassword,
        email: this.updatePasswordInput.email,
        password: this.updatePasswordInput.password
      })
      this.$emit('close', false)
      // ローディングをOFF
      this.isRunning = false
    },
    ...mapActions('modules/user/userInfo', ['updatePassword'])
  }
}
</script>

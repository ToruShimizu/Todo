<template>
  <AppDialog
    :is-opened="isOpened"
    class="update-username-dialog"
    title="ユーザー名変更"
    @close="$emit('close', false)"
  >
    <v-card-subtitle class="text-center font-italic">
      現在登録されているユーザー名<br />
      <v-icon left>mdi-account-outline</v-icon>
      {{ gettersUserName }}さん
    </v-card-subtitle>
    <v-divider />
    <v-form ref="form" lazy-validation>
      <v-row class="mx-2">
        <FormUserName :user-name.sync="usernameInput" name-label="新しいユーザー名" />
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton :disabled="isValid" :loading="isRunning" outlined @click="runUpdateUserName">
        保存する
      </AppButton>
      <AppButton :disabled="isRunning" color="success" outlined @click="$emit('close', false)">
        キャンセル
      </AppButton>
    </template>
  </AppDialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UpdateUsernameDialog',
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
  computed: {
    ...mapGetters('modules/user/auth', ['gettersUserName'])
  },
  data() {
    return {
      usernameInput: '',
      isRunning: false,
      isValid: false
    }
  },
  methods: {
    async runUpdateUserName() {
      if (!this.usernameInput) {
        this.$refs.form.validate()
        return
      }
      // ローディングをON
      this.isRunning = true
      await this.updateUserName({
        username: this.usernameInput
      })
      this.$refs.form.reset()
      this.$emit('close', false)

      // ローディングをOFF
      this.isRunning = false
    },

    ...mapActions('modules/user/userInfo', ['updateUsername'])
  }
}
</script>

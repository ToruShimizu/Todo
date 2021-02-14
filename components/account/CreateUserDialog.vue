<template>
  <AppDialog
    :is-opened="isOpened"
    class="create-user-dialog"
    title="ユーザー作成"
    @close="$emit('close', false)"
  >
    <v-card-subtitle class="text-center font-italic">
      ※ 作成後にログインします
    </v-card-subtitle>

    <v-divider />
    <v-form v-model="isValid" ref="form" lazy-validation>
      <v-row class="mx-2">
        <FormUserName :user-name.sync="createUserInput.name" name-label="登録する名前" />
      </v-row>
      <v-row class="mx-2">
        <FormUserEmail
          :user-email.sync="createUserInput.email"
          email-label="登録するメールアドレス"
        />
      </v-row>
      <v-row class="mx-2">
        <FormUserPassword
          :user-password.sync="createUserInput.password"
          passwordLabel="登録するパスワード"
        />
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton :disabled="isValid" :loading="isRunning" @click="runCreateUser"
        >保存する
      </AppButton>
      <AppButton :disabled="isRunning" color="success" outlined @click="$emit('close', false)">
        キャンセル
      </AppButton>
    </template>
  </AppDialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CreateUserDialog',
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
      createUserInput: {
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
    async runCreateUser() {
      if (
        !this.createUserInput.password ||
        !this.createUserInput.email ||
        !this.createUserInput.name
      ) {
        this.$refs.form.validate()
        return
      }
      // ローディングをON
      this.isRunning = true

      await this.createUser({
        email: createUserInput.email,
        password: createUserInput.password,
        userName: createUserInput.name
      })
      // ローディングをOFF
      this.isRunning = false
      this.$emit('close', false)
    },

    ...mapActions('modules/user/auth', ['createUser'])
  }
}
</script>

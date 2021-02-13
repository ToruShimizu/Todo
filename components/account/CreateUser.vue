<template>
  <AppDialog :is-opened="isOpened" title="ユーザー作成" @close="$emit('close', false)">
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
    </v-form>
    <template slot="buttons">
      <AppButton :disabled="isValid" :loading="isRunning" @click="handleCreateUser"
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
      this.$emit('close', false)
    },

    ...mapActions('modules/user/auth', ['createUser'])
  }
}
</script>

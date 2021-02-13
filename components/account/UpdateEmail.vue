<template>
  <AppDialog :is-opened="isOpened" title="メールアドレス変更" @close="$emit('close', false)">
    <v-card-subtitle class="text-center font-italic">
      現在登録されているメールアドレス<br />
      <v-icon left>mdi-email-outline</v-icon>
      {{ gettersUserEmail }}
    </v-card-subtitle>

    <v-divider />
    <v-form v-model="isValid" ref="form" lazy-validation>
      <v-row class="mx-2">
        <FormUserEmail :user-email.sync="updateEmailInput" email-label="新しいメールアドレス" />
      </v-row>
    </v-form>
    <template slot="buttons">
      <AppButton :disabled="isValid" @click="handleUpdateEmail">
        保存する
      </AppButton>
      <AppButton :loading="isRunning" color="success" outlined @click="$emit('close', false)">
        キャンセル
      </AppButton>
    </template>
  </AppDialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
      updateEmailInput: '',
      isRunning: false,
      isValid: false
    }
  },
  computed: {
    ...mapGetters('modules/user/auth', ['gettersUserEmail'])
  },
  methods: {
    async handleUpdateEmail() {
      if (!this.updateEmailInput) this.$refs.form.validate()
      // ローディングをON
      this.isRunning = true
      await this.updateEmail({
        email: this.updateEmailInput
      })
      this.$emit('close', false)
      // ローディングをOFF
      this.isRunning = false
    },
    ...mapActions('modules/user/userInfo', ['updateEmail'])
  }
}
</script>

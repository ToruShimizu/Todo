<template>
  <FormDialog :form-dialog="updateEmailDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-card-subtitle class="text-center font-italic">
          現在登録されているメールアドレス<br />
          <v-icon left>mdi-email-outline</v-icon>
          {{ gettersUserEmail }}
        </v-card-subtitle>

        <v-divider />
        <v-form v-model="isValid" ref="form" lazy-validation @submit.prevent="updateEmail">
          <v-row class="mx-2">
            <FormUserEmail :user-email.sync="editUser.email" email-label="新しいメールアドレス" />
          </v-row>
          <v-row class="mx-2" justify="end">
            <AppButton :disabled="isValid" @click="handleUpdateEmail">
              保存する
            </AppButton>
            <AppButton
              :loading="isRunning"
              color="success"
              outlined
              @click="selectUpdateEmail = 'closeUpdateEmail'"
            >
              キャンセル
            </AppButton>
          </v-row>
        </v-form>
      </v-card>
    </template>
  </FormDialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    updateEmailDialog: {
      type: Boolean,
      required: true
    },
    selectUpdateUserInfo: {
      type: String,
      default: ''
    },
    editUser: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isRunning: false,
      isValid: false
    }
  },
  computed: {
    selectUpdateEmail: {
      get() {
        return this.selectEditUserInfo
      },
      set(closeUpdateEmail) {
        this.$refs.form.reset()
        this.editUser.email = ''
        this.$emit('update:close-update-email', closeUpdateEmail)
      }
    },
    ...mapGetters('modules/user/auth', ['gettersUserEmail'])
  },
  methods: {
    async handleUpdateEmail() {
      const editUserEmail = this.editUser.email
      if (!editUserEmail) this.$refs.form.validate()
      // ローディングをON
      this.isRunning = true
      await this.updateEmail({
        email: editUserEmail
      })
      this.$emit('close-update-email', 'closeUpdateEmail')
      // ローディングをOFF
      this.isRunning = false
    },
    ...mapActions('modules/user/userInfo', ['updateEmail'])
  }
}
</script>

<template>
  <FormDialog :form-dialog="updateEmailDialog">
    <template v-slot:dialog>
      <FormView title="メールアドレス変更">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text>
              現在登録されているメールアドレス<br /><v-icon left>mdi-email-outline</v-icon
              >{{ gettersUserEmail }}
            </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @submit.prevent="updateEmail">
            <FormUserEmail :user-email.sync="editUser.email" email-label="新しいメールアドレス" />
            <SaveAndCloseButton
              close-button-title="close"
              save-button-title="save"
              :loading="loading"
              :loader="loader"
              icon="mdi-email-edit"
              @stop-loading="stopLoading"
              @save-button="handleUpdateEmail"
              @close-button="selectUpdateEmail = 'closeUpdateEmail'"
            />
          </v-form>
        </template>
      </FormView>
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
    },
    loading: {
      type: Boolean,
      default: false
    },
    loader: {
      type: null,
      default: null
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
      if (!editUserEmail) {
        this.$refs.form.validate()
        return
      }
      this.startLoading()
      await this.updateEmail({
        email: editUserEmail
      })
      this.$emit('close-update-email', 'closeUpdateEmail')
    },
    startLoading() {
      this.$emit('start-loading')
    },
    stopLoading() {
      this.$emit('stop-loading')
    },
    ...mapActions('modules/user/userInfo', ['updateEmail'])
  }
}
</script>

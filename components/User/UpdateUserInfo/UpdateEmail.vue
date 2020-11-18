<template>
  <FormDialog :form-dialog="updateEmailDialog">
    <template v-slot:dialog>
      <FormView :title="'メールアドレス変更'">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text>
              現在登録されているメールアドレス<br /><v-icon left>mdi-email-outline</v-icon
              >{{ gettersUserEmail }}
            </template>
          </FormCardText>
          <FormUserEmail :user-email.sync="editUser.email" :email-label="'新しいメールアドレス'" />
          <v-form ref="form" lazy-validation @submit.prevent="updateEmail">
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              @save-button="handleUpdateEmail"
              @close-button="selectUpdateEmail = 'closeUpdateEmail'"
            >
              <template v-slot:save><v-icon left>mdi-email-edit-outline</v-icon></template>
            </SaveAndCloseButton>
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormView from '@/components/commonParts/form/FormView'
import FormCardText from '@/components/commonParts/card/FormCardText'
import FormDialog from '@/components/commonParts/dialog/FormDialog'

export default {
  components: {
    FormUserEmail,
    SaveAndCloseButton,
    FormView,
    FormCardText,
    FormDialog
  },
  props: {
    updateEmailDialog: {
      type: Boolean,
      required: true
    },
    selectUpdateUserInfo: {
      type: String,
      required: false,
      default: ''
    },
    editUser: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  computed: {
    selectUpdateEmail: {
      get() {
        return this.selectEditUserInfo
      },
      set(closeUpdateEmail) {
        this.$emit('update:close-update-email', closeUpdateEmail)
        this.$refs.form.reset()
      }
    },
    ...mapGetters('modules/user/auth', ['gettersUserEmail'])
  },
  methods: {
    async handleUpdateEmail() {
      const editUserEmail = this.editUser.email
      console.log(editUserEmail)
      if (!editUserEmail) {
        this.$refs.form.validate()
        return
      }
      await this.updateEmail({
        email: editUserEmail
      })
      this.$emit('update:close-update-email', 'closeUpdateEmail')
    },
    ...mapActions('modules/user/userInfo', ['updateEmail'])
  }
}
</script>

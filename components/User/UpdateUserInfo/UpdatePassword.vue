<template>
  <FormDialog :form-dialog="updatePasswordDialog">
    <template v-slot:dialog>
      <FormView :title="'パスワード変更'">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text> ※ 変更完了後にログイン画面に戻ります。 </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @click="handleUpdatePassword">
            <FormUserEmail
              :user-email.sync="editUser.email"
              :email-label="'現在のメールアドレス'"
            />
            <FormUserPassword
              :user-password.sync="editUser.password"
              :password-label="'現在のパスワード'"
            />
            <v-text-field
              v-model="editUser.editPassword"
              label="'新しいパスワード'"
              :type="showEditPassword ? 'text' : 'Password'"
              prepend-inner-icon="mdi-lock-reset"
              :append-icon="showEditPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
              counter="72"
              @click:append="showEditPassword = !showEditPassword"
            />
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              @save-button="handleUpdatePassword"
              @close-button="selectedUpdatePassword = 'closeUpdatePassword'"
            >
              <template v-slot:save><v-icon left>mdi-account-key-outline </v-icon></template>
            </SaveAndCloseButton>
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormUserPassword from '@/components/commonParts/user/form/FormUserPassword'
import FormView from '@/components/commonParts/form/FormView'
import FormCardText from '@/components/commonParts/card/FormCardText'
import FormValidation from '@/mixins/FormValidation.vue'
import FormDialog from '@/components/commonParts/dialog/FormDialog'

export default {
  mixins: [FormValidation],
  components: {
    FormUserEmail,
    FormUserPassword,
    SaveAndCloseButton,
    FormView,
    FormCardText,
    FormDialog
  },
  props: {
    updatePasswordDialog: {
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
  data() {
    return {
      showEditPassword: false
    }
  },
  computed: {
    selectedUpdatePassword: {
      get() {
        return this.selectUpdateUserInfo
      },
      set(closeUpdatePassword) {
        this.$emit('update:close-update-password', closeUpdatePassword)
        this.$refs.form.reset()
      }
    }
  },
  methods: {
    async handleUpdatePassword() {
      const editUser = this.editUser
      if (!editUser.email || !editUser.password || !editUser.editPassword) {
        this.$refs.form.validate()
        return
      }
      await this.updatePassword({
        updatePassword: editUser.editPassword,
        email: editUser.email,
        password: editUser.password
      })
      this.$emit('update:close-update-password', 'closeUpdatePassword')
    },
    ...mapActions('modules/user/userInfo', ['updatePassword'])
  }
}
</script>

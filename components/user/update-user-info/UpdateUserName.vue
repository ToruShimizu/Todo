<template>
  <FormDialog :form-dialog="updateUserNameDialog">
    <template v-slot:dialog>
      <FormView :title="'ユーザー名変更'">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text>
              現在登録されているユーザー名<br />
              <v-icon left>mdi-account-outline</v-icon>{{ gettersUserName }}さん
            </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @submit.prevent="updateUserName">
            <FormUserName :user-name.sync="editUser.name" :name-label="'新しい名前'" />
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              :loading="loading"
              :loader="loader"
              :icon="'mdi-badge-account-horizontal'"
              @stop-loading="stopLoading"
              @save-button="handleUpdateUserName"
              @close-button="selectedUpdateUserName = 'closeUpdateUserName'"
            />
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormUserName from '@/components/common-parts/user/form/FormUserName'
import SaveAndCloseButton from '@/components/common-parts/button/SaveAndCloseButton'
import FormCardText from '@/components/common-parts/card/FormCardText'
import FormView from '@/components/common-parts/form/FormView'
import FormDialog from '@/components/common-parts/dialog/FormDialog'

export default {
  components: {
    FormUserName,
    SaveAndCloseButton,
    FormCardText,
    FormView,
    FormDialog
  },

  props: {
    updateUserNameDialog: {
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
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    },
    loader: {
      type: null,
      required: false,
      default: null
    }
  },
  computed: {
    selectedUpdateUserName: {
      get() {
        return this.selectEditUserInfo
      },
      set(closeUpdateUserName) {
        this.$emit('update:close-update-user-name', closeUpdateUserName)
        this.$refs.form.reset()
        this.editUser.name = ''
      }
    },
    ...mapGetters('modules/user/auth', ['gettersUserName'])
  },
  methods: {
    async handleUpdateUserName() {
      const editUser = this.editUser
      if (!editUser.name) {
        this.$refs.form.validate()
        return
      }
      this.startLoading()
      await this.updateUserName({
        userName: editUser.name
      })
      this.$refs.form.reset()
      this.$emit('update:close-update-user-name', 'closeUpdateUserName')
    },
    startLoading() {
      this.$emit('start-loading')
    },
    stopLoading() {
      this.$emit('stop-loading')
    },
    ...mapActions('modules/user/userInfo', ['updateUserName'])
  }
}
</script>

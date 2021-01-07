<template>
  <FormDialog :form-dialog="updateUserNameDialog">
    <template v-slot:dialog>
      <FormView title="ユーザー名変更">
        <template v-slot:form>
          <FormCardText>
            <template v-slot:text>
              現在登録されているユーザー名<br />
              <v-icon left>mdi-account-outline</v-icon>{{ gettersUserName }}さん
            </template>
          </FormCardText>
          <v-form ref="form" lazy-validation @submit.prevent="updateUserName">
            <FormUserName :user-name.sync="editUser.name" name-label="新しいユーザー名" />
            <SaveAndCloseButton
              close-button-title="close"
              save-button-title="save"
              :loading="loading"
              :loader="loader"
              icon="mdi-badge-account-horizontal"
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

export default {
  props: {
    updateUserNameDialog: {
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

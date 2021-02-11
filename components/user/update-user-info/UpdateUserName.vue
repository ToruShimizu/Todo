<template>
  <FormDialog :form-dialog="updateUserNameDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-card-subtitle class="text-center font-italic">
          現在登録されているユーザー名<br />
          <v-icon left>mdi-account-outline</v-icon>
          {{ gettersUserName }}さん
        </v-card-subtitle>
        <v-divider />
        <v-form ref="form" lazy-validation @submit.prevent="updateUserName">
          <v-row class="mx-2">
            <FormUserName :user-name.sync="editUser.name" name-label="新しいユーザー名" />
          </v-row>
          <v-row class="mx-2" justify="end">
            <SaveAndCloseButton
              close-button-title="close"
              save-button-title="save"
              :loading="loading"
              icon="mdi-badge-account-horizontal"
              @save-button="handleUpdateUserName"
              @close-button="selectedUpdateUserName = 'closeUpdateUserName'"
            />
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
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async handleUpdateUserName() {
      const editUser = this.editUser
      if (!editUser.name) {
        this.$refs.form.validate()
        return
      }
      // ローディングをON
      this.loading = true
      await this.updateUserName({
        userName: editUser.name
      })
      this.$refs.form.reset()
      this.$emit('update:close-update-user-name', 'closeUpdateUserName')
      // ローディングをOFF
      this.loading = false
    },

    ...mapActions('modules/user/userInfo', ['updateUserName'])
  }
}
</script>

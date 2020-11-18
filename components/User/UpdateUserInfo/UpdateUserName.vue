<template>
  <!-- eslint-disable  -->

  <v-dialog
    v-model="updateUserNameDialog"
    persistent
    max-width="400px"
    transition="scroll-y-transition"
  >
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
            @save-button="handleUpdateUserName"
            @close-button="selectedUpdateUserName = 'closeUpdateUserName'"
          >
            <template v-slot:save
              ><v-icon left>mdi-badge-account-horizontal-outline</v-icon>
            </template>
          </SaveAndCloseButton>
        </v-form>
      </template>
    </FormView>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormUserName from '@/components/commonParts/user/form/FormUserName'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormCardText from '@/components/commonParts/card/FormCardText'
import FormView from '@/components/commonParts/form/FormView'

export default {
  components: {
    FormUserName,
    SaveAndCloseButton,
    FormCardText,
    FormView
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
      await this.updateUserName({
        userName: editUser.name
      })
      this.$emit('update:close-update-user-name', 'closeUpdateUserName')
    },
    ...mapActions('modules/user/userInfo', ['updateUserName'])
  }
}
</script>

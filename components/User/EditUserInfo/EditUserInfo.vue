<template>
  <div>
    <SelectEditUserInfo
      :open-edit-user-info.sync="selectEditUserInfo"
      :selected-edit-user-info-screen="selectedEditUserInfoScreen"
      @handle-select-user-image-file="handleSelectUserImageFile"
    />

    <UpdateUser
      :update-user-name-dialog="updateUserNameDialog"
      :close-update-user-name.sync="selectEditUserInfo"
    />

    <UpdateUserAvatar ref="updateUserAvatar" />

    <UpdateEmail
      :update-email-dialog="updateEmailDialog"
      :close-update-email.sync="selectEditUserInfo"
    />

    <UpdatePassword
      :update-password-dialog="updatePasswordDialog"
      :close-update-password.sync="selectEditUserInfo"
    />

    <DeleteAccount
      :delete-account-dialog="deleteAccountDialog"
      :close-delete-account.sync="selectEditUserInfo"
    />
  </div>
</template>
<script>
import SelectEditUserInfo from '@/components/User/EditUserInfo/SelectEditUserInfo'
import UpdateUser from '@/components/User/UpdateUserInfo/UpdateUserName'
import updateUserAvatar from '@/components/User/UpdateUserInfo/updateUserAvatar'
import UpdateEmail from '@/components/User/UpdateUserInfo/UpdateEmail'
import UpdatePassword from '@/components/User/UpdateUserInfo/UpdatePassword'
import DeleteAccount from '@/components/User/DeleteAccount/DeleteAccount'
export default {
  components: {
    updateUserAvatar,
    UpdateUser,
    UpdateEmail,
    UpdatePassword,
    DeleteAccount,
    SelectEditUserInfo
  },
  data() {
    return {
      selectEditUserInfo: '',
      updateUserNameDialog: false,
      updatePasswordDialog: false,
      updateEmailDialog: false,
      deleteAccountDialog: false
    }
  },
  computed: {
    selectedEditUserInfoScreen() {
      return this.selectEditUserInfoScreen()
    }
  },
  methods: {
    // ユーザー画面編集の選択
    selectEditUserInfoScreen() {
      let returnvalue
      switch (this.selectEditUserInfo) {
        // ユーザーネームの変更画面の開閉
        case 'openUpdateUserName':
          returnvalue = this.updateUserNameDialog = true
          break
        case 'closeUpdateUserName':
          returnvalue = this.updateUserNameDialog = false

          break
        // パスワード変更画面の開閉
        case 'openUpdatePassword':
          returnvalue = this.updatePasswordDialog = true
          break
        case 'closeUpdatePassword':
          returnvalue = this.updatePasswordDialog = false

          break
        // メールアドレス変更画面の開閉
        case 'openUpdateEmail':
          returnvalue = this.updateEmailDialog = true
          break
        case 'closeUpdateEmail':
          returnvalue = this.updateEmailDialog = false

          break
        // アカウント削除画面の開閉
        case 'openDeleteAccount':
          returnvalue = this.deleteAccountDialog = true
          break
        case 'closeDeleteAccount':
          returnvalue = this.deleteAccountDialog = false

          break
        default:
      }
      return returnvalue
    },
    handleSelectUserImageFile() {
      this.$refs.updateUserAvatar.selectUserImageFile()
    }
  }
}
</script>

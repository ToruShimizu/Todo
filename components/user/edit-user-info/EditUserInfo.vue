<template>
  <div>
    <SelectEditUserInfo
      :open-edit-user-info.sync="selectEditUserInfo"
      :selected-edit-user-info-screen="selectedEditUserInfoScreen"
      @handle-select-user-image-file="handleSelectUserImageFile"
    />

    <UpdateUser
      :edit-user="editUser"
      :update-user-name-dialog="updateUserNameDialog"
      :close-update-user-name.sync="selectEditUserInfo"
      :loading="editUserLoading"
      :loader="editUserLoader"
      @start-loading="startEditUserLoading"
      @stop-loading="stopEditUserLoading"
    />

    <UpdateUserAvatar ref="updateUserAvatar" />

    <UpdateEmail
      :loading="editUserLoading"
      :loader="editUserLoader"
      :edit-user="editUser"
      :update-email-dialog="updateEmailDialog"
      :close-update-email.sync="selectEditUserInfo"
      @start-loading="startEditUserLoading"
      @stop-loading="stopEditUserLoading"
    />

    <UpdatePassword
      :loading="editUserLoading"
      :loader="editUserLoader"
      :edit-user="editUser"
      :update-password-dialog="updatePasswordDialog"
      :close-update-password.sync="selectEditUserInfo"
      @start-loading="startEditUserLoading"
      @stop-loading="stopEditUserLoading"
    />

    <DeleteAccount
      :loading="editUserLoading"
      :loader="editUserLoader"
      :edit-user="editUser"
      :delete-account-dialog="deleteAccountDialog"
      :close-delete-account.sync="selectEditUserInfo"
      @start-loading="startEditUserLoading"
      @stop-loading="stopEditUserLoading"
    />
  </div>
</template>
<script>
import SelectEditUserInfo from '@/components/user/edit-user-info/SelectEditUserInfo'
import UpdateUser from '@/components/user/update-user-info/UpdateUserName'
import updateUserAvatar from '@/components/user/update-user-info/updateUserAvatar'
import UpdateEmail from '@/components/user/update-user-info/UpdateEmail'
import UpdatePassword from '@/components/user/update-user-info/UpdatePassword'
import DeleteAccount from '@/components/user/delete-account/DeleteAccount'
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
      editUser: {
        name: '',
        email: '',
        password: '',
        editPassword: ''
      },
      editUserLoading: false,
      editUserLoader: null,
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
    },
    startEditUserLoading() {
      this.editUserLoading = true
      this.editUserLoader = this.editUserLoading
    },
    stopEditUserLoading() {
      this.editUserLoading = false
      this.editUserLoader = this.editUserLoading
    }
  }
}
</script>

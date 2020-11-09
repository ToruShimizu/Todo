<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title grey--text text--darken-2"
          >ログインユーザー
        </v-list-item-title>
      </v-list-item-content>
      <!-- FIXME: コンポーネント化 -->

      <UpdateUser
        :update-user-name-dialog="updateUserNameDialog"
        @update:selected-update-user-name="selectedUpdateUserInfo = $event"
      />
      <UpdatePassword
        :update-password-dialog="updatePasswordDialog"
        @update:selected-update-password="selectedUpdateUserInfo = $event"
      />

      <UpdateEmail
        :update-email-dialog="updateEmailDialog"
        @update:selected-update-email-="selectedUpdateUserInfo = $event"
      />

      <DeleteLoginUser
        :delete-user-dialog="deleteUserDialog"
        @update:selected-delete-user="selectedUpdateUserInfo = $event"
      />
    </v-list-item>
    <v-divider />
    <v-list dense nav>
      <v-list-item-content v-if="login_user">
        <v-list-item-title class="title grey--text text--darken-2">
          <v-file-input
            ref="image"
            v-model="userAvatar"
            accept="image/*"
            show-size
            label="画像ファイルをアップロードしてください"
            prepend-icon="mdi-image"
            style="display: none"
            @change="selectUserAvatarFile"
          />
          <v-avatar max-width="50" max-height="50">
            <v-img v-if="photoURL" :src="photoURL" :lazy-src="photoURL" @click="selectUserAvatar">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-btn v-if="!photoURL" text>
              <v-icon @click="selectUserAvatar">mdi-account-outline</v-icon>
            </v-btn>
          </v-avatar>
          {{ gettersUserName }}
        </v-list-item-title>
        <v-list-item-title class="title grey--text text--darken-2">
          <v-icon>mdi-email-outline</v-icon>
          {{ gettersUserEmail }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item>
        <v-list-item-content v-if="!login_user">
          <v-list-item-title>ログインユーザーはいません</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />

    <v-list v-if="login_user" :update-user-info="updateUserInfo">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title grey--text text--darken-2"
            >ユーザー情報編集
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
      <!-- FIXME: コンポーネント化 -->
      <v-list-item @click="selectedUpdateUserInfo = 'openUpdateUserName'">
        <v-list-item-title>
          <v-btn text>
            <v-icon> mdi-badge-account-horizontal-outline </v-icon>
            ユーザー名変更
          </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectUserAvatar">
        <v-list-item-title>
          <v-btn text>
            <v-icon> mdi-file-account-outline </v-icon>
            プロフィール画像変更
          </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedUpdateUserInfo = 'openUpdateEmail'">
        <v-list-item-title>
          <v-btn text> <v-icon>mdi-email-edit-outline </v-icon>メールアドレス変更 </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedUpdateUserInfo = 'openUpdatePassword'">
        <v-list-item-title>
          <v-btn text> <v-icon>mdi-account-key-outline </v-icon>パスワード変更 </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedUpdateUserInfo = 'openDeleteUser'">
        <v-list-item-title>
          <v-btn text> <v-icon> mdi-account-remove-outline </v-icon>アカウント削除 </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import UpdateUser from '@/components/UpdateUserInfo/UpdateUserName'
import UpdateEmail from '@/components/UpdateUserInfo/UpdateEmail'
import UpdatePassword from '@/components/UpdateUserInfo/UpdatePassword'
import DeleteLoginUser from '@/components/UpdateUserInfo/DeleteUser'

export default {
  components: {
    UpdateUser,
    UpdateEmail,
    UpdatePassword,
    DeleteLoginUser
  },
  data() {
    return {
      selectedUpdateUserInfo: '',
      updateUserNameDialog: false,
      updatePasswordDialog: false,
      updateEmailDialog: false,
      deleteUserDialog: false,
      userAvatar: null
    }
  },
  computed: {
    // ユーザー情報編集の選択
    updateUserInfo() {
      return this.selectedUserInfo()
    },
    ...mapGetters('modules/user/auth', ['gettersUserName', 'photoURL', 'gettersUserEmail']),
    ...mapState('modules/user/auth', ['login_user'])
  },
  methods: {
    // 画像をクリックしした時にv-file-inputでファイルを選択できるようにする
    selectUserAvatar() {
      this.$refs.image.$refs.input.click()
    },
    // @changeメソッドでファイルに変換してfirestorageへの追加処理を呼び出す
    selectUserAvatarFile() {
      const userAvatarFile = this.userAvatar
      // <!-- FIXME: mapAction -->
      this.$store.dispatch('modules/user/userInfo/uploadUserAvatarFile', userAvatarFile)
    },
    // ユーザー画面編集の選択
    selectedUserInfo() {
      let returnvalue
      switch (this.selectedUpdateUserInfo) {
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
        case 'openDeleteUser':
          returnvalue = this.deleteUserDialog = true
          break
        case 'closeDeleteUser':
          returnvalue = this.deleteUserDialog = false

          break
        default:
      }
      return returnvalue
    }
  }
}
</script>

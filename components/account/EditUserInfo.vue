<template>
  <div>
    <v-list v-if="loginUser">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title white--text">ユーザー情報編集 </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider color="white" />

      <!-- ユーザー情報編集選択リスト -->
      <v-list-item @click="isOpenedUpdateUserNameDialog = true">
        <v-list-item-title class="white--text font-weight-bold">
          ユーザー情報変更
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="handleSelectUserImageFile">
        <v-list-item-title class="white--text font-weight-bold">
          プロフィール画像変更
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="isOpenedUpdateEmail = true">
        <v-list-item-title class="white--text font-weight-bold">
          メールアドレス変更
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="isOpenedUpdatePassword = true">
        <v-list-item-title class="white--text font-weight-bold">
          パスワード変更
        </v-list-item-title>
      </v-list-item>

      <v-list-item @click="isOpenedDeleteAccount = true">
        <v-list-item-title class="white--text font-weight-bold">
          アカウント削除
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <!-- ユーザー名変更ダイアログ -->
    <UpdateUserName v-model="isOpenedUpdateUserNameDialog" />
    <!-- プロフィール画像変更 -->
    <UpdateUserAvatar ref="updateUserAvatar" />

    <!-- メールアドレス変更ダイアログ -->
    <UpdateEmail v-model="isOpenedUpdateEmail" />
    <!-- パスワード変更ダイアログ -->
    <UpdatePassword v-model="isOpenedUpdatePassword" />
    <!-- アカウント削除ダイアログ -->
    <DeleteAccount v-model="isOpenedDeleteAccount" />
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      isOpenedUpdateUserNameDialog: false,
      isOpenedUpdateEmail: false,
      isOpenedUpdatePassword: false,
      isOpenedDeleteAccount: false
    }
  },
  computed: {
    ...mapState('modules/user/auth', ['loginUser'])
  },
  methods: {
    // 画像選択画面を開く
    handleSelectUserImageFile() {
      this.$refs.updateUserAvatar.selectUserImageFile()
    }
  }
}
</script>

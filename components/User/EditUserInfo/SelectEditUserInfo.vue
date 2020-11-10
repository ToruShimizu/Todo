<template>
  <div>
    <v-list v-if="login_user">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title grey--text text--darken-2"
            >ユーザー情報編集
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item @click="selectedEditUserInfo = 'openUpdateUserName'">
        <v-list-item-title>
          <v-btn text>
            <v-icon> mdi-badge-account-horizontal-outline </v-icon>
            ユーザー名変更
          </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <v-btn text @click="handleSelectUserImageFile">
            <v-icon> mdi-file-account-outline </v-icon>
            プロフィール画像変更
          </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedEditUserInfo = 'openUpdateEmail'">
        <v-list-item-title>
          <v-btn text> <v-icon>mdi-email-edit-outline </v-icon>メールアドレス変更 </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedEditUserInfo = 'openUpdatePassword'">
        <v-list-item-title>
          <v-btn text> <v-icon>mdi-account-key-outline </v-icon>パスワード変更 </v-btn>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedEditUserInfo = 'openDeleteAccount'">
        <v-list-item-title>
          <v-btn text> <v-icon> mdi-account-remove-outline </v-icon>アカウント削除 </v-btn>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    selectEditUserInfo: {
      type: String,
      required: false,
      default: ''
    },
    selectedEditUserInfoScreen: {
      type: Boolean
    }
  },
  computed: {
    selectedEditUserInfo: {
      get() {
        return this.selectEditUserInfo
      },
      set(openEditUserInfo) {
        this.$emit('update:open-edit-user-info', openEditUserInfo)
      }
    },
    ...mapState('modules/user/auth', ['login_user'])
  },
  methods: {
    handleSelectUserImageFile() {
      this.$emit('handle-select-user-image-file')
    }
  }
}
</script>

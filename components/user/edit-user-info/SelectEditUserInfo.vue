<template>
  <div>
    <v-list v-if="loginUser">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title white--text">ユーザー情報編集 </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider color="white" />
      <v-list-item @click="selectedEditUserInfo = 'openUpdateUserName'">
        <v-list-item-title class="white--text font-weight-bold">
          ユーザー情報変更
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="handleSelectUserImageFile">
        <v-list-item-title class="white--text font-weight-bold">
          プロフィール画像変更
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedEditUserInfo = 'openUpdateEmail'">
        <v-list-item-title class="white--text font-weight-bold">
          メールアドレス変更
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedEditUserInfo = 'openUpdatePassword'">
        <v-list-item-title class="white--text font-weight-bold">
          パスワード変更
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="selectedEditUserInfo = 'openDeleteAccount'">
        <v-list-item-title class="white--text font-weight-bold">
          アカウント削除
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
      default: ''
    },
    selectedEditUserInfoScreen: {
      type: Boolean,
      default: false
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
    ...mapState('modules/user/auth', ['loginUser'])
  },
  methods: {
    handleSelectUserImageFile() {
      this.$emit('handle-select-user-image-file')
    }
  }
}
</script>

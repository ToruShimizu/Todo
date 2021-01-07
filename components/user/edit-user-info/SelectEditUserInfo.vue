<template>
  <div>
    <v-list v-if="loginUser">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title white--text">ユーザー情報編集 </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-title>
          <TextButton
            class="white--text font-weight-bold"
            @handle-text-button="selectedEditUserInfo = 'openUpdateUserName'"
            icon="mdi-badge-account-horizontal"
            title="ユーザー名変更"
          />
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <TextButton
            class="white--text font-weight-bold"
            @handle-text-button="handleSelectUserImageFile"
            icon="mdi-file-account"
            title="プロフィール画像変更"
          />
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <TextButton
            class="white--text font-weight-bold"
            @handle-text-button="selectedEditUserInfo = 'openUpdateEmail'"
            icon="mdi-email-edit"
            title="メールアドレス変更"
          />
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <TextButton
            class="white--text font-weight-bold"
            @handle-text-button="selectedEditUserInfo = 'openUpdatePassword'"
            icon="mdi-account"
            title="パスワード変更"
          />
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <TextButton
            class="white--text font-weight-bold"
            @handle-text-button="selectedEditUserInfo = 'openDeleteAccount'"
            icon="mdi-account-remove"
            title="アカウント削除 "
          />
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

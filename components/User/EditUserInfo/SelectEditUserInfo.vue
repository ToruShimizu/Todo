<template>
  <div>
    <v-list v-if="loginUser">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title grey--text text--darken-2"
            >ユーザー情報編集
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list-item>
        <v-list-item-title>
          <TextButton
            @handle-text-button="selectedEditUserInfo = 'openUpdateUserName'"
            :icon="'mdi-badge-account-horizontal-outline'"
            :title="'ユーザー名変更'"
          />
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <TextButton
            @handle-text-button="handleSelectUserImageFile"
            :icon="'mdi-file-account-outline'"
            :title="'プロフィール画像変更'"
          />
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <TextButton
            @handle-text-button="selectedEditUserInfo = 'openUpdateEmail'"
            :icon="'mdi-email-edit-outline'"
            :title="'メールアドレス変更'"
          />
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <TextButton
            @handle-text-button="selectedEditUserInfo = 'openUpdatePassword'"
            :icon="'mdi-account-key-outline'"
            :title="'パスワード変更'"
          />
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>
          <TextButton
            @handle-text-button="selectedEditUserInfo = 'openDeleteAccount'"
            :icon="'mdi-account-remove-outline'"
            :title="'アカウント削除 '"
          />
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TextButton from '@/components/commonParts/button/TextButton/TextButton'

export default {
  components: {
    TextButton
  },
  props: {
    selectEditUserInfo: {
      type: String,
      required: false,
      default: ''
    },
    selectedEditUserInfoScreen: {
      type: Boolean,
      required: false,
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

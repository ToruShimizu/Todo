<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title grey--text text--darken-2"
          >ログインユーザー</v-list-item-title
        >
      </v-list-item-content>
      <v-list-item-content>
        <v-menu open-on-hover down offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <!-- FIXME: コンポーネント化するか検討中 -->
          <v-list>
            <v-list-item @click="openEditUser">
              <v-list-item-title>ユーザー情報編集</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openEditEmailAddress">
              <v-list-item-title>メールアドレス変更</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openEditPassword">
              <v-list-item-title>パスワード変更</v-list-item-title>
            </v-list-item>
            <v-list-item @click="openDeleteUser">
              <v-list-item-title>アカウント削除</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-content>
    </v-list-item>
    <v-row justify="center">
      <UpdateUser
        @open-edit-user="openEditUser"
        @close-edit-user="closeEditUser"
        :editUserDialog="editUserDialog"
      />
      <UpdatePassword
        @close-edit-password="closeEditPassword"
        @open-edit-password="openEditPassword"
        :editPasswordDialog="editPasswordDialog"
      />

      <UpdateEmailAddress
        @close-edit-email-address="closeEditEmailAddress"
        @open-edit-email-address="openEditEmailAddress"
        :editEmailAddressDialog="editEmailAddressDialog"
      />

      <DeleteLoginUser
        @close-delete-user="closeDeleteUser"
        @open-delete-user="openDeleteUser"
        :deleteUserDialog="deleteUserDialog"
      />
    </v-row>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item-content v-if="login_user">
        <v-list-item-icon v-if="photoURL">
          <v-avatar size="50">
            <img :src="photoURL" />
          </v-avatar>
        </v-list-item-icon>
      </v-list-item-content>
      <v-list-item-content v-if="login_user">
        <v-list-item-title class="title grey--text text--darken-2">
          <v-icon>mdi-account-outline</v-icon>
          {{ userName }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item>
        <v-list-item-content v-if="!login_user">
          <v-list-item-title>ログインユーザーはいません</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import UpdateUser from '@/components/UpdateUser/UpdateUser'
import UpdatePassword from '@/components/UpdateUser/UpdatePassword'
import UpdateEmailAddress from '@/components/UpdateUser/UpdateEmailAddress'
import DeleteLoginUser from '@/components/DeleteUser/DeleteUser'
export default {
  components: {
    UpdateUser,
    UpdatePassword,
    UpdateEmailAddress,
    DeleteLoginUser
  },
  data() {
    return {
      editUserDialog: false,
      editPasswordDialog: false,
      editEmailAddressDialog: false,
      deleteUserDialog: false
    }
  },
  computed: {
    ...mapGetters('modules/auth', ['userName', 'photoURL', 'userEmail']),
    ...mapState('modules/auth', ['login_user'])
  },
  methods: {
    // FIXME:switch文に書き直す
    openEditUser() {
      this.editUserDialog = true
    },
    closeEditUser() {
      this.editUserDialog = false
    },
    openEditPassword() {
      this.editPasswordDialog = true
    },
    closeEditPassword() {
      this.editPasswordDialog = false
    },
    openEditEmailAddress() {
      this.editEmailAddressDialog = true
    },
    closeEditEmailAddress() {
      this.editEmailAddressDialog = false
    },
    openDeleteUser() {
      this.deleteUserDialog = true
    },
    closeDeleteUser() {
      this.deleteUserDialog = false
    }
  }
}
</script>

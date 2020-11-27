<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title white--text font-weight-bold"
          >ログインユーザー
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list dense nav>
      <v-list-item-content v-if="loginUser">
        <v-list-item-title class="title white--text font-weight-bold">
          <v-avatar max-width="50" max-height="50">
            <v-img v-if="photoURL" :src="photoURL" :lazy-src="photoURL">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="white"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-icon v-else color="white">mdi-account</v-icon>
          </v-avatar>
          {{ gettersUserName }}
        </v-list-item-title>
        <v-list-item-title class="title white--text">
          <v-icon color="white">mdi-email</v-icon>
          {{ gettersUserEmail }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item>
        <v-list-item-content v-if="!loginUser">
          <v-list-item-title class="white--text font-weight-bold"
            >ログインユーザーはいません</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider />
    <EditUserInfo />
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EditUserInfo from '@/components/User/EditUserInfo/EditUserInfo'

export default {
  components: {
    EditUserInfo
  },
  computed: {
    ...mapGetters('modules/user/auth', ['gettersUserName', 'photoURL', 'gettersUserEmail']),
    ...mapState('modules/user/auth', ['loginUser'])
  }
}
</script>

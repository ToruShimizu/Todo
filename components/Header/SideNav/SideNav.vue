<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title grey--text text--darken-2"
          >ログインユーザー
        </v-list-item-title>
      </v-list-item-content>
      <!-- FIXME: コンポーネント化 -->
    </v-list-item>
    <v-divider />
    <v-list dense nav>
      <v-list-item-content v-if="loginUser">
        <v-list-item-title class="title grey--text text--darken-2">
          <v-avatar max-width="50" max-height="50">
            <v-img v-if="photoURL" :src="photoURL" :lazy-src="photoURL">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <v-btn v-if="!photoURL" text>
              <v-icon>mdi-account-outline</v-icon>
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
        <v-list-item-content v-if="!loginUser">
          <v-list-item-title>ログインユーザーはいません</v-list-item-title>
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

<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title grey--text text--darken-2">Login User</v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-menu open-on-hover down offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="openEditUser">
              <v-list-item-title>ユーザー情報編集</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item-content>
    </v-list-item>
    <v-row justify="center">
      <v-dialog v-model="userDialog" persistent max-width="600px" transition="scroll-y-transition">
        <UpdateUser @close-edit-user="closeEditUser"/>
      </v-dialog>
    </v-row>
    <v-divider></v-divider>
    <v-list dense nav>
      <v-list-item-content v-if="$store.state.login_user">
        <v-list-item-icon v-if="photoURL">
          <v-avatar size="50">
            <img :src="photoURL" />
          </v-avatar>
        </v-list-item-icon>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="title grey--text text--darken-2">
          <v-icon>mdi-account-outline</v-icon>
          {{userName}}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-content>
        <v-list-item-title class="title grey--text text--darken-2">
          <v-icon>mdi-email-outline</v-icon>
          {{userEmail}}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item>
        <v-list-item-content v-if="!$store.state.login_user">
          <v-list-item-title>Not Login</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import UpdateUser from "@/components/UpdateUser";
export default {
  components: {
    UpdateUser,
  },
  data() {
    return {
      userDialog: false,
    };
  },
  computed: {
    ...mapGetters(["userName", "photoURL", "userEmail"]),
  },
  methods: {
    openEditUser() {
      this.userDialog = true;
    },
    closeEditUser() {
      this.userDialog = false;
    },
  },
};
</script>


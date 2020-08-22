<template>
  <v-app>
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto mt-5 text-center">
        <v-card-title>
          <h1>Todo</h1>
          <p>
            ご利用の方は、
            <br />こちらからログインしてください。
          </p>
        </v-card-title>
        <v-card-text>
          <v-btn
            class="fill-width text-capitalize caption"
            height="48px"
            outlined
            style="border-color:#979797;"
            tile
            @click="googleLogin"
          >
            <img
              class="button-logo-img mr-4"
              src="https://madeby.google.com/static/images/google_g_logo.svg"
              style="height:24px;"
            />Googleアカウントでログイン
          </v-btn>
          <v-btn
            class="fill-width text-capitalize caption mt-5"
            height="48px"
            outlined
            style="border-color:#979797;"
            tile
            @click="login"
          >アカウントなしでログイン</v-btn>
        </v-card-text>
        <v-card-title>
          <h2>ログインまたは新規作成</h2>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createUser">
            <p>
              ○○○@example.comとすることで、
              <br />サンプルのメールアドレスを作成できます。
            </p>
            <v-text-field prepend-icon="mdi-email" label="Email" v-model="userEmail" />
            <v-text-field
              v-bind:type="showPassword ? 'text' : 'Password'"
              prepend-icon="mdi-lock"
              v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワード"
              @click:append="showPassword = !showPassword"
              v-model="userPassword"
            />
            <v-card-actions>
              <v-btn type="submit">作成</v-btn>
              <v-btn @click="login">ログイン</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "test@example.com",
      password: "testUser",
      userName: null,
      userEmail: null,
      userPassword: null,
      showPassword: false,
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    login() {
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
    async createUser() {
      await this.$store.dispatch("createUser", {
        userEmail: this.userEmail,
        userPassword: this.userPassword,
      });
      alert("Successfully created user");
      this.$store.dispatch("login", {
        email: this.userEmail,
        password: this.userPassword,
      });
      this.$router.push("/");
    },
    ...mapActions(["googleLogin"]),
  },
};
</script>

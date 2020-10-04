<template>
  <v-app class="mt-12">
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
            @click="testLogin"
          >テストユーザーでログイン</v-btn>
        </v-card-text>
        <v-card-title>
          <h2>ログインまたは新規作成</h2>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createUser" ref="form" lazy-validation>
            <v-text-field
              prepend-inner-icon="mdi-email-outline"
              label="メールアドレスを入力する"
              v-model="userEmail"
              :rules="emailRules"
              clearable
            />
            <v-text-field
              :type="showPassword ? 'text' : 'Password'"
              prepend-inner-icon="mdi-lock-outline"
              v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="パスワードを入力する(6文字以上)"
              :rules="[passwordRules.required, passwordRules.min]"
              @click:append="showPassword = !showPassword"
              v-model="userPassword"
            />
            <nuxt-link to="/passwordReset">
              <p>パスワードを忘れた方はこちら</p>
            </nuxt-link>
            <v-card-actions>
              <v-btn @click="login" color="primary">
                <v-icon left>mdi-login-variant</v-icon>ログイン
              </v-btn>
              <v-spacer />
              <nuxt-link to="/signUp">
                <v-btn type="submit" color="success">
                  <v-icon left>mdi-account-plus</v-icon>新規作成はこちら
                </v-btn>
              </nuxt-link>
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
      userEmail: "",
      userPassword: "",
      showPassword: false,
      validate: true,
      emailRules: [
        (v) => !!v || "メールアドレスは必須です",
        (v) =>
          /.+@.+\..+/.test(v) || "正しいメールアドレスの形式で入力してください",
      ],
      passwordRules: {
        required: (v) => !!v || "パスワードは必須です",
        min: (v) => v.length >= 6 || "6文字以上で入力してください",
      },
    };
  },
  methods: {
    testLogin() {
      this.$store.dispatch("modules/auth/login", {
        email: "test@example.com",
        password: "testUser",
      });
    },
    login() {
      this.$store.dispatch("modules/auth/login", {
        email: this.userEmail,
        password: this.userPassword,
      });
    },
    ...mapActions('modules/auth',["googleLogin"]),
  },
};
</script>

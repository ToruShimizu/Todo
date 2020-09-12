<template>
  <v-app class="mt-12">
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto mt-5 text-center">
        <v-card-title>
          <h1>Todo</h1>
        </v-card-title>
        <v-card-title>
          <h2>アカウント新規作成</h2>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent="createUser">
            <p>
              ○○○@example.comとすることで、
              <br />サンプルのメールアドレスで作成することができます。
            </p>
            <v-text-field
              prepend-inner-icon="mdi-card-account-details-outline"
              label="名前を入力する"
              v-model="userName"
              :rules="nameRules"
              clearable
            />
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
            <v-card-actions>
              <v-btn @click="createUser" color="success">
                <v-icon left>mdi-account-plus</v-icon>新規作成
              </v-btn>
              <v-spacer></v-spacer>
              <nuxt-link to="/signIn">
                <v-btn color="primary">
                  <v-icon left>mdi-login-variant</v-icon>ログイン画面へ戻る
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
      userName: "",
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
      nameRules: [(v) => !!v || "名前は必須です"],
    };
  },
  methods: {
    createUser() {
      this.$store.dispatch("createUser", {
        email: this.userEmail,
        password: this.userPassword,
        userName: this.userName,
      });
    },
  },
};
</script>


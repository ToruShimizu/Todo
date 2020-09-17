<template>
  <v-app class="mt-12">
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto mt-5 text-center">
        <v-card-title>
          <h2>アカウント削除</h2>
        </v-card-title>
        <v-card-title>
          <v-card-text>
            登録されているメールアドレスと
            <br />パスワードを入力してください
          </v-card-text>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent="deleteLoginUser">
            <v-text-field
              prepend-inner-icon="mdi-email-outline"
              label="登録されているメールアドレス"
              v-model="loginUserEmail"
              :rules="emailRules"
              clearable
            />
            <v-text-field
              :type="showPassword ? 'text' : 'Password'"
              prepend-inner-icon="mdi-lock-outline"
              v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              label="現在のPassword(6文字以上)"
              :rules="[passwordRules.required, passwordRules.min]"
              @click:append="showPassword = !showPassword"
              v-model="loginUserPassword"
            />
            <v-card-actions>
              <v-btn @click="deleteLoginUser" color="success">
                <v-icon left>mdi-account</v-icon>SAVE
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$emit('close-delete-user')">
                <v-icon left>mdi-login-variant</v-icon>戻る
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loginUserPassword: "",
      loginUserEmail: "",
      validate: true,
      showPassword: false,
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
    deleteLoginUser() {
      this.$store.dispatch("modules/auth/deleteLoginUser", {
        email: this.loginUserPassword,
        password: this.loginUserPassword,
      });
    },
  },
};
</script>


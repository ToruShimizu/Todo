<template>
  <v-app class="mt-12">
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto mt-5 text-center">
        <v-card-title>
          <h2>パスワード再設定</h2>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" lazy-validation @submit.prevent="passwordReset">
            <p>
              登録されているメールアドレスを入力してください。
              <br />パスワード再設定のURLが送信されます。
            </p>
            <v-text-field
              prepend-inner-icon="mdi-email-outline"
              label="Email"
              v-model="userEmail"
              :rules="emailRules"
              clearable
            />
            <v-card-actions>
              <v-btn @click="passwordReset" color="success">
                <v-icon left>mdi-email-send</v-icon>送信
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

      validate: true,
      emailRules: [
        (v) => !!v || "メールアドレスは必須です",
        (v) =>
          /.+@.+\..+/.test(v) || "正しいメールアドレスの形式で入力してください",
      ],
    };
  },
  methods: {
    async passwordReset() {
      await this.$store.dispatch("passwordReset", this.userEmail);
    },
  },
};
</script>


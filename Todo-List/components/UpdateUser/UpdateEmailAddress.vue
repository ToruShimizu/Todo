<template>
  <v-app class="mt-12">
    <v-col cols="12" sm="12" md="12">
      <v-card width="400px" class="mx-auto mt-5 text-center">
        <v-card-title>
          <h2>メールアドレス変更</h2>
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
            @submit.prevent="updateEmailAddress"
          >
            <v-text-field
              v-model="newEmailAddress"
              prepend-inner-icon="mdi-email-outline"
              label="新しいメールアドレス"
              :rules="emailRules"
              clearable
            />
            <v-card-actions>
              <v-btn color="success" @click="updateEmailAddress">
                <v-icon left>mdi-email-plus</v-icon>SAVE
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="$emit('close-edit-email-address')">
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
      newEmailAddress: '',
      validate: true,
      emailRules: [
        (v) => !!v || 'メールアドレスは必須です',
        (v) =>
          /.+@.+\..+/.test(v) || '正しいメールアドレスの形式で入力してください',
      ],
    }
  },
  methods: {
    updateEmailAddress() {
      this.$store.dispatch("modules/auth/updateEmailAddress",
        {email:this.newEmailAddress}
      );
    },
  },
}
</script>

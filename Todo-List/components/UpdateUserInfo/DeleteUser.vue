<template>
  <v-app>
    <v-dialog
      v-model="deleteUserDialog"
      persistent
      max-width="500px"
      transition="scroll-y-transition"
    >
      <v-app>
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
              <v-form ref="form" lazy-validation @submit.prevent="deleteUser">
                <v-text-field
                  v-model="loginUserEmail"
                  prepend-inner-icon="mdi-email-outline"
                  label="登録されているメールアドレス"
                  :rules="emailRules"
                  clearable
                />
                <v-text-field
                  v-model="loginUserPassword"
                  :type="showPassword ? 'text' : 'Password'"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  label="現在のPassword(6文字以上)"
                  :rules="[passwordRules.required, passwordRules.min]"
                  @click:append="showPassword = !showPassword"
                />
                <v-card-actions>
                  <v-btn color="success" @click="deleteUser">
                    <v-icon left>mdi-account</v-icon>SAVE
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="selectedDeleteUser = 'closeDeleteUser'">
                    <v-icon left>mdi-login-variant</v-icon>戻る
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-app>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: {
    deleteUserDialog: {
      type: Boolean
    },
    selectedUpdateUserInfo: {
      type: String
    }
  },

  data() {
    return {
      loginUserPassword: '',
      loginUserEmail: '',
      loader: null,
      loadingDeleteUser: false,
      validate: true,
      showPassword: false,
      emailRules: [
        (v) => !!v || 'メールアドレスは必須です',
        (v) => /.+@.+\..+/.test(v) || '正しいメールアドレスの形式で入力してください'
      ],
      passwordRules: {
        required: (v) => !!v || 'パスワードは必須です',
        min: (v) => v.length >= 6 || '6文字以上で入力してください'
      }
    }
  },
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    }
  },
  computed: {
    selectedDeleteUser: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selectedDeleteUser', value)
        this.loginUserEmail = ''
      }
    }
  },
  methods: {
    deleteUser() {
      this.loader = 'loadingDeleteUser'
      this.$store.dispatch('modules/auth/deleteUser', {
        email: this.loginUserEmail,
        password: this.loginUserPassword
      })
      this.loginUserEmail = ''
      this.loginUserPassword = ''
      this.$emit('update:selectedDeleteUser', 'closeDeleteUser')
    }
  }
}
</script>

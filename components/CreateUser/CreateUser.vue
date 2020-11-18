<template>
  <v-dialog
    v-model="createUserDialog"
    persistent
    max-width="500px"
    transition="scroll-y-transition"
  >
    <v-app>
      <v-col cols="12" sm="12" md="12">
        <v-card width="400px" class="mx-auto mt-5 text-center">
          <v-card-title class="text-center">
            <h4 class="fill-width">新規作成</h4>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="createUser">
              <p>
                ○○○@example.comとすることで、
                <br />サンプルのメールアドレスで作成することができます。
              </p>
              <FormUserName :user-name.sync="createUser.name" :name-label="'登録する名前'" />
              <FormUserEmail
                :user-email.sync="createUser.email"
                :email-label="'登録するメールアドレス'"
              />
              <FormUserPassword
                :user-password.sync="createUser.password"
                :passwordLabel="'登録するパスワード'"
              />
              <v-card-actions>
                <v-btn color="primary" class="hidden-xs-only" @click="closeCreateUser">
                  <v-icon left>mdi-login-variant</v-icon>ログイン画面へ戻る
                </v-btn>
                <v-btn color="primary" class="hidden-sm-and-up" @click="closeCreateUser">
                  <v-icon left>mdi-login-variant</v-icon>戻る
                </v-btn>
                <v-spacer />
                <v-btn
                  color="success"
                  :loading="loadingCreateUser"
                  :disabled="loadingCreateUser"
                  @click="handleCreateUser"
                >
                  <v-icon left>mdi-account-plus</v-icon>新規作成
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-app>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import FormUserName from '@/components/commonParts/user/form/FormUserName'
import FormUserEmail from '@/components/commonParts/user/form/FormUserEmail'
import FormUserPassword from '@/components/commonParts/user/form/FormUserPassword'
import LoadingView from '@/mixins/LoadingView.vue'

export default {
  mixins: [LoadingView],
  components: {
    FormUserName,
    FormUserEmail,
    FormUserPassword
  },

  props: {
    createUserDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      createNewUser: {
        name: '',
        email: '',
        password: ''
      },
      showPassword: false,
      loadingCreateUser: false
    }
  },
  methods: {
    async handleCreateUser() {
      const createUser = this.createNewUser
      if (!createUser.password || !createUser.email || !createUser.name) {
        this.loader = null
        this.$refs.form.validate()
        return
      }
      this.loader = 'loadingCreateUser'
      await this.createUser({
        email: createUser.email,
        password: createUser.password,
        userName: createUser.name
      })
    },
    closeCreateUser() {
      this.$emit('close-create-user')
      this.$refs.form.reset()
    },
    ...mapActions('modules/user/auth', ['createUser'])
  }
}
</script>
<style scoped>
.fill-width {
  width: 100%;
}
</style>

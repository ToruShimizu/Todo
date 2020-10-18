<template>
  <v-app>
    <v-dialog
      v-model="updateUserDialog"
      persistent
      max-width="400px"
      transition="scroll-y-transition"
    >
      <v-col cols="12" sm="12" md="12">
        <v-card width="400px" class="mx-auto mt-5 text-center">
          <v-card-title>
            <h2>ユーザー情報編集</h2>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" lazy-validation @submit.prevent="createUser">
              <v-text-field
                v-model="updateUserName"
                prepend-inner-icon="mdi-card-account-details-outline"
                label="名前を変更する"
                :rules="nameRules"
                clearable
              />
              <v-card-actions>
                <v-btn color="success" @click="updateUser">
                  <v-icon left>mdi-account</v-icon>SAVE
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="selectedUpdateUserName = 'closeUpdateUserName'">
                  <v-icon left>mdi-login-variant</v-icon>戻る
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  props: {
    updateUserDialog: {
      type: Boolean
    },
    selectedUpdateUserInfo: {
      type: String
    }
  },
  computed: {
    selectedUpdateUserName: {
      get() {
        return this.selectedUpdateUserInfo
      },
      set(value) {
        this.$emit('update:selectedUpdateUserName', value)
      }
    }
  },
  data() {
    return {
      updateUserName: '',
      validate: true,
      nameRules: [(v) => !!v || '名前は必須です']
    }
  },
  methods: {
    updateUser() {
      this.$store.dispatch('modules/auth/updateUser', {
        userName: this.updateUserName
      })
      this.updateUserName = ''
      this.$emit('update:selectedUpdateUserName', 'closeUpdateUserName')
    }
  }
}
</script>

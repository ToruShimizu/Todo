<template>
  <v-app class="mt-12">
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
              <v-btn color="primary" @click="$emit('close-edit-user')">
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
      updateUserName: '',
      validate: true,
      nameRules: [(v) => !!v || '名前は必須です'],
    }
  },
  methods: {
    updateUser() {
<<<<<<< HEAD:Todo-List/components/UpdateUser/UpdateUser.vue
      this.$store.dispatch('modules/auth/updateUser', {
=======
      this.$store.dispatch("modules/auth/updateUser", {
>>>>>>> #87ModuleDivision2:Todo-List/components/UpdateUser.vue
        userName: this.updateUserName,
      })
    },
  },
}
</script>

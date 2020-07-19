<template>
<v-app>
  <v-card>
    <v-card-title>
      <h1 class="display-1">Create user</h1>
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="addUser">
 <v-text-field prepend-icon="mdi-account-circle" label="ユーザ名" v-model="userName"/>
     <v-text-field v-bind:type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock" v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" label="パスワード" @click:append="showPassword = !showPassword" v-model="password"/>
         <v-card-actions>
    <v-btn type="submit">作成</v-btn>
  </v-card-actions>
      </v-form>
    </v-card-text>
  </v-card>
</v-app>
</template>

<script>
export default {
  data () {
    return {
      userName:null,
      password: null,
      showPassword : false

    }
  },
  methods: {
    addUser () {
      this.$store.dispatch('addUser',{userName:this.userName, password:this.password}).then(() => {
        this.userName = null,
        this.password = null

        alert('Successfully created user')

      })
    }
  },
}
</script>

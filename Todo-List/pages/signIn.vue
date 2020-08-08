<template>
  <v-app>
    <v-card width="400px" class="mx-auto mt-5">
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
          @click="login"
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
        >アカウントなしでログイン</v-btn>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
    ...mapActions(['login',]),
  },
}

</script>

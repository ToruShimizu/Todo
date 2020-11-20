<template>
  <v-app dark>
    <Header />
    <nuxt />
    <DoneSnackbar />
    <v-footer color="indigo darken-2" fixed>
      <span class="grey--text text--lighten-2">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header/Header'
import DoneSnackbar from '@/components/commonParts/snackbar/DoneSnackbar'

export default {
  components: {
    Header,
    DoneSnackbar
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>

<template>
  <v-app dark>
    <Header />
    <nuxt />
    <v-footer color="indigo darken-2" class="absolute">
      <span class="grey--text text--lighten-2">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header/Header'

export default {
  components: {
    Header
  }
}
</script>

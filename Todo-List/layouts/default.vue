<template>
  <v-app dark>
    <Header />
    <nuxt />
    <v-footer color="indigo darken-2" dark app>
      <span class="grey--text text--lighten-2">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  middleware: "authenticated"、
  components: {
    Header,
  },
};
</script>

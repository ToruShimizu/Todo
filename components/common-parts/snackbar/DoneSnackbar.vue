<template>
  <v-snackbar v-model="snackbar" color="grey darken-3" 　:top="true">
    <div class="text-center">
      <v-icon color="cyan accent-2">mdi-check-circle </v-icon>
      <span class="font-italic white--text">{{ title }}</span>
    </div>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  watch: {
    snackbar() {
      setTimeout(() => {
        this.closeSnackbar()
      }, 2000)
    }
  },
  data() {
    return {
      title: 'successful!'
    }
  },
  computed: {
    ...mapState('modules/common-parts/commonParts', ['snackbar'])
  },
  methods: {
    ...mapMutations('modules/common-parts/commonParts', ['closeSnackbar'])
  }
}
</script>
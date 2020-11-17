<template>
  <v-layout class="justify-center">
    <v-avatar max-width="40" max-height="40">
      <v-img v-if="photoURL" :src="photoURL" :lazy-src="photoURL">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <v-icon v-else>mdi-account-outline</v-icon>
    </v-avatar>
    <h2 class="grey--text font-italic mb-4">{{ teamName }}</h2>
    <EditTeam />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import EditTeam from '@/components/team/EditTeam'
export default {
  components: {
    EditTeam
  },
  computed: {
    ...mapGetters('modules/team/team', ['teamName']),
    ...mapGetters('modules/user/auth', ['photoURL'])
  }
}
</script>
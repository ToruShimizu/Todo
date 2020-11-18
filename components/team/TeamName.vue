<template>
  <div>
    <v-layout class="justify-center">
      <template v-if="team !== null">
        <v-avatar max-width="40" max-height="40">
          <v-img v-if="teamPhotoURL" :src="teamPhotoURL" :lazy-src="teamPhotoURL">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-icon v-else>mdi-account-outline</v-icon>
        </v-avatar>
        <h2 class="grey--text font-italic mb-4">{{ teamName }}</h2>
      </template>
      <EditTeamList />
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import EditTeamList from '@/components/team/edit/EditTeamList'
export default {
  components: {
    EditTeamList
  },
  computed: {
    ...mapState('modules/team/team', ['team']),
    ...mapGetters('modules/team/team', ['teamName', 'teamPhotoURL'])
  }
}
</script>
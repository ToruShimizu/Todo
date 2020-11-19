<template>
  <div>
    <v-layout class="justify-center">
      <template>
        <v-avatar max-width="40" max-height="40">
          <template v-if="teamPhotoURL">
            <v-img :src="teamPhotoURL" :lazy-src="teamPhotoURL">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </template>
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
    ...mapGetters('modules/team/team', ['teamName', 'teamPhotoURL'])
  }
}
</script>
<template>
  <div>
    <v-layout class="justify-center">
      <template>
        <v-avatar max-width="40" max-height="40">
          <template v-if="teamPhotoURL">
            <LoadingImg v-if="teamPhotoURL" :src="teamPhotoURL" />
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
import LoadingImg from '@/components/commonParts/v-img/LoadingImg'

export default {
  components: {
    EditTeamList,
    LoadingImg
  },
  computed: {
    ...mapGetters('modules/team/team', ['teamName', 'teamPhotoURL'])
  }
}
</script>
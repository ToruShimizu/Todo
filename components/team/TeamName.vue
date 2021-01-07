<template>
  <div>
    <v-layout class="justify-center mb-5">
      <template>
        <v-avatar size="70px">
          <!-- チーム画像 -->
          <template v-if="teamPhotoURL">
            <LoadingImg v-if="teamPhotoURL" :src="teamPhotoURL" width="70" height="70" />
          </template>
          <v-icon v-else class="blue--grey darken-1">mdi-account-outline</v-icon>
        </v-avatar>
      </template>
      <h2 class="blue--grey--text darken-1 font-italic mt-3 ml-2">{{ teamName }}</h2>
      <!-- チーム編集・削除選択リスト -->
      <EditTeamList class="mt-3" />
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('modules/team/team', ['teamName', 'teamPhotoURL'])
  }
}
</script>

<template>
  <v-col cols="12">
    <div v-for="comment in comments" :key="comment.id">
      <v-card class="mx-auto my-2" width="80%" elevation="3">
        <v-card-title>
          <v-icon small left> mdi-comment-text-outline </v-icon>
          <span class="subtitle-2 font-weight-light">コメント</span>
          <span class="subtitle-2 font-weight-light">{{ comment.created }}</span>
        </v-card-title>
        <v-card-text class="body-1 font-weight-bold"> "{{ comment.message }}" </v-card-text>
        <v-card-text>
          <v-layout>
            <v-avatar max-width="50" max-height="50">
              <v-img v-if="photoURL" :src="photoURL" :lazy-src="photoURL">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-icon v-else>mdi-account-outline</v-icon>
            </v-avatar>
            {{ gettersUserName }}<v-spacer />
            <v-btn icon @click="handleRemoveComment(comment)">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </div>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import LoadingImg from '@/components/commonParts/v-img/LoadingImg'

export default {
  components: {
    LoadingImg
  },
  computed: {
    ...mapState('modules/comment/comment', ['comments']),
    ...mapGetters('modules/user/auth', ['gettersUserName', 'photoURL', 'userEmail'])
  },
  methods: {
    handleRemoveComment(comment) {
      if (!confirm(comment, +'を削除しますか?')) return
      this.removeComment({ id: comment.id })
    },
    ...mapActions('modules/comment/comment', ['removeComment'])
  }
}
</script>

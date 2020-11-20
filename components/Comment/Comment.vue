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
            <span v-if="photoURL">
              {{ photoURL }}
            </span>
            <span v-else> <v-icon>mdi-account-outline</v-icon> </span>
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

export default {
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

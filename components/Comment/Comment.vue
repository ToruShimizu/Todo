<template>
  <v-col cols="12">
    <div v-for="comment in comments" :key="comment.id">
      <v-card class="mx-auto my-2" width="80%" elevation="3">
        <v-card-title>
          <v-icon small left> mdi-comment-text-outline </v-icon>
          <span class="subtitle-2 font-weight-light">コメント</span>
          <v-spacer />
          <span class="subtitle-2 font-weight-light">{{ comment.created }}</span>
        </v-card-title>
        <v-card-text class="body-1 font-weight-bold">
          "{{ comment.message }}"
          <v-row align="center" justify="end">
            <v-btn icon @click="handleRemoveComment(comment)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-card-text>
      </v-card>
    </div>
  </v-col>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('modules/comment', ['comments']),
    ...mapGetters('modules/user/auth', ['gettersUserName', 'photoURL', 'userEmail'])
  },
  methods: {
    handleRemoveComment(comment) {
      if (!confirm('Are you sure?')) return
      this.removeComment({ id: comment.id })
    },
    ...mapActions('modules/comment', ['removeComment'])
  }
}
</script>

<template>
  <v-col cols="12">
    <div v-for="comment in comments" :key="comment.id">
      <v-card class="mx-auto my-2" width="100%" elevation="3">
        <v-card-title class="pa-0 ml-1 mt-1">
          <v-icon small> mdi-comment-text-outline </v-icon>
          <span class="subtitle-2 font-weight-light ml-2">{{ comment.created }}</span>
        </v-card-title>
        <v-card-text class="body-1 font-weight-bold pb-0 mt-2">
          "{{ comment.message }}"
        </v-card-text>
        <v-card-actions class="py-0">
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
          <span>{{ gettersUserName }}</span> <v-spacer />
          <v-btn icon @click="handleRemoveComment(comment)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </v-card-actions>
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
  props: {
    comments: {
      type: Array,
      required: false
    }
  },
  computed: {
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

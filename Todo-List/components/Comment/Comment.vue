<template>
  <v-list subheader>
    <v-list-item v-for="comment in comments" :key="comment.id">
      <v-list-item-content>
        <v-list-item-icon v-if="photoURL">
          <v-avatar size="50">
            <img :src="photoURL" />
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-title> {{ userName }}さんがコメントしました</v-list-item-title>
        <v-list-item-title> 投稿日時:{{ comment.created.toDate() | dateFilter }}</v-list-item-title>
        <v-layout>
          <v-text-field v-model="comment.message" />
          <v-btn icon @click="removeComment(comment)">
            <v-icon>mdi-delete-outline</v-icon>
          </v-btn>
        </v-layout>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  computed: {
    ...mapState('modules/todos', ['comments']),
    ...mapGetters('modules/auth', ['userName', 'photoURL', 'userEmail'])
  },
  filters: {
    dateFilter(date) {
      return moment(date).format('YYYY年MM月DD日 HH時mm分ss秒')
    }
  },
  methods: {
    removeComment(comment) {
      if (!confirm('Are you sure?')) return
      this.$store.dispatch('modules/todos/removeComment', { id: comment.id })
    },
    ...mapActions('modules/todos', ['fetchComments'])
  }
}
</script>

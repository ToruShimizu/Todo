<template>
  <v-text-field
    v-model="message"
    hide-details
    prepend-inner-icon="mdi-message-text-outline"
    label="コメントを追加する"
    clearable
    @keypress.enter="addComment"
  ></v-text-field>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      message: '',
    }
  },
  computed: {
<<<<<<< HEAD:Todo-List/components/Comment/AddComment.vue
    ...mapState('modules/todos', ['comments']),
  },
  methods: {
    addComment() {
      this.$store.dispatch('modules/todos/addComment', {
=======
    ...mapState("modules/todos",["comments"]),
  },
  methods: {
    addComment() {
      this.$store.dispatch("modules/todos/addComment", {
>>>>>>> #87ModuleDivision2:Todo-List/components/AddComment.vue
        id: this.$route.params.id,
        message: this.message,
      })
      this.message = ''
    },
  },
}
</script>

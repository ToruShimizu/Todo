<template>
  <v-col cols="12">
    <v-text-field
      v-model="message"
      hide-details
      prepend-inner-icon="mdi-message-text-outline"
      label="コメントを追加する"
      clearable
      @keypress.enter="addComment"
    ></v-text-field>
  </v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    taskId: {
      type: String
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState('modules/todos', ['comments'])
  },
  methods: {
    addComment() {
      this.$store.dispatch('modules/todos/addComment', {
        id: this.taskId,
        message: this.message
      })
      this.message = ''
    }
  }
}
</script>

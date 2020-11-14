<template>
  <v-col cols="12">
    <v-text-field
      v-model="message"
      hide-details
      prepend-inner-icon="mdi-message-text-outline"
      label="コメントを追加する"
      clearable
      @keypress.enter="handleAddComment"
    ></v-text-field>
  </v-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    planContentsId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {
    ...mapState('modules/comment', ['comments'])
  },
  methods: {
    handleAddComment() {
      this.addComment({
        id: this.planContentsId,
        message: this.message
      })
      this.message = ''
    },
    ...mapActions('modules/comment', ['addComment'])
  }
}
</script>

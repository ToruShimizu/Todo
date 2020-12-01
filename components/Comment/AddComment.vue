<template>
  <v-col cols="12">
    <v-text-field
      v-model="message"
      persistent-hint
      prepend-inner-icon="mdi-message-text-outline"
      hint="入力後はEnterキーを押してください"
      label="コメントを追加する"
      clearable
      @keypress.enter="handleAddComment"
    />
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
    ...mapState('modules/activity-plans/activityPlans', ['comments'])
  },
  methods: {
    handleAddComment() {
      this.addComment({
        id: this.planContentsId,
        message: this.message
      })
      this.message = ''
    },
    ...mapActions('modules/activity-plans/activityPlans', ['addComment'])
  }
}
</script>

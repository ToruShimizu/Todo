<template>
  <FormDialog :form-dialog="commentDialog">
    <template v-slot:dialog>
      <FormView :title="'コメント'">
        <template v-slot:form style="relative">
          <AddComment :plan-contents-id="planContents.id" />
          <Comment :comments="planContents.comments" />
          <v-card-actions class="justify-end">
            <TextButton :title="'close'" class="primary--text" @handle-text-button="closeComment" />
          </v-card-actions>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import FormDialog from '@/components/common-parts/dialog/FormDialog'
import FormView from '@/components/common-parts/form/FormView'
import AddComment from '@/components/comment/AddComment'
import Comment from '@/components/comment/Comment'

export default {
  components: {
    FormDialog,
    FormView,
    AddComment,
    Comment
  },
  props: {
    commentDialog: {
      type: Boolean,
      required: false,
      default: false
    },
    planContents: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeComment() {
      this.$emit('close-comment')
    }
  }
}
</script>
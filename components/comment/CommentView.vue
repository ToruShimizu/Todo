<template>
  <FormDialog :form-dialog="commentDialog">
    <template v-slot:dialog>
      <FormView title="コメント">
        <template v-slot:form style="relative">
          <!-- コメント入力、追加機能を持ったフォーム、 -->
          <AddComment :plan-contents-id="planContents.id" />
          <!-- コメント表示 -->
          <Comment :comments="planContents.comments" />
          <v-card-actions class="justify-end">
            <AppButton title="close" class="primary--text" @handle-text-button="closeComment" />
          </v-card-actions>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
export default {
  props: {
    commentDialog: {
      type: Boolean,
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

<template>
  <FormDialog :form-dialog="commentDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-divider />
        <!-- コメント入力、追加機能を持ったフォーム、 -->
        <v-row class="mx-2">
          <AddComment :plan-contents-id="planContents.id" />
        </v-row>
        <!-- コメント表示 -->
        <v-row class="mx-2">
          <Comment :comments="planContents.comments" />
        </v-row>
        <v-card-actions class="justify-end">
          <AppButton @click.stop="closeComment" outlined>閉じる</AppButton>
        </v-card-actions>
      </v-card>
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

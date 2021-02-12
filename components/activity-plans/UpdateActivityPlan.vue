<template>
  <div>
    <!-- 活動計画編集フォーム -->
    <FormCreateActivityPlan
      title="活動計画編集"
      :plan-contents="editPlanContents"
      :activity-plan-dialog="updateActivityPlanDialog"
      :categorys="todoCategorys"
      @close-activity-plan="closeUpdateActivityPlan"
      @save-activity-plan="handleUpdateActivityPlan"
      @update-image-file="handleUpdateImageFile"
    >
      <template v-slot:imageFile v-if="editPlanContents.photoURL">
        <!-- 画像ファイル削除ボタン -->
        <v-col cols="12" sm="12" md="12" class="pa-0 text-right">
          <AppButton color="success" icon @click="handleRemovePlanContensImage"
            ><v-icon>mdi-delete-outline</v-icon>
          </AppButton>
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <!-- 画像の表示 -->
          <LoadingImg
            class="mx-auto"
            v-if="editPlanContents.photoURL"
            :src="editPlanContents.photoURL"
            width="200"
            height="200"
          />
        </v-col>
      </template>
    </FormCreateActivityPlan>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: {
    editPlanContents: {
      type: Object,
      required: true
    },
    todoCategorys: {
      type: Array,
      required: true
    },
    updateActivityPlanDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      updateDateMenu: false
    }
  },
  methods: {
    // 活動計画更新ボタン
    async handleUpdateActivityPlan(planContents) {
      await this.updateActivityPlan(planContents)
      this.closeUpdateActivityPlan()
    },
    // 活動計画編集ダイアログを閉じる
    closeUpdateActivityPlan() {
      this.$emit('close-update-activity-plan')
    },
    // 画像ファイルを削除
    handleRemovePlanContensImage() {
      this.removePlanContentsImage(this.editPlanContents)
    },
    // 画像ファイルを更新
    handleUpdateImageFile(planContents) {
      this.updatePlanContentsImageFile(planContents)
    },
    ...mapActions('modules/activity-plans/activityPlans', [
      'updateActivityPlan',
      'removePlanContentsImage',
      'updatePlanContentsImageFile'
    ])
  }
}
</script>

<template>
  <div>
    <!-- 活動計画一覧表示 -->
    <ActivityPlansCard
      v-for="(contents, index) in displayActivityPlans"
      :key="index"
      :contents="contents"
      @toggle-done-activity-plan="toggleDoneActivityPlan"
      @handle-remove-activity-plan="handleRemoveActivityPlan"
      @open-activity-plan="openUpdateActivityPlan"
    />
    <!-- 活動計画編集ダイアログ -->
    <UpdateActivityPlan
      :edit-plan-contents="editPlanContents"
      :todo-categorys="todoCategorys"
      :update-activity-plan-dialog="updateActivityPlanDialog"
      @close-update-activity-plan="closeUpdateActivityPlan"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    displayActivityPlans: {
      type: Array,
      required: true
    },
    todoCategorys: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      editPlanContents: {},
      updateActivityPlanDialog: false
    }
  },
  methods: {
    // 活動計画削除ボタン
    handleRemoveActivityPlan(contents) {
      if (!confirm(contents.category + 'を削除しますか？')) return
      this.removeActivityPlan({ id: contents.id })
    },
    // 完了・未完了切り替えボタン
    toggleDoneActivityPlan(contents) {
      this.doneActivityPlan({ planContents: contents, id: contents.id })
    },
    // 活動計画編集ダイアログを開く
    async openUpdateActivityPlan(contents) {
      this.editPlanContents = Object.assign({}, contents)
      this.updateActivityPlanDialog = true
    },
    // 活動計画編集ダイアログを閉じる
    closeUpdateActivityPlan() {
      this.updateActivityPlanDialog = false
    },
    ...mapActions('modules/activity-plans/activityPlans', [
      'removeActivityPlan',
      'doneActivityPlan'
    ]),
    ...mapActions('modules/activity-plans/activityPlans', ['fetchComments'])
  }
}
</script>

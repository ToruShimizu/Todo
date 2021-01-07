<template>
  <FormCreateActivityPlan
    title="活動計画作成"
    :plan-contents="planContents"
    :activity-plan-dialog="createActivityPlanDialog"
    :categorys="todoCategorys"
    @close-activity-plan="closeActivityPlan"
    @save-activity-plan="handleCreateActivityPlan"
  />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    planContents: {
      type: Object,
      required: false,
      default: () => ({
        category: '',
        detail: '',
        imageFile: null,
        inChargeMember: [],
        fileName: '',
        photoURL: '',
        date: [new Date().toISOString().substr(0, 10)],
        done: false
      })
    },
    todoCategorys: {
      type: Array,
      required: true
    },
    createActivityPlanDialog: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    async handleCreateActivityPlan(planContents) {
      if (planContents.imageFile) {
        await this.uploadPlanContentsImageFile(planContents)
      } else {
        await this.addActivityPlan(planContents)
      }
      this.closeActivityPlan()
    },
    closeActivityPlan() {
      this.$emit('close-activity-plan')
    },
    ...mapActions('modules/activity-plans/activityPlans', [
      'addActivityPlan',
      'uploadPlanContentsImageFile'
    ])
  }
}
</script>

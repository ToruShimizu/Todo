<template>
  <div>
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
        <v-col cols="12" sm="12" md="12" class="pa-0 text-right">
          <TextButton
            icon="mdi-delete-outline"
            @handle-text-button="handleRemovePlanContensImage"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12">
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
    async handleUpdateActivityPlan(planContents) {
      await this.updateActivityPlan(planContents)
      this.closeUpdateActivityPlan()
    },
    closeUpdateActivityPlan() {
      this.$emit('close-update-activity-plan')
    },
    handleRemovePlanContensImage() {
      this.removePlanContentsImage(this.editPlanContents)
    },
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

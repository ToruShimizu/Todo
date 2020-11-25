<template>
  <div>
    <FormCreateActivityPlan
      :title="'活動計画編集'"
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
            :icon="'mdi-delete-outline'"
            @handle-text-button="handleRemovePlanContensImage"
          />
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <LoadingImg v-if="editPlanContents.photoURL" :src="editPlanContents.photoURL" />
        </v-col>
      </template>
      <template v-slot:comment>
        <AddComment :plan-contents-id="editPlanContents.id" />
        <Comment :planContents-id="editPlanContents.id" />
      </template>
    </FormCreateActivityPlan>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FormCreateActivityPlan from '@/components/commonParts/activityPlans/form/FormCreateActivityPlan'
import LoadingImg from '@/components/commonParts/v-img/LoadingImg'
import TextButton from '@/components/commonParts/button/TextButton/TextButton'
import AddComment from '@/components/Comment/AddComment'
import Comment from '@/components/Comment/Comment'

export default {
  components: {
    FormCreateActivityPlan,
    AddComment,
    Comment,
    LoadingImg,
    TextButton
  },
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
  computed: {
    ...mapState('modules/comment/comment', ['comment'])
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
    ...mapActions('modules/activityPlans/activityPlans', [
      'updateActivityPlan',
      'removePlanContentsImage',
      'updatePlanContentsImageFile'
    ])
  }
}
</script>
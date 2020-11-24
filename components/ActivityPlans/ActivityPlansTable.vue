<template>
  <div>
    <ActivityPlansCard
      :display-activity-plans="displayActivityPlans"
      @toggle-done-activity-plan="toggleDoneActivityPlan"
      @handle-remove-activity-plan="handleRemoveActivityPlan"
      @open-activity-plan="openUpdateActivityPlan"
    />
    <UpdateActivityPlan
      :edit-plan-contents="editPlanContents"
      :todo-categorys="todoCategorys"
      :update-activity-plan-dialog="updateActivityPlanDialog"
      @close-update-activity-plan="closeUpdateActivityPlan"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UpdateActivityPlan from '@/components/ActivityPlans/UpdateActivityPlan'
import ActivityPlansCard from '@/components/ActivityPlans/ActivityPlansCard'
export default {
  components: {
    UpdateActivityPlan,
    ActivityPlansCard
  },
  props: {
    displayActivityPlans: {
      type: Array
    },
    searchActivityPlans: {
      type: Array
    },
    sortByActivityPlans: {
      type: Array
    },
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
      planContentsHeaders: [
        { text: '状態', value: 'done', align: 'start', sortable: false },
        {
          text: ' カテゴリ',
          value: 'category',
          sortable: false
        },
        { text: '期限', value: 'date' },
        { text: '削除', value: 'remove', sortable: false }
      ],
      editPlanContents: {},
      updateActivityPlanDialog: false
    }
  },
  computed: {
    ...mapState('modules/activityPlans/activityPlans', ['activityPlans'])
  },
  methods: {
    handleRemoveActivityPlan(contents) {
      if (!confirm(contents.category + 'を削除しますか？')) return
      this.removeActivityPlan({ id: contents.id })
    },
    toggleDoneActivityPlan(contents) {
      this.doneActivityPlan({ planContents: contents, id: contents.id })
    },
    async openUpdateActivityPlan(contents) {
      const id = contents.id
      await this.fetchComments(id)
      this.editPlanContents = Object.assign({}, contents)
      this.updateActivityPlanDialog = true
    },
    closeUpdateActivityPlan() {
      this.updateActivityPlanDialog = false
    },
    ...mapActions('modules/activityPlans/activityPlans', [
      'removeActivityPlan',
      'doneActivityPlan'
    ]),
    ...mapActions('modules/comment/comment', ['fetchComments'])
  }
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.8s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>

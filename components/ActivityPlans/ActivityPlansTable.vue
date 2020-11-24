<template>
  <div>
    <v-card>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">状態</th>
              <th class="text-left">やること</th>
              <th class="text-left">日付</th>
              <th class="text-left">削除</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="contents in displayActivityPlans">
              <transition :key="contents.catgorys" name="list">
                <tr>
                  <td>
                    <v-btn icon @click="toggleDoneActivityPlan(contents)">
                      <v-icon :class="(!contents.done && 'grey--text') || 'primary--text'"
                        >mdi-check-circle-outline</v-icon
                      >
                    </v-btn>
                  </td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <td
                        v-bind="attrs"
                        :class="(contents.done && 'grey--text') || 'primary--text'"
                        v-on="on"
                        @click="openUpdateActivityPlan(contents)"
                      >
                        {{ contents.category }}
                      </td>
                    </template>
                    <span>{{ contents.category }}の詳細を開く</span>
                  </v-tooltip>
                  <td :class="(contents.done && 'grey--text') || 'black--text'" class="pa-0">
                    {{ contents.date }}
                  </td>
                  <td>
                    <v-btn icon>
                      <v-icon @click="handleRemoveActivityPlan(contents)"
                        >mdi-delete-outline</v-icon
                      >
                    </v-btn>
                  </td>
                </tr>
              </transition>
            </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
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
export default {
  components: {
    UpdateActivityPlan
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
      console.log(contents)
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

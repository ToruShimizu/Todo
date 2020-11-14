<template>
  <v-container style="max-width: 500px" class="mb-5">
    <v-layout>
      <AddActivityPlan
        :create-activity-plans.sync="planContents"
        :qc-categorys="qcCategorys"
        :add-activity-plan-dialog="addActivityPlanDialog"
        @open-add-activity-plan="openAddActivityPlan"
        @close-add-activity-plan="closeAddActivityPlan"
      />
    </v-layout>
    <v-divider class="mt-4" />
    <v-card class="mb-5">
      <FilteredActivityPlans :selected-activity-plans-filter.sync="selectActivityPlansFilter" />
      <v-divider />
      <v-layout>
        <SearchActivityPlans :search-plan-contents-categorys.sync="searchPlanContentsCategorys" />
        <SortByActivityPlans
          :selected-sort-activity-plans.sync="selectSortActivityPlans"
          :sort-activity-plans-states="sortActivityPlansStates"
        />
      </v-layout>
      <Pagination
        :set-activity-plans-page.sync="activityPlansPage"
        @change-activity-plans-page="changeActivityPlansPage"
        :activity-plans-page-length="activityPlansPageLength"
      />
      <ActivityPlansTable
        :activityPlansFiltered="activityPlansFiltered"
        :searchActivityPlans="searchActivityPlans"
        :sortByActivityPlans="sortByActivityPlans"
        :display-activity-plans="displayActivityPlans"
        :qc-categorys="qcCategorys"
      />
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import AddActivityPlan from '@/components/ActivityPlans/AddActivityPlan'
import FilteredActivityPlans from '@/components/ActivityPlans/FilteredActivityPlans'
import SearchActivityPlans from '@/components/ActivityPlans/SearchActivityPlans'
import SortByActivityPlans from '@/components/ActivityPlans/SortByActivityPlans'
import Pagination from '@/components/ActivityPlans/Pagination'
import ActivityPlansTable from '@/components/ActivityPlans/ActivityPlansTable'

export default {
  middleware: 'authenticated',
  components: {
    AddActivityPlan,
    FilteredActivityPlans,
    SearchActivityPlans,
    SortByActivityPlans,
    Pagination,
    ActivityPlansTable
  },
  data() {
    return {
      planContents: {
        categorys: [],
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        done: false
      },
      qcCategorys: [
        '会合',
        'KYT',
        '勉強会',
        '創意工夫',
        'レクリエーション',
        'テーマの選定',
        '改善事例',
        '選定理由',
        '現状把握',
        '目標の設定',
        '活動計画',
        '解析',
        '対策立案',
        '対策実施',
        '効果の確認',
        '標準化',
        '今後の進め方'
      ],
      selectActivityPlansFilter: 'all',
      searchPlanContentsCategorys: '',
      selectSortActivityPlans: [],
      sortActivityPlansStates: ['カテゴリ順', '日付降順↓', '日付昇順↑'],
      activityPlansPage: 1,
      activityPlansPageSize: 7,
      activityPlansPageLength: 0,
      displayActivityPlans: [],
      addActivityPlanDialog: false
    }
  },
  watch: {
    activityPlansFiltered() {
      let displayActivityPlans = this.displayActivityPlans
      const pageSize = this.activityPlansPageSize
      const activityPlans = this.activityPlansFiltered

      this.displayActivityPlans = activityPlans.slice(0, pageSize)
      this.activityPlansPageLength = Math.ceil(activityPlans.length / pageSize)
      this.activityPlansPage = 1
      this.changeActivityPlansPage(this.activityPlansPage)
    }
  },
  // 完了状態の絞り込み
  computed: {
    activityPlansFiltered() {
      let returnvalue
      const activityPlans = this.searchActivityPlans
      switch (this.selectActivityPlansFilter) {
        case 'all':
          returnvalue = activityPlans

          break
        case 'active':
          console.log(activityPlans)

          returnvalue = activityPlans.filter((activityPlan) => !activityPlan.done)

          break
        case 'done':
          returnvalue = activityPlans.filter((activityPlan) => activityPlan.done)

          break
        default:
      }
      return returnvalue
    },
    // タスクの検索
    searchActivityPlans() {
      const activityPlans = this.sortByActivityPlans
      const searchCategorys = this.searchPlanContentsCategorys
      // vuetifyのclearableを使用するとnullになり表示されなくなるためnullの場合の処理を記述
      if (searchCategorys === null) {
        return activityPlans
      }
      return activityPlans.filter((activityPlan) => {
        const categorys = activityPlan.categorys.join(',')
        return categorys.includes(searchCategorys)
      })
    },
    sortByActivityPlans() {
      let returnvalue
      switch (this.selectSortActivityPlans) {
        case 'カテゴリ順':
          returnvalue = this.sortByCategorys
          break

        case '日付降順↓':
          returnvalue = this.sortByAscDate
          break

        case '日付昇順↑':
          returnvalue = this.sortByDescDate
          break

        default:
          returnvalue = this.activityPlans
      }
      return returnvalue
    },
    ...mapGetters('modules/activityPlans/activityPlans', [
      'remainingAcactivityPlans',
      'completedactivityPlans',
      'sortByCategorys',
      'sortByAscDate',
      'sortByDescDate'
    ]),
    ...mapState('modules/activityPlans/activityPlans', ['activityPlans'])
  },
  methods: {
    // ページ番号のボタンが押された時にページを切り替える
    changeActivityPlansPage(pageNumber) {
      const activityPlans = this.activityPlansFiltered
      const pageSize = this.activityPlansPageSize
      this.displayActivityPlans = activityPlans.slice(
        pageSize * (pageNumber - 1),
        pageSize * pageNumber
      )
    },
    openAddActivityPlan() {
      this.addActivityPlanDialog = true
    },
    closeAddActivityPlan() {
      this.addActivityPlanDialog = false
    }
  }
}
</script>

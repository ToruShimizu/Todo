<template>
  <v-container style="max-width: 500px" class="mb-5">
    <v-layout class="justify-center mt-2">
      <v-btn color="teal" dark to="/createTeam" nuxt class="font-italic mr-2">
        <v-icon>mdi-account-edit</v-icon>サークル編集
      </v-btn>
      <v-btn color="primary " dark @click="openAddActivityPlan" class="ml-2 font-italic">
        <v-icon>mdi-pen-plus</v-icon>活動計画作成
      </v-btn>
    </v-layout>
    <AddActivityPlan
      :create-activity-plans.sync="planContents"
      :todo-categorys="todoCategorys"
      :add-activity-plan-dialog="addActivityPlanDialog"
      @open-add-activity-plan="openAddActivityPlan"
      @close-add-activity-plan="closeAddActivityPlan"
    />
    <v-divider class="mt-4" />
    <v-card class="mb-5">
      <FilteredActivityPlans :selected-activity-plans-filter.sync="selectActivityPlansFilter" />
      <v-divider />
      <v-layout>
        <SearchActivityPlans
          :searched-category-keyword.sync="searchCategoryKeyword"
          :todo-categorys="todoCategorys"
        />

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
        :todo-categorys="todoCategorys"
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
import TeamName from '@/components/team/TeamName'

export default {
  middleware: 'authenticated',
  components: {
    AddActivityPlan,
    FilteredActivityPlans,
    SearchActivityPlans,
    SortByActivityPlans,
    Pagination,
    ActivityPlansTable,
    TeamName
  },
  data() {
    return {
      planContents: {
        category: null,
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        done: false
      },
      todoCategorys: [
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
      searchCategoryKeyword: '',
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
      const searchCategory = this.searchCategoryKeyword
      if (this.searchCategoryKeyword === null) {
        return this.activityPlans
      }

      return activityPlans.filter((activityPlan) => {
        return activityPlan.category.includes(searchCategory)
      })
    },
    sortByActivityPlans() {
      let returnvalue
      switch (this.selectSortActivityPlans) {
        case 'カテゴリ順':
          returnvalue = this.sortByCategory
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
      'sortByCategory',
      'sortByAscDate',
      'sortByDescDate'
    ]),
    ...mapGetters('modules/user/auth', ['photoURL']),
    ...mapGetters('modules/team/team', ['teamName']),
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

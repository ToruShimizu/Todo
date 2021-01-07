<template>
  <v-container style="max-width: 500px" class="mb-5 py-5">
    <v-layout class="justify-center">
      <!-- サークル作成ダイアログ（チームが作成されていない時に表示） -->
      <CreateTeam :create-team-dialog="createTeamDialog" @close-team-dialog="closeCreateTeam" />
      <v-btn
        v-if="!teamName"
        color="teal lighten-1"
        dark
        class="font-italic mb-5"
        @click="openCreateTeam"
        @close-team-dialog="closeCreateTeam"
      >
        <v-icon>mdi-account-plus</v-icon>サークル新規作成
      </v-btn>
      <v-btn color="teal lighten-1" dark to="/team" nuxt class="font-italic mr-2" v-else
        ><v-icon>mdi-account-edit</v-icon>サークル編集
      </v-btn>
      <!-- 活動計画作成ダイアログを開くボタン -->
      <BlueDialogButton
        v-if="teamName"
        title="活動計画作成"
        icon="mdi-pencil-plus"
        @dialog-button="openCreateActivityPlan"
      />
    </v-layout>
    <!-- 活動計画作成ダイアログ -->
    <AddActivityPlan
      :create-activity-plans.sync="planContents"
      :todo-categorys="todoCategorys"
      :create-activity-plan-dialog="createActivityPlanDialog"
      @open-create-activity-plan="openCreateActivityPlan"
      @close-activity-plan="closeCreateActivityPlan"
    />
    <v-divider class="mt-4" />
    <v-card class="mb-5">
      <!-- 完了状態に応じた絞り込み -->
      <FilteredActivityPlans :selected-activity-plans-filter.sync="selectActivityPlansFilter" />
      <v-divider />
      <!-- チームが作成されている時に表示 -->
      <v-layout v-if="teamName">
        <!-- 活動計画検索 -->
        <SearchActivityPlans
          :searched-category-keyword.sync="searchCategoryKeyword"
          :todo-categorys="todoCategorys"
        />
        <!-- 活動計画の並び替え -->
        <SortByActivityPlans
          :selected-sort-activity-plans.sync="selectSortActivityPlans"
          :sort-activity-plans-states="sortActivityPlansStates"
        />
      </v-layout>
      <v-layout v-else>
        <v-card-text class="text-center font-italic grey--text">
          サークルがありません
        </v-card-text></v-layout
      >
      <!-- ページネーション -->
      <ActivityPlansPagination
        :activity-plans-page.sync="activityPlansPage"
        @change-activity-plans-page="changeActivityPlansPage"
        :activity-plans-page-length="activityPlansPageLength"
      />
      <!-- 活動計画一覧 -->
      <ActivityPlansView
        :display-activity-plans="displayActivityPlans"
        :todo-categorys="todoCategorys"
      />
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: 'authenticated',

  data() {
    return {
      createTeam: {
        name: '',
        imageFile: null
      },
      createTeamDialog: false,
      planContents: {
        category: '',
        detail: '',
        imageFile: null,
        inChargeMember: [],
        fileName: '',
        photoURL: '',
        date: [new Date().toISOString().substr(0, 10)],
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
      createActivityPlanDialog: false
    }
  },
  mounted() {
    this.activityPlansPagination()
  },
  watch: {
    activityPlansFiltered() {
      this.activityPlansPagination()
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
          returnvalue = activityPlans.filter(activityPlan => !activityPlan.done)

          break
        case 'done':
          returnvalue = activityPlans.filter(activityPlan => activityPlan.done)

          break
        default:
      }
      return returnvalue
    },
    // 活動計画の検索
    searchActivityPlans() {
      const activityPlans = this.sortByActivityPlans
      if (this.searchCategoryKeyword === null) {
        return this.sortByActivityPlans
      }

      return activityPlans.filter(activityPlan => {
        return activityPlan.category.includes(this.searchCategoryKeyword.toUpperCase())
      })
    },
    // 活動計画の並べ替え
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
          returnvalue = this.sortByCategory
          break
      }
      return returnvalue
    },
    ...mapGetters('modules/activity-plans/activityPlans', [
      'sortByCategory',
      'sortByAscDate',
      'sortByDescDate'
    ]),
    ...mapGetters('modules/user/auth', ['photoURL']),
    ...mapGetters('modules/team/team', ['teamName']),
    ...mapState('modules/activity-plans/activityPlans', ['activityPlans'])
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
    openCreateActivityPlan() {
      this.createActivityPlanDialog = true
    },
    closeCreateActivityPlan() {
      this.createActivityPlanDialog = false
    },
    openCreateTeam() {
      this.createTeamDialog = true
    },
    closeCreateTeam() {
      this.createTeamDialog = false
    },
    // ページネーション機能
    activityPlansPagination() {
      const pageSize = this.activityPlansPageSize
      const activityPlans = this.activityPlansFiltered

      this.displayActivityPlans = activityPlans.slice(0, pageSize)
      this.activityPlansPageLength = Math.ceil(activityPlans.length / pageSize)
      this.activityPlansPage = 1
      this.changeActivityPlansPage(this.activityPlansPage)
    }
  }
}
</script>

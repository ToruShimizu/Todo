<template>
  <v-container style="max-width: 500px" class="mb-5 py-5">
    <v-row class="justify-center">
      <!-- サークル作成ダイアログ（チームが作成されていない時に表示） -->
      <template v-if="!circleName">
        <LazyCreateCircleDialog v-model="isOpenedCreateCircleDialog" />
        <AppButton width="200" @click="isOpenedCreateCircleDialog = true"
          >サークル新規作成
        </AppButton>
      </template>

      <!-- サークルが作成されている場合 -->
      <template v-else>
        <AppButton class="mx-2" width="150" color="teal lighten-1" to="/circle" nuxt
          >サークル編集
        </AppButton>

        <!-- 活動計画作成ダイアログを開くボタン -->
        <AppButton class="mx-2" width="150" @click="isOpenedCreateActivityPlanDialog = true"
          >活動計画作成
        </AppButton>
      </template>
    </v-row>
    <!-- 活動計画作成ダイアログ -->
    <LazyCreateActivityPlanDialog
      v-model="isOpenedCreateActivityPlanDialog"
      :items="todoCategorys"
    />
    <v-divider class="mt-4" />
    <v-card class="mb-5">
      <!-- 完了状態に応じた絞り込み -->
      <FilteredActivityPlans :selected-activity-plans-filter.sync="selectActivityPlansFilter" />
      <v-divider />

      <!-- チームが作成されている時に表示 -->
      <template v-if="circleName">
        <v-row>
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
        </v-row>
      </template>

      <!-- サークルがない場合 -->
      <template v-else>
        <v-row>
          <v-card-title class="text-center font-italic grey--text">
            サークルがありません
          </v-card-title>
        </v-row>
      </template>
      <!-- ページネーション -->
      <ActivityPlansPagination
        :activity-plans-page.sync="activityPlansPage"
        @change-activity-plans-page="changeActivityPlansPage"
        :activity-plans-page-length="activityPlansPageLength"
      />
      <!-- 活動計画一覧表示 -->
      <ActivityPlansCard
        v-for="contents in displayActivityPlans"
        :key="contents.id"
        :contents="contents"
        :items="todoCategorys"
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
      isOpenedCreateCircleDialog: false,
      isOpenedCreateActivityPlanDialog: false,
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
      displayActivityPlans: []
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
    ...mapGetters('modules/circle', ['circleName']),
    ...mapState('modules/activity-plans/activityPlans', ['activityPlans']),
    ...mapState('modules/circle', ['circle'])
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

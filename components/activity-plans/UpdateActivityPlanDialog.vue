<template>
  <AppDialog
    :is-opened="isOpened"
    class="update-activity-plan-dialog"
    @close="$emit('close', false)"
    title="活動計画編集"
  >
    <v-divider />
    <v-form v-model="isValid" ref="form" lazy-validation>
      <v-row class="mx-2">
        <!-- カテゴリ入力エリア -->
        <v-col cols="12" sm="6" md="6">
          <CategoryCombobox :items="items" :category.sync="contents.category" />
        </v-col>
        <!-- 日付入力エリア -->
        <v-col cols="12" sm="6" md="6"><DateForm :date.sync="contents.date" /> </v-col>
      </v-row>
      <!-- 担当入力エリア -->
      <v-row class="mx-2">
        <v-col cols="12"
          ><InChargeForm
            :in-charge-member.sync="contents.inChargeMember"
            :items="gettersCircleMember"
          />
        </v-col>
      </v-row>

      <!-- 詳細入力エリア -->
      <v-row class="mx-2">
        <v-col cols="12">
          <DetailForm :detail.sync="contents.detail" />
        </v-col>
      </v-row>
      <v-row class="mx-2">
        <v-col cols="12">
          <AppButton color="success" icon @click="runRemovePlanContensImage"
            ><v-icon>mdi-delete-outline</v-icon>
          </AppButton>
        </v-col>
        <!-- 画像入力エリア -->
        <v-col cols="12">
          <!-- 画像の表示 -->
          <LoadingImg
            class="mx-auto"
            v-if="contents.photoURL"
            :src="contents.photoURL"
            width="200"
            height="200"
          />
        </v-col>
      </v-row>
    </v-form>
    <!-- 保存ボタン、閉じるボタン -->
    <template slot="buttons">
      <AppButton :disabled="isValid" :loading="isRunning" @click="runUpdateActivityPlan(contents)"
        >保存する
      </AppButton>
      <AppButton :disabled="isRunning" color="success" outlined @click="$emit('close', false)"
        >キャンセル
      </AppButton>
    </template>
  </AppDialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UpdateActivityPlanDialog',
  model: {
    prop: 'isOpened',
    event: 'close'
  },
  props: {
    isOpened: {
      type: Boolean,
      required: true
    },
    contents: {
      type: Object,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isRunning: false,
      isValid: false
    }
  },
  computed: {
    ...mapGetters('modules/circle', ['gettersCircleMember'])
  },
  methods: {
    // 活動計画更新ボタン
    async runUpdateActivityPlan(planContents) {
      if (!confirm('活動計画を更新しますか？')) return
      await this.updateActivityPlan(planContents)
      this.$emit('close', false)
    },

    // 画像ファイルを削除
    runRemovePlanContensImage() {
      if (!confirm('画像を削除しますか？')) return
      this.removePlanContentsImage(this.contents)
    },
    // 画像ファイルを更新
    runUpdateImageFile(planContents) {
      if (!confirm('画像を更新しますか？')) return
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

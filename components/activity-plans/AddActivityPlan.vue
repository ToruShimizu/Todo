<template>
  <AppDialog :is-opened="isOpened" @close="$emit('close', false)" title="活動計画作成">
    <v-divider />
    <v-form v-model="isValid" ref="form" lazy-validation>
      <v-row class="mx-2">
        <!-- カテゴリ入力エリア -->
        <v-col cols="12" sm="6" md="6">
          <CategoryCombobox :items="items" :category.sync="planContents.category" />
        </v-col>
        <!-- 日付入力エリア -->
        <v-col cols="12" sm="6" md="6"><DateForm :date.sync="planContents.date" /> </v-col>
      </v-row>
      <!-- 担当入力エリア -->
      <v-row class="mx-2">
        <v-col cols="12" sm="12" md="12"
          ><InChargeForm
            :in-charge-member.sync="planContents.inChargeMember"
            :items="gettersTeamMember"
          />
        </v-col>
      </v-row>

      <!-- 詳細入力エリア -->
      <v-row class="mx-2">
        <v-col cols="12">
          <DetailForm :detail.sync="planContents.detail" />
        </v-col>
      </v-row>
      <slot name="imageFile"></slot>
      <v-row class="mx-2">
        <v-col cols="12" sm="12" md="12">
          <!-- 画像入力エリア -->
          <InputFile
            :imageFile.sync="planContents.imageFile"
            @change-image-file="changeImageFile"
          />
        </v-col>
      </v-row>
    </v-form>
    <!-- 保存ボタン、閉じるボタン -->
    <template slot="buttons">
      <AppButton :disabled="isValid" :loading="isRunning" @click="createActivityPlan"
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
  model: {
    prop: 'isOpened',
    event: 'close'
  },
  props: {
    isOpened: {
      type: Boolean,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
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
      isRunning: false,
      isValid: false
    }
  },
  computed: {
    ...mapGetters('modules/team/team', ['gettersTeamMember'])
  },
  methods: {
    // 活動計画作成
    async createActivityPlan(planContents) {
      if (planContents.imageFile) {
        await this.uploadPlanContentsImageFile(planContents)
      } else {
        await this.addActivityPlan(planContents)
      }
      this.$emit('close', false)
    },

    // 画像ファイルを変換
    changeImageFile(file) {
      this.planContents.imageFile = file
      this.$emit('update-image-file', this.planContents)
    },

    ...mapActions('modules/activity-plans/activityPlans', [
      'addActivityPlan',
      'uploadPlanContentsImageFile'
    ])
  }
}
</script>

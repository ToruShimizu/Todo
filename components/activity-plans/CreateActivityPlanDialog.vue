<template>
  <AppDialog
    :is-opened="isOpened"
    class="create-activity-plan-dialog"
    @close="$emit('close', false)"
    title="活動計画作成"
  >
    <v-divider />
    <v-form v-model="isValid" ref="form" lazy-validation>
      <v-row class="mx-2">
        <!-- カテゴリ入力エリア -->
        <v-col cols="12" sm="6" md="6">
          <CategoryCombobox :items="items" :category.sync="createPlanContentsInput.category" />
        </v-col>
        <!-- 日付入力エリア -->
        <v-col cols="12" sm="6" md="6"
          ><DateForm :date.sync="createPlanContentsInput.date" />
        </v-col>
      </v-row>
      <!-- 担当入力エリア -->
      <v-row class="mx-2">
        <v-col cols="12" sm="12" md="12"
          ><InChargeForm
            :in-charge-member.sync="createPlanContentsInput.inChargeMember"
            :items="gettersCircleMember"
          />
        </v-col>
      </v-row>

      <!-- 詳細入力エリア -->
      <v-row class="mx-2">
        <v-col cols="12">
          <DetailForm :detail.sync="createPlanContentsInput.detail" />
        </v-col>
      </v-row>
      <slot name="imageFile"></slot>
      <v-row class="mx-2">
        <v-col cols="12" sm="12" md="12">
          <!-- 画像入力エリア -->
          <InputFile
            :imageFile.sync="createPlanContentsInput.imageFile"
            @change-image-file="changeImageFile"
          />
        </v-col>
      </v-row>
    </v-form>
    <!-- 保存ボタン、閉じるボタン -->
    <template slot="buttons">
      <AppButton :disabled="isValid" :loading="isRunning" @click="runCreateActivityPlan"
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
  name: 'CreateActivityPlanDialog',
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
      createPlanContentsInput: {
        category: '',
        detail: '',
        imageFile: null,
        inChargeMember: [],
        fileName: '',
        photoURL: '',
        date: [new Date().toISOString().substr(0, 10)],
        done: false
      },
      isRunning: false,
      isValid: false
    }
  },
  computed: {
    ...mapGetters('modules/circle', ['gettersCircleMember'])
  },
  methods: {
    // 活動計画作成
    async runCreateActivityPlan() {
      if (!confirm('活動計画を作成しますか？')) return
      if (this.createPlanContentsInput.imageFile) {
        await this.uploadPlanContentsImageFile(this.createPlanContentsInput)
      } else {
        await this.createActivityPlan(this.createPlanContentsInput)
      }
      this.$emit('close', false)
    },

    // 画像ファイルを変換
    changeImageFile(file) {
      this.createPlanContentsInput.imageFile = file
      this.$emit('update-image-file', this.createPlanContentsInput)
    },

    ...mapActions('modules/activity-plans/activityPlans', [
      'createActivityPlan',
      'uploadPlanContentsImageFile'
    ])
  }
}
</script>

<template>
  <FormDialog :form-dialog="activityPlanDialog">
    <template v-slot:dialog>
      <v-card width="500px" class="mx-auto">
        <v-divider />
        <v-form v-model="isValid" ref="form" lazy-validation>
          <v-row class="mx-2">
            <!-- カテゴリ入力エリア -->
            <v-col cols="12" sm="6" md="6">
              <CategoryCombobox :items="categorys" :category.sync="planContents.category" />
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
          <!-- 保存ボタン、閉じるボタン -->
          <AppButton :disabled="isValid" :loading="isRunning" @click="handleSaveActivityPlan"
            >保存する
          </AppButton>
          <AppButton :disabled="isRunning" color="success" outlined @click="closeActivityPlan"
            >キャンセル
          </AppButton>
        </v-form>
      </v-card>
    </template>
  </FormDialog>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: String,
    planContents: {
      type: Object,
      required: true
    },
    categorys: {
      type: Array,
      required: true
    },
    activityPlanDialog: {
      type: Boolean,
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
    ...mapGetters('modules/team/team', ['gettersTeamMember'])
  },
  methods: {
    // 活動計画作成
    async handleSaveActivityPlan() {
      const planContents = this.planContents
      if (planContents.category === '') {
        this.$refs.form.validate()
        return
      }
      this.$emit('save-activity-plan', planContents)
    },
    // ダイアログを閉じるボタン
    closeActivityPlan() {
      this.$refs.form.reset()
      this.planContents.category = []
      this.planContents.inChargeMember = []
      this.planContents.detail = ''
      this.planContents.date = [
        new Date().toISOString().substr(0, 10),
        new Date().toISOString().substr(0, 10)
      ]
      this.$emit('close-activity-plan')
    },
    // 画像ファイルを変換
    changeImageFile(file) {
      this.planContents.imageFile = file
      this.$emit('update-image-file', this.planContents)
    }
  }
}
</script>

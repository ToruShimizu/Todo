<template>
  <FormDialog :form-dialog="activityPlanDialog">
    <template v-slot:dialog>
      <FormView :title="title">
        <template v-slot:form>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <!-- カテゴリ入力エリア -->
                <v-col cols="12" sm="6" md="6">
                  <CategoryCombobox :items="categorys" :category.sync="planContents.category" />
                </v-col>
                <!-- 日付入力エリア -->
                <v-col cols="12" sm="6" md="6"><DateForm :date.sync="planContents.date" /> </v-col>
                <v-col cols="12" sm="12" md="12"
                  ><InChargeForm
                    :in-charge-member.sync="planContents.inChargeMember"
                    :items="gettersTeamMember"
                  />
                </v-col>
                <!-- 詳細入力エリア -->
                <v-col cols="12">
                  <DetailForm :detail.sync="planContents.detail" />
                </v-col>
                <slot name="imageFile"></slot>
                <v-col cols="12" sm="12" md="12">
                  <!-- 画像入力エリア -->
                  <InputFile
                    :imageFile.sync="planContents.imageFile"
                    @change-image-file="changeImageFile"
                  />
                </v-col>
              </v-row>
            </v-container>
            <!-- 保存ボタン、閉じるボタン -->
            <SaveAndCloseButton
              close-button-title="close"
              save-button-title="save"
              :loader="null"
              icon="mdi-pencil-plus"
              @save-button="handleSaveActivityPlan"
              @close-button="closeActivityPlan"
            />
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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

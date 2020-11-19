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
                  <CategoryComboBox :items="categorys" :category.sync="planContents.category" />
                </v-col>
                <!-- 日付入力エリア -->
                <v-col cols="12" sm="6" md="6"><DateForm :date.sync="planContents.date" /> </v-col>
                <!-- 詳細入力エリア -->
                <v-col cols="12">
                  <DetailForm :detail.sync="planContents.detail" />
                </v-col>
                <slot name="comment"></slot>
              </v-row>
            </v-container>
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              @save-button="handleSaveActivityPlan"
              @close-button="closeActivityPlan"
              ><template v-slot:save> <v-icon>mdi-pencil-plus-outline </v-icon></template>
            </SaveAndCloseButton>
          </v-form>
        </template>
      </FormView>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormDialog from '@/components/commonParts/dialog/FormDialog'
import CategoryComboBox from '@/components/commonParts/activityPlans/input/CategoryComboBox'
import DetailForm from '@/components/commonParts/activityPlans/input/DetailForm'
import DateForm from '@/components/commonParts/activityPlans/input/DateForm'
import FormView from '@/components/commonParts/form/FormView'

export default {
  components: {
    SaveAndCloseButton,
    FormDialog,
    CategoryComboBox,
    DetailForm,
    DateForm,
    FormView
  },

  props: {
    title: String,
    planContents: {
      type: Object,
      required: false,
      default: () => ({
        category: '',
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        done: false
      })
    },
    categorys: {
      type: Array,
      required: true
    },
    activityPlanDialog: {
      type: Boolean,
      required: true,
      detail: false
    }
  },

  methods: {
    async handleSaveActivityPlan() {
      const planContents = this.planContents
      if (planContents.category === '') {
        this.$refs.form.validate()
        return
      }
      this.$emit('save-activity-plan', planContents)
    },
    closeActivityPlan() {
      this.planContents.category = []
      this.planContents.detail = ''
      this.planContents.date = new Date().toISOString().substr(0, 10)
      this.$refs.category.reset()
      this.$emit('close-activity-plan')
    },
    inputDate() {
      this.dateMenu = false
    }
  }
}
</script>

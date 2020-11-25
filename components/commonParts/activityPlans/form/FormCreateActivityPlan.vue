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
                <v-col cols="12" sm="12" md="12"
                  ><InChangeForm
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
                  <InputFile
                    :imageFile.sync="planContents.imageFile"
                    @change-image-file="changeImageFile"
                  />
                </v-col>
                <slot name="comment"></slot>
              </v-row>
            </v-container>
            <SaveAndCloseButton
              :close-button-title="'close'"
              :save-button-title="'save'"
              :loader="null"
              :icon="'mdi-pencil-plus-outline'"
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
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormDialog from '@/components/commonParts/dialog/FormDialog'
import CategoryComboBox from '@/components/commonParts/activityPlans/input/CategoryComboBox'
import DetailForm from '@/components/commonParts/activityPlans/input/DetailForm'
import DateForm from '@/components/commonParts/activityPlans/input/DateForm'
import InChangeForm from '@/components/commonParts/activityPlans/input/InChargeForm'
import FormView from '@/components/commonParts/form/FormView'
import InputFile from '@/components/commonParts/form/InputFile'

export default {
  components: {
    SaveAndCloseButton,
    FormDialog,
    CategoryComboBox,
    DetailForm,
    DateForm,
    InChangeForm,
    FormView,
    InputFile
  },

  props: {
    title: String,
    planContents: {
      type: Object,
      required: true,
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
  computed: {
    ...mapGetters('modules/team/team', ['gettersTeamMember'])
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
    inputDate() {
      this.dateMenu = false
    },
    changeImageFile(file) {
      this.planContents.imageFile = file
      this.$emit('update-image-file', this.planContents)
    }
  }
}
</script>

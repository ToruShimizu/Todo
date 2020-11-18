<template>
  <FormDialog :form-dialog="activityPlanDialog">
    <template v-slot:dialog>
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-title class="justify-center font-italic grey--text darken">
            <span class="headline">{{ title }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <!-- 活動計画入力エリア -->
                <v-col cols="12" sm="6" md="6">
                  <CategoryCombobox :items="categorys" :category.sync="planContents.category" />
                </v-col>
                <!-- 日付入力エリア -->
                <v-col cols="12" sm="6" md="6">
                  <v-menu
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="planContents.date"
                        label="日付"
                        prepend-inner-icon="mdi-calendar-today"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="planContents.date" no-title @input="dateMenu = false" />
                  </v-menu>
                </v-col>
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
              ><template v-slot:save>
                <v-icon>mdi-pencil-plus-outline </v-icon></template
              ></SaveAndCloseButton
            >
          </v-form>
        </v-card>
      </v-col>
    </template>
  </FormDialog>
</template>

<script>
import { mapActions } from 'vuex'
import SaveAndCloseButton from '@/components/commonParts/button/SaveAndCloseButton'
import FormDialog from '@/components/commonParts/dialog/FormDialog'
import CategoryCombobox from '@/components/commonParts/activityPlans/input/CategoryCombobox'
import DetailForm from '@/components/commonParts/activityPlans/input/DetailForm'
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],

  components: {
    SaveAndCloseButton,
    FormDialog,
    CategoryCombobox,
    DetailForm
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
  data() {
    return {
      dateMenu: false
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
      this.$refs.category.reset()
      this.planContents.category = []
      this.planContents.detail = ''
      this.planContents.date = new Date().toISOString().substr(0, 10)
      this.$emit('close-activity-plan')
    }
  }
}
</script>

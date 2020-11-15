<template>
  <v-app>
    <v-dialog
      v-model="addActivityPlanDialog"
      persistent
      max-width="600px"
      transition="scroll-y-transition"
    >
      <v-app>
        <v-col cols="12" sm="12" md="12">
          <v-card>
            <v-card-title>
              <span class="headline">活動計画作成</span>
            </v-card-title>
            <v-form ref="form" lazy-validation>
              <v-container>
                <v-row>
                  <!-- 活動計画入力エリア -->
                  <v-col cols="12" sm="6" md="6">
                    <v-combobox
                      ref="category"
                      v-model="planContents.category"
                      :items="qcCategorys"
                      label="やること"
                      dense
                      :rules="[validRules.categoryRules.required]"
                    />
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
                      <v-date-picker
                        v-model="planContents.date"
                        no-title
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <!-- 詳細入力エリア -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="planContents.detail"
                      label="詳細"
                      prepend-inner-icon="mdi-briefcase-outline"
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-btn color="blue darken-1" text @click="closeAddActivityPlan">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="handleAddActivityPlan">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-app>
    </v-dialog>

    <v-btn color="primary" dark @click="openAddActivityPlan">
      <v-icon>mdi-pen-plus</v-icon>活動計画を作成する
    </v-btn>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'
export default {
  mixins: [FormValidation],
  props: {
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
    qcCategorys: {
      type: Array,
      required: true
    },
    addActivityPlanDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dateMenu: false
    }
  },
  computed: {
    createPlanContents: {
      get() {
        return this.planContents
      },
      set(createPlanContents) {
        this.$emit('update:create-activity-plan', createPlanContents)
      }
    }
  },
  methods: {
    async handleAddActivityPlan() {
      const planContents = this.planContents
      if (planContents.category === '') {
        this.$refs.form.validate()
        return
      }
      await this.addActivityPlan(planContents)
      this.closeAddActivityPlan()
    },
    openAddActivityPlan() {
      this.$emit('open-add-activity-plan')
    },
    closeAddActivityPlan() {
      this.$refs.category.reset()
      this.createPlanContents.category = []
      this.createPlanContents.detail = ''
      this.createPlanContents.date = new Date().toISOString().substr(0, 10)
      this.$emit('close-add-activity-plan')
    },
    ...mapActions('modules/activityPlans/activityPlans', ['addActivityPlan'])
  }
}
</script>

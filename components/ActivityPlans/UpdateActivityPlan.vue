<template>
  <v-dialog
    v-model="updateActivityPlanDialog"
    persistent
    max-width="600px"
    transition="scroll-y-transition"
  >
    <v-app>
      <v-col cols="12" sm="12" md="12">
        <v-card>
          <v-card-title>
            <span class="headline">QC活動計画詳細×編集</span>
          </v-card-title>
          <v-form ref="form" lazy-validation>
            <v-container>
              <v-row>
                <!-- タスク編集エリア -->
                <v-col cols="12" sm="12" md="12">
                  <v-combobox
                    ref="category"
                    v-model="editedPlanContents"
                    :items="qcCategorys"
                    label="カテゴリを変更"
                    multiple
                    chips
                    :rules="[validRules.categoryRules.required]"
                  >
                    <template v-slot:selection="contents">
                      <v-chip>
                        <v-avatar
                          class="accent white--text"
                          left
                          v-text="contents.item.slice(0, 1).toUpperCase()"
                        ></v-avatar>
                        {{ contents.item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>
                <!-- 日付編集エリア -->
                <v-col cols="12">
                  <v-menu
                    v-model="updateDateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editedPlanContents"
                        label="日付を変更"
                        prepend-inner-icon="mdi-calendar-today"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editedPlanContents"
                      no-title
                      scrollable
                      @input="updateDateMenu = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <!-- 詳細編集エリア -->
                <v-col cols="12">
                  <v-text-field
                    v-model="editedPlanContents"
                    label="詳細を変更"
                    prepend-inner-icon="mdi-briefcase-outline"
                    clearable
                  ></v-text-field>
                </v-col>
                <AddComment :planContents-id="editPlanContents" />
                <Comment :planContents-id="editPlanContents" />
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeUpdateActivityPlan">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="handleUpdateActivityPlan">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-app>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddComment from '@/components/Comment/AddComment'
import Comment from '@/components/Comment/Comment'
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  components: {
    AddComment,
    Comment
  },
  mixins: [FormValidation],
  props: {
    editPlanContents: {
      type: Object,
      required: false
    },
    qcCategorys: {
      type: Array,
      required: true
    },
    updateActivityPlanDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      updateDateMenu: false
    }
  },
  computed: {
    editedPlanContents: {
      get() {
        return this.editPlanContents
      },
      set(editedPlanContents) {
        this.$emit('update:edited-plan-contents', editedPlanContents)
      }
    },
    ...mapState('modules/comment', ['comments'])
  },
  methods: {
    async handleUpdateActivityPlan() {
      const editPlanContens = this.editedPlanContents
      if (editPlanContens.category.length === 0) {
        this.$refs.form.validate()
        return
      }
      await this.updateActivityPlan(editPlanContens)
      await this.fetchActivityPlans()
      this.closeUpdateActivityPlan()
    },
    closeUpdateActivityPlan() {
      this.$emit('close-update-activity-plan')
    },
    ...mapActions('modules/activityPlans/activityPlans', [
      'fetchActivityPlans',
      'updateActivityPlan'
    ])
  }
}
</script>

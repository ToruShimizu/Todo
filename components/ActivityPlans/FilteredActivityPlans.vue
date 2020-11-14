<template>
  <!-- 完了、未完了のタブ切り替え -->
  <v-tabs>
    <v-tab @click="selectedActivityPlansFilter = 'all'">全て:{{ activityPlans.length }}</v-tab>
    <v-divider vertical />
    <v-tab @click="selectedActivityPlansFilter = 'active'"
      >実施前:{{ remainingActivityPlansLength }}</v-tab
    >
    <v-divider vertical />
    <v-tab @click="selectedActivityPlansFilter = 'done'">
      実施済: {{ completedActivityPlansLength }}/{{ activityPlans.length }}
      <!-- 完了率の表示 -->
      <v-progress-circular
        v-if="activityPlans.length > 0"
        :value="completionRateOfActivityPlans"
        :rotate="270"
        :size="45"
        class="ml-1"
        color="success"
        >{{ completionRateOfActivityPlans }}</v-progress-circular
      >
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    selectActivityPlansFilter: {
      type: String,
      required: false,
      default: 'all'
    }
  },
  computed: {
    selectedActivityPlansFilter: {
      get() {
        return this.selectActivityPlansFilter
      },
      set(selectedActivityPlansFilter) {
        this.$emit('update:selected-activity-plans-filter', selectedActivityPlansFilter)
      }
    },
    ...mapGetters('modules/activityPlans/activityPlans', [
      'completedActivityPlansLength',
      'remainingActivityPlansLength',
      'completionRateOfActivityPlans'
    ]),
    ...mapState('modules/activityPlans/activityPlans', ['activityPlans'])
  }
}
</script>

<style>
/* Vuetifyの仕様上スタイルが適用されてしまうため非表示にする */
.v-slide-group__prev {
  display: none !important;
}
</style>

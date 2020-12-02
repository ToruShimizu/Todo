<template>
  <div class="text-center">
    <v-pagination
      v-model="activityPlansPageCount"
      :length="activityPlansPageLength"
      @input="changeActivityPlansPage"
    />
  </div>
</template>

<script>
export default {
  props: {
    activityPlansPage: {
      type: Number,
      required: true
    },
    activityPlansPageLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    activityPlansPageCount: {
      get() {
        return this.activityPlansPage
      },
      set(setActivityPlansPage) {
        this.$emit('update:activity-plans-page', setActivityPlansPage)
      }
    }
  },
  methods: {
    changeActivityPlansPage(pageNumber) {
      this.$emit('change-activity-plans-page', pageNumber)
    }
  }
}
</script>

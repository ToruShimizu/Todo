<template>
  <v-col cols="12">
    <template v-for="contents in displayActivityPlans">
      <transition :key="contents.catgorys" name="list">
        <v-card class="mb-2">
          <v-card-actions>
            <v-btn icon @click="toggleDoneActivityPlan(contents)">
              <v-icon :class="(!contents.done && 'grey--text') || 'primary--text'"
                >mdi-check-circle-outline
              </v-icon>
            </v-btn>
            <v-card-title
              :class="(contents.done && 'grey--text') || 'black--text'"
              class="headline pa-0"
              v-text="contents.category"
            ></v-card-title>

            <v-card-subtitle v-text="contents.date" class="pb-0 mt-1"></v-card-subtitle>
            <v-spacer />
            <v-btn icon>
              <v-icon @click="handleRemoveActivityPlan(contents)">mdi-delete-outline</v-icon>
            </v-btn>
          </v-card-actions>

          <v-card-actions>
            <v-card-subtitle v-text="contents.detail" class="py-0 mt-1"></v-card-subtitle>
          </v-card-actions>
          <v-card-actions>
            <v-card-subtitle v-text="contents.inChargeMember" class="py-0 mt-1"></v-card-subtitle>
          </v-card-actions>
        </v-card>
      </transition>
    </template>
  </v-col>
</template>

<script>
export default {
  props: {
    displayActivityPlans: {
      type: Array,
      required: true
    }
  },
  methods: {
    handleRemoveActivityPlan(contents) {
      this.$emit('handle-remove-activity-plan', contents)
    },
    toggleDoneActivityPlan(contents) {
      this.$emit('toggle-done-activity-plan', contents)
    }
  }
}
</script>
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
              class="pa-0"
              v-text="contents.category"
            ></v-card-title>

            <v-card-subtitle v-text="contents.date" class="pb-0 mt-1"></v-card-subtitle>
            <v-spacer />
            <v-menu transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item class="px-0">
                  <v-list-item-title>
                    <v-btn text @click="openActivityPlan(contents)">
                      <v-icon>mdi-pencil-outline </v-icon>編集
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0">
                  <v-list-item-title>
                    <v-btn text @click="handleRemoveActivityPlan(contents)">
                      <v-icon>mdi-delete-outline</v-icon>削除
                    </v-btn>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>

          <v-card-actions>
            <v-card-subtitle v-text="contents.detail" class="py-0 mt-1"></v-card-subtitle>
          </v-card-actions>
          <v-card-actions>
            <v-card-subtitle v-text="contents.inChargeMember" class="py-0 mt-1"></v-card-subtitle>
            <v-spacer />
            <v-btn icon>
              <v-icon> mdi-file-image-outline </v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-comment-text-outline </v-icon>
            </v-btn>
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
    },
    openActivityPlan(contents) {
      this.$emit('open-activity-plan', contents)
    }
  }
}
</script>
<template>
  <div>
    <template>
      <transition :key="contents.catgorys" name="list">
        <v-card class="mb-2">
          <v-card-actions class="pa-0">
            <v-card-title class="pa-1">
              <v-btn icon @click="toggleDoneActivityPlan(contents)">
                <v-icon :class="(!contents.done && 'grey--text') || 'primary--text'"
                  >mdi-check-circle-outline
                </v-icon>
              </v-btn>
              <v-card-title
                :class="(contents.done && 'grey--text') || 'black--text'"
                class="pa-0 hidden-sm-and-down"
                v-text="contents.category"
              ></v-card-title>
              <v-card-subtitle
                :class="
                  (contents.done && 'grey--text text-decoration-line-through') || 'black--text'
                "
                class="pa-0 mt-1 hidden-sm-and-up"
                v-text="contents.category"
              ></v-card-subtitle>
            </v-card-title>

            <v-spacer />
            <v-card-subtitle class="pa-0 mt-1">
              <v-icon class="mb-1">mdi-account-outline </v-icon>
              {{ inChargeMember }}
            </v-card-subtitle>
            <v-menu transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item class="px-0">
                  <v-list-item-title>
                    <TextButton
                      @handle-text-button="openActivityPlan(contents)"
                      :icon="'mdi-pencil-outline '"
                      :title="'編集'"
                    />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0">
                  <v-list-item-title>
                    <TextButton
                      @handle-text-button="handleRemoveActivityPlan(contents)"
                      :icon="'mdi-delete-outline'"
                      :title="'削除'"
                    />
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>

          <v-card-actions>
            <v-card-subtitle v-if="contents.detail" class="py-0 mt-1">
              "{{ contents.detail }}"
            </v-card-subtitle>
          </v-card-actions>
          <v-card-actions>
            <v-card-subtitle v-text="planContentsDateRangeText" class="pb-0 mt-1"></v-card-subtitle>

            <v-spacer />
            <IconButton :icon="'mdi-file-image-outline'" />
            {{ contents.photoURL ? '1' : '' }}
            <IconButton :icon="'mdi-comment-text-outline '" />
          </v-card-actions>
        </v-card>
      </transition>
    </template>
  </div>
</template>

<script>
import IconButton from '@/components/commonParts/button/IconButton'
import TextButton from '@/components/commonParts/button/TextButton/Textbutton'
export default {
  components: {
    IconButton,
    TextButton
  },
  props: {
    contents: {
      type: Object,
      required: true
    }
  },
  computed: {
    inChargeMember() {
      return this.contents.inChargeMember.join(',')
    },
    planContentsDateRangeText() {
      return this.contents.date.join('~')
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
      console.log(contents)
      this.$emit('open-activity-plan', contents)
    }
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.8s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
<template>
  <div>
    <template>
      <transition-group name="card-anim">
        <v-card class="mb-5 elevation-5" :key="contents.id">
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
            <CommentView
              :comment-dialog="commentDialog"
              @close-comment="closeComment"
              :plan-contents="contents"
            />
            <IconButton :icon="'mdi-comment-text-outline '" @handle-icon-button="openComment" />
            {{ contents.comments.length }}
            <v-spacer />
            <v-menu transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list color="blue-grey darken-4">
                <v-list-item class="px-0">
                  <v-list-item-title>
                    <TextButton
                      class="white--text font-weight-bold"
                      @handle-text-button="openActivityPlan(contents)"
                      :icon="'mdi-pencil'"
                      :title="'編集'"
                    />
                  </v-list-item-title>
                </v-list-item>
                <v-list-item class="px-0">
                  <v-list-item-title>
                    <TextButton
                      class="white--text font-weight-bold"
                      @handle-text-button="handleRemoveActivityPlan(contents)"
                      :icon="'mdi-delete'"
                      :title="'削除'"
                    />
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
          <v-card-actions>
            <template v-if="contents.done">
              <v-card-subtitle class="pa-0">
                <v-icon> mdi-check </v-icon>
                {{ contents.completionDate }}
              </v-card-subtitle>
            </template>
            <template v-else>
              <v-card-subtitle class="pa-0">
                <v-icon>mdi-calendar-range </v-icon>
                {{ planContentsDateRangeText }}
              </v-card-subtitle>
            </template>
            <v-spacer />
            <v-card-subtitle class="pa-0">
              <v-icon class="mb-1">mdi-account-outline </v-icon>
              {{ inChargeMember }}
            </v-card-subtitle>
          </v-card-actions>

          <v-card-subtitle v-if="contents.detail" class="mb-2 pa-0 text-center">
            "{{ contents.detail }}"
          </v-card-subtitle>
          <v-list-item v-if="contents.photoURL">
            <ActivityPlansThumbnail class="mx-auto mb-3" :photoURL="contents.photoURL" />
          </v-list-item>
        </v-card>
      </transition-group>
    </template>
  </div>
</template>

<script>
import ActivityPlansThumbnail from '@/components/ActivityPlans/ActivityPlansThumbnail'
import CommentView from '@/components/comment/CommentView'
import IconButton from '@/components/commonParts/button/IconButton'
import TextButton from '@/components/commonParts/button/TextButton/Textbutton'
export default {
  components: {
    IconButton,
    TextButton,
    CommentView,
    ActivityPlansThumbnail
  },
  props: {
    contents: {
      type: Object,
      required: true
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      commentDialog: false,
      editImageFile: ''
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
    },
    openComment() {
      this.commentDialog = true
    },
    closeComment() {
      this.commentDialog = false
    }
  }
}
</script>


<style scoped>
.headline {
  text-overflow: inherit;
  white-space: unset;
}
.card-anim-enter-active {
  animation: fadeInUp 0.7s;
  animation-delay: 0.4s;
  opacity: 0;
}
.card-anim-leave-active {
  animation: fadeInUp 0.7s reverse;
}

@keyframes fadeInUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  60% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>


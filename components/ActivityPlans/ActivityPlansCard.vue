<template>
  <div>
    <template>
      <transition-group name="card-anim">
        <v-card class="mb-2" :key="contents.id">
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
            <v-card-subtitle v-if="contents.detail" class="py-0 mt-1">
              "{{ contents.detail }}"
            </v-card-subtitle>
          </v-card-actions>
          <v-card-actions>
            <v-fab-transition>
              <v-card-subtitle class="pa-0 mt-1" v-if="contents.done">
                <v-icon> mdi-check </v-icon>
                {{ contents.completionDate }}
              </v-card-subtitle>
            </v-fab-transition>
            <v-fab-transition>
              <v-card-subtitle
                v-if="!contents.done"
                v-text="planContentsDateRangeText"
                class="pb-0 mt-1"
              ></v-card-subtitle>
            </v-fab-transition>
            <v-spacer />
            <ActivityPlansImageFile
              :contents="contents"
              :image-file-dialog="imageFileDialog"
              @close-image-file="closeImageFile"
            />
            <template v-if="contents.photoURL">
              <IconButton :icon="'mdi-file-image-outline'" @handle-icon-button="openImageFile" />1
            </template>
            <template v-else>
              <v-icon>mdi-file-image-outline</v-icon>
            </template>
            <CommentView
              :comment-dialog="commentDialog"
              @close-comment="closeComment"
              :plan-contents="contents"
            />
            <IconButton :icon="'mdi-comment-text-outline '" @handle-icon-button="openComment" />
          </v-card-actions>
        </v-card>
      </transition-group>
    </template>
  </div>
</template>

<script>
import ActivityPlansImageFile from '@/components/ActivityPlans/ActivityPlansImageFile'
import CommentView from '@/components/comment/CommentView'
import IconButton from '@/components/commonParts/button/IconButton'
import TextButton from '@/components/commonParts/button/TextButton/Textbutton'
export default {
  components: {
    IconButton,
    TextButton,
    ActivityPlansImageFile,
    CommentView
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
      imageFileDialog: false,
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
    openImageFile() {
      this.imageFileDialog = true
    },
    closeImageFile() {
      this.imageFileDialog = false
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

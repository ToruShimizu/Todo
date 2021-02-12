<template>
  <div>
    <template>
      <transition-group name="card-anim">
        <v-card class="mb-5 elevation-5" :key="contents.id">
          <v-card-actions class="pa-0">
            <v-card-title class="pa-1">
              <!-- 完了チェックボタン -->
              <v-btn icon @click="toggleDoneActivityPlan(contents)">
                <v-icon :class="(!contents.done && 'grey--text') || 'primary--text'"
                  >mdi-check-circle-outline
                </v-icon>
              </v-btn>
              <!-- カテゴリ表 -->
              <v-card-title :class="(contents.done && 'grey--text') || 'black--text'" class="pa-0"
                >{{ contents.category }}
              </v-card-title>
            </v-card-title>
            <!-- コメント作成ダイアログ -->
            <CommentView
              :comment-dialog="isOpenedCommentDialog"
              :plan-contents="contents"
              @close-comment="isOpenedCommentDialog = false"
            />
            <!-- コメントを開くダイアログ -->
            <AppButton width="50" color="success" icon @click="isOpenedCommentDialog = true"
              ><v-icon>mdi-comment-text-outline</v-icon></AppButton
            >
            {{ contents.comments.length }}
            <v-spacer />
            <!-- 削除・編集選択リスト -->
            <v-menu transition="slide-y-transition" bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon> mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="openActivityPlan(contents)">
                  <v-list-item-title class="font-weight-bold">
                    編集する
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleRemoveActivityPlan(contents)">
                  <v-list-item-title class="font-weight-bold">
                    削除する
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
          <v-card-actions>
            <!-- 完了している場合は完了日時を表示 -->
            <template v-if="contents.done">
              <v-card-subtitle class="pa-0">
                <v-icon> mdi-check </v-icon>
                {{ contents.completionDate }}
              </v-card-subtitle>
            </template>
            <template v-else>
              <!-- 実施予定日または期間を表示 -->
              <v-card-subtitle class="pa-0">
                <v-icon>mdi-calendar-range </v-icon>
                {{ planContentsDateRangeText }}
              </v-card-subtitle>
            </template>
            <v-spacer />
            <!-- 担当者の表示 -->
            <v-card-subtitle class="pa-0">
              <v-icon class="mb-1">mdi-account-outline </v-icon>
              {{ inChargeMember }}
            </v-card-subtitle>
          </v-card-actions>
          <!-- 詳細表示 -->
          <v-card-subtitle v-if="contents.detail" class="mb-2 pa-0 text-center">
            "{{ contents.detail }}"
          </v-card-subtitle>
          <!-- 画像表示 -->
          <v-list-item v-if="contents.photoURL">
            <ActivityPlansThumbnail class="mx-auto mb-3" :photoURL="contents.photoURL" />
          </v-list-item>
        </v-card>
      </transition-group>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpenedCommentDialog: false
    }
  },
  computed: {
    // 担当者の配列を文字列に加工
    inChargeMember() {
      return this.contents.inChargeMember.join(',')
    },
    // 日時の配列を文字列に加工
    planContentsDateRangeText() {
      return this.contents.date.join('~')
    }
  },
  methods: {
    // 削除ボタン
    handleRemoveActivityPlan(contents) {
      this.$emit('handle-remove-activity-plan', contents)
    },
    // 完了・未完了切り替えボタン
    toggleDoneActivityPlan(contents) {
      this.$emit('toggle-done-activity-plan', contents)
    },
    // 活動計画作成ダイアログを開く
    openActivityPlan(contents) {
      this.$emit('open-activity-plan', contents)
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

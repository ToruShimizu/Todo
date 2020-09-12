<template>
  <!-- 完了、未完了のタブ切り替え -->
  <v-tabs>
    <v-tab @click="selectedTaskFilter = 'all'">全て:{{ todos.length }}</v-tab>
    <v-divider vertical />
    <v-tab @click="selectedTaskFilter = 'active'" class>未完了:{{ remainingTodos }}</v-tab>
    <v-divider vertical />
    <v-tab @click="selectedTaskFilter = 'done'">
      完了: {{ completedTodos }}/{{todos.length}}
      <!-- 完了率の表示 -->
      <v-progress-circular
        :value="progress"
        :rotate="270"
        :size="45"
        class="ml-1"
        color="success"
      >{{progress}}</v-progress-circular>
    </v-tab>
  </v-tabs>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  props: {
    taskFilter: {
      type: String,
    },
  },
  computed: {
    selectedTaskFilter: {
      get: function () {
        return this.taskfilter;
      },
      set: function (value) {
        this.$emit("update:filterdTask", value);
      },
    },
    ...mapGetters([
      "completedTodos",
      "progress",
      "remainingTodos",
      "todosCount",
    ]),
    ...mapState(["todos"]),
  },
};
</script>

<style>
/* Vuetifyの仕様上スタイルが適用されてしまうため非表示にする */
.v-slide-group__prev {
  display: none !important;
}
</style>


<template>
  <v-row justify="center">
    <v-dialog v-model="taskDialog" persistent max-width="600px">
      <AddTask v-if="!this.$route.params.id" />
      <UpdateTask v-else :task='this.task'/>
    </v-dialog>
  </v-row>
</template>

<script>
import AddTask from "@/components/AddTask";
import UpdateTask from "@/components/UpdateTask";
import Comment from "@/components/Comment";
export default {
  components: {
    AddTask,
    Comment,
  },
  created() {
    // ルートのパラメーターにタスクのIdが含まれているか
    if (!this.$route.params.id) return;
    // 引数にタスクのIdを渡すことで該当のタスクを取得
    const task = this.$store.getters.getTaskById(this.$route.params.id);
    if (task) {
      // 取得できれば格納
      this.task = task;
    } else {
      // できなければ一覧ページへ遷移
      this.$router.push({ path: "/" });
    }
  },
  data() {
    return {
      task: {
        title: "",
        detail: "",
        date: [new Date().toISOString().substr(0, 10)],
        done: false,
      },
      validate: true,
      titleRules: [(v) => !!v || "タイトルは必須入力です"],
      datePicker: false,
      modal: false,
      taskDialog: true,
      menu: false,
    };
  },
  methods: {
    closeTaskDialog() {
      this.task.title = "";
      this.task.detail = "";
      this.task.date = [new Date().toISOString().substr(0, 10)];
      this.taskDialog = false;
    },

  },
};
</script>


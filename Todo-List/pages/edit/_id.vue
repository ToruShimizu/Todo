<template>
  <v-row justify="center">
    <v-dialog v-model="taskDialog" persistent max-width="600px">
      <AddTask v-if='!this.$route.params.id'/>
      <UpdateTask v-else/>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
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
      editTitle: false,
      editDate: false,
      editDetail: false,
    };
  },
  computed: {
    dateRangeText() {
      const date = this.task.task.date;
      return Object.values(date).join("~");
    },
  },
  methods: {
    saveTask() {
      if (!this.task.title) {
        this.$refs.form.validate();
        return;
      }
      if (this.$route.params.id) {
        this.updateTask({ id: this.$route.params.id, task: this.task });
        this.$router.push({ path: "/" });
        console.log("updateTask");
      } else {
        this.addTask({ task: this.task });
        console.log("addTask");
      }
      this.$router.push({ path: "/" });
      this.task.title = "";
      this.task.detail = "";
      this.task.date = [new Date().toISOString().substr(0, 10)];
    },
    closeTaskDialog() {
      this.task.title = "";
      this.task.detail = "";
      this.task.date = [new Date().toISOString().substr(0, 10)];
      this.taskDialog = false;
    },
    editingTitle() {
      this.editTitle = true;
      this.task.title = this.task.task.title;
      this.$nextTick(() => {
        this.$refs.focusTitle.focus();
      });
      console.log(this.task.title);
    },
    editingDate() {
      this.editDate = true;
      this.task.date = this.task.task.date;
      this.$nextTick(() => {
        this.$refs.focusDate.focus();
      });
    },
    editingDetail() {
      this.editDetail = true;
      this.task.detail = this.task.task.detail;
      this.$nextTick(() => {
        this.$refs.focusDetail.focus();
      });
    },
    saveEditTitle() {
      this.editTitle = false;
      this.task.task.title = this.task.title;
    },
    saveEditDate() {
      this.editDate = false;
      this.task.task.date = this.task.date;
    },
    saveEditDetail() {
      this.editDetail = false;
      this.task.task.detail = this.task.detail;
    },

    ...mapActions(["addTask", "updateTask"]),
  },
};
</script>


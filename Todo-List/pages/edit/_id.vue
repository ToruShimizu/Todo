<template>
  <v-row justify="center">
    <v-dialog
      v-model="taskDialog"
      persistent
      max-width="600px"
      transition="scroll-y-transition"
    >
      <AddTask
        v-if="!this.$route.params.id"
        @close-add-task="closeTaskDialog"
      />
      <UpdateTask
        v-else
        :task="this.task"
        @close-update-task="closeTaskDialog"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import AddTask from "@/components/AddTask";
import UpdateTask from "@/components/UpdateTask";
import Comment from "@/components/Comment";
import { mapGetters } from "vuex"
export default {
  components: {
    AddTask,
    UpdateTask,
  },
  computed: {

  },
  computed: {
    ...mapGetters('modules/todos',["getTaskById"])
  },
  created() {
    // ルートのパラメーターにタスクのIdが含まれているか
    if (!this.$route.params.id) {

      console.log('idがありません');
    return
    }
    // 引数にタスクのIdを渡すことで該当のタスクを取得
    const task = this.getTaskById(this.$route.params.id);
    if (task) {
      // 取得できれば格納
      console.log('格納できました',task);
      this.task = task
    } else {
      // できなければ一覧ページへ遷移
      console.log('格納できませんでした');
      this.$router.push({ path: '/' })
    }
  },
    mounted() {
    const id = this.$route.params.id
    console.log("id",this.getTaskById(id))
  },
  computed: {
        ...mapGetters('modules/todos',['getTaskById'])

  },
  data() {
    return {
      task: {
        title: '',
        detail: '',
        date: [new Date().toISOString().substr(0, 10)],
        done: false,
        autoRemoveSwitch: false,
        autoRemoveSwitchIcon: false,
      },
      validate: true,
      titleRules: [(v) => !!v || 'タイトルは必須入力です'],
      datePicker: false,
      taskDialog: true,
    }
  },
  methods: {
    closeTaskDialog() {
      this.task.title = ''
      this.task.detail = ''
      this.task.date = [new Date().toISOString().substr(0, 10)]
      this.taskDialog = false
    },
  },
}
</script>

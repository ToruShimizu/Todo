<template>
  <v-row justify="center">
    <v-dialog v-model="taskDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline" v-if="!this.$route.params.id">AddToTask</span>
          <span class="headline" v-else>EditToTask</span>
        </v-card-title>
        <v-form ref="form" lazy-validation>
          <v-card-text>
            <v-container v-if="!this.$route.params.id">
              <v-row>
                <!-- タスク入力エリア -->
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="task.title"
                    label="Add Task"
                    prepend-inner-icon="mdi-pencil-outline"
                    @keydown.enter="addTask"
                    :rules="titleRules"
                    clearable
                  />
                </v-col>
                <!-- 日付入力エリア -->
                <v-col cols="12" sm="6" md="6">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="task.date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateRangeText"
                        label="Picker in dialog"
                        prepend-inner-icon="mdi-calendar-today"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="task.date" scrollable range>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(task.date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <!-- 詳細入力エリア -->
                <v-col cols="12">
                  <v-text-field
                    v-model="task.detail"
                    label="Add Detail"
                    prepend-inner-icon="mdi-briefcase-outline"
                    required
                    clearable
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <v-container v-else>
              <v-row>
                <v-col cols="12" v-show="!editTitle">
                  <p @click="editingTitle">
                    <v-icon>mdi-pencil-outline</v-icon>
                    {{task.task.title}}
                  </p>
                </v-col>
                <!-- タスク編集エリア -->
                <v-col cols="12" v-show="editTitle">
                  <v-text-field
                    v-model="task.title"
                    label="Edit Task"
                    prepend-inner-icon="mdi-pencil-outline"
                    @blur="saveEditTitle"
                    :rules="titleRules"
                    clearable
                  />
                </v-col>
                <!-- 日付編集エリア -->
                <v-col cols="12" sm="6" md="6" v-show="!editDate">
                  <p @click="editingDate">
                    <v-icon>mdi-calendar-today</v-icon>
                    {{dateRangeText}}
                  </p>
                </v-col>

                <v-col cols="12" sm="6" md="6" v-show="editDate">
                  <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="task.date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="task.date"
                        label="Picker in dialog"
                        prepend-inner-icon="mdi-calendar-today"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="task.date" scrollable range>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(task.date)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <!-- 詳細編集エリア -->
                <v-col cols="12" v-show="!editDetail">
                  <p @click="editingDetail">
                    <v-icon>mdi-briefcase-outline</v-icon>
                    {{task.task.detail}}
                  </p>
                </v-col>
                <v-col cols="12" v-show="editDetail">
                  <v-text-field
                    v-model="task.detail"
                    label="Edit Detail"
                    prepend-inner-icon="mdi-briefcase-outline"
                    required
                    clearable
                    @blur="saveEditDetail"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <nuxt-link to="/">
              <v-btn color="blue darken-1" text>Close</v-btn>
            </nuxt-link>
            <v-btn color="blue darken-1" text @click="saveTask">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
export default {
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
      console.log(this.task.title);
    },
    saveEditTitle() {
      this.editTitle = false;
      this.task.task.title = this.task.title;
    },
    editingDate() {
      this.editDate = true;
      this.task.date = this.task.task.date;
    },
    saveEditDate() {
      this.editTitle = false;
      this.task.task.date = this.task.date;
    },
    editingDetail() {
      this.editDetail = true;
      this.task.detail = this.task.task.detail;
    },
    saveEditDetail() {
      this.editTitle = false;
      this.task.task.detail = this.task.detail;
    },

    ...mapActions(["addTask", "updateTask"]),
  },
};
</script>


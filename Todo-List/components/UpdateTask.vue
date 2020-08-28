<template>
  <v-card>
    <v-card-title>
      <span class="headline">EditToTask</span>
    </v-card-title>
    <v-form ref="form" lazy-validation>
      <v-container>
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
              ref="focusTitle"
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
              v-model="datePicker"
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
                  @blur="saveEditDate"
                  ref="focusDate"
                ></v-text-field>
              </template>
              <v-date-picker v-model="task.date" scrollable range>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="datePicker = false">Cancel</v-btn>
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
              ref="focusDetail"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <AddComment />
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <nuxt-link to="/">
          <v-btn color="blue darken-1" text>Cancel</v-btn>
        </nuxt-link>
        <v-btn color="blue darken-1" text @click="updateTask">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import AddComment from "@/components/AddComment";
export default {
  components: {
    AddComment,
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        title: "",
        detail: "",
        date: [new Date().toISOString().substr(0, 10)],
        done: false,
      }),
    },
    datePicker: {
      type: Boolean,
      default: false,
    },
    validate: {
      type: Boolean,
      default: true,
    },
    titleRules: {
      type: Array,
      default: () => [(v) => !!v || "タイトルは必須入力です"],
    },
  },
  data() {
    return {
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
    updateTask() {
      if (!this.task.title) {
        this.$refs.form.validate();
        return;
      }
      if (this.$route.params.id) {
        this.$store.dispatch("updateTask", {
          id: this.$route.params.id,
          task: this.task,
        });
        this.$router.push({ path: "/" });
        console.log("updateTask");
      }
      this.$router.push({ path: "/" });
      this.task.title = "";
      this.task.detail = "";
      this.task.date = [new Date().toISOString().substr(0, 10)];
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
    ...mapActions([]),
  },
};
</script>


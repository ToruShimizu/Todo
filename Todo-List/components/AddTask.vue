<template>
  <v-card>
    <v-card-title>
      <span class="headline">AddToTask</span>
    </v-card-title>
    <v-form ref="form" lazy-validation>
      <v-container>
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
                ></v-text-field>
              </template>
              <v-date-picker v-model="task.date" scrollable range>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="datePicker = false">Cancel</v-btn>
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
      <v-card-actions>
        <v-spacer></v-spacer>
        <nuxt-link to="/">
          <v-btn color="blue darken-1" text>Cancel</v-btn>
        </nuxt-link>
        <v-btn color="blue darken-1" text @click="addTask">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
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
    return {};
  },
  methods: {
    addTask() {
      if (!this.task.title) {
        this.$refs.form.validate();
        return;
      }
      if (this.$route.params.id) {
        this.addTask({ task: this.task });
        console.log("addTask");
      }
      this.$router.push({ path: "/" });
      this.task.title = "";
      this.task.detail = "";
      this.task.date = [new Date().toISOString().substr(0, 10)];
    },
    ...mapActions(["addTask"]),
  },
};
</script>



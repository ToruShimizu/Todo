<template>
<v-app>
    <v-col cols="12" sm="12" md="12">

  <v-card>
    <v-card-title>
      <span class="headline">タスク詳細×編集</span>
    </v-card-title>
    <v-form ref="form" lazy-validation>
      <v-container>
        <v-row>
          <!-- タスク編集エリア -->
          <v-col cols="12">
            <v-text-field
              v-model="task.task.title"
              label="タスクを編集する"
              prepend-inner-icon="mdi-pencil-outline"
              :rules="titleRules"
              clearable
            />
          </v-col>
          <!-- 日付編集エリア -->

          <v-col cols="12">
            <v-menu
              ref="menu"
              v-model="updateDateMenu"
              :close-on-content-click="false"
              :return-value.sync="task.task.date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="task.task.date"
                  label="日付を変更する"
                  prepend-inner-icon="mdi-calendar-today"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="task.task.date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="updateDateMenu = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="$refs.menu.save(task.task.date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
          <!-- 詳細編集エリア -->

          <v-col cols="12">
            <v-text-field
              v-model="task.task.detail"
              label="タスクの詳細を編集する"
              prepend-inner-icon="mdi-briefcase-outline"
              required
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <AddComment />
          </v-col>
          <Comment />
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
    </v-col>
  </v-app>

</template>

<script>
import { mapActions } from "vuex";
import AddComment from "@/components/AddComment";
import Comment from "@/components/Comment";
export default {
  components: {
    AddComment,
    Comment
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        title: "",
        detail: "",
        date: new Date().toISOString().substr(0, 10),
        done: false
      })
    },
    validate: {
      type: Boolean,
      default: true
    },
    titleRules: {
      type: Array,
      default: () => [v => !!v || "タイトルは必須入力です"]
    }
  },
  data() {
    return {
      updateDateMenu: false
    };
  },
  computed: {},
  methods: {
    updateTask() {
      if (!this.task.task.title) {
        this.$refs.form.validate();
        return;
      }
      if (this.$route.params.id) {
        this.$store.dispatch("updateTask", {
          id: this.$route.params.id,
          task: this.task.task
        });
        this.$router.push({ path: "/" });
        console.log("updateTask");
      }
      this.$router.push({ path: "/" });
      this.task.title = "";
      this.task.detail = "";
      this.task.date = [new Date().toISOString().substr(0, 10)];
    }
  }
};
</script>

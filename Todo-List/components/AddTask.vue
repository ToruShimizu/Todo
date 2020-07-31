<template>
  <v-row justify="center">
    <v-dialog v-model="taskDialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" class="hidden-xs-only">タスクを追加する</v-btn>
        <v-btn color="primary" dark v-bind="attrs" v-on="on" class="hidden-sm-and-up">
          <v-icon>mdi-pen-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">AddToTask</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <!-- 日付入力エリア -->
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="task.date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="task.date"
                      label="Picker in menu"
                      prepend-inner-icon="mdi-calendar-today"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="task.date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(task.date)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <!-- 時間入力エリア -->
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="task.time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="task.time"
                      label="Picker in menu"
                      prepend-inner-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="task.time"
                    full-width
                    @click:minute="$refs.menu.save(task.time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <!-- タスク入力エリア -->
                <v-text-field
                  v-model="task.title"
                  label="タスクを追加する"
                  prepend-inner-icon="mdi-pencil-outline"
                  @keydown.enter="addTask"
                  clearable
                />
              </v-col>
              <v-col cols="12">
                <!-- 詳細入力エリア -->
                <v-text-field
                  v-model="task.detail"
                  label="詳細を追加する"
                  prepend-inner-icon="mdi-briefcase-outline"
                  required
                  clearable
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="taskDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="addTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
        return {
      task: {
        title: '',
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        time: null,
        done: false,
      },
      taskDialog: false,
      menu: false,
      menu2: false,
    }
  },

  methods: {
    addTask() {
      if (!this.task) {
        return
      }
      this.$store.dispatch('addTask', { task: this.task }).then(() => {
        this.task.title = ''
        this.task.detail = ''
        (this.task.date = new Date().toISOString().substr(0, 10)),
          (this.task.time = '')
        this.taskDialog = false
      })
    },
  }
}
</script>


<template>
  <v-app>
    <v-dialog v-model="taskDialog" persistent max-width="600px" transition="scroll-y-transition">
      <v-app>
        <v-col cols="12" sm="12" md="12">
          <v-card>
            <v-card-title>
              <span class="headline">タスクの追加</span>
            </v-card-title>
            <v-form ref="form" lazy-validation>
              <v-container>
                <v-row>
                  <!-- タスク入力エリア -->
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="task.title"
                      label="タスクを入力する"
                      prepend-inner-icon="mdi-pencil-outline"
                      :rules="[validRules.titleRules.required]"
                      clearable
                    />
                  </v-col>
                  <!-- 日付入力エリア -->
                  <v-col cols="12" sm="6" md="6">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      min-width="290px"
                    >
                      <template #activator="{ on, attrs }">
                        <v-text-field
                          v-model="task.date"
                          label="日付を変更する"
                          prepend-inner-icon="mdi-calendar-today"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="task.date"
                        no-title
                        @input="dateMenu = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <!-- 詳細入力エリア -->
                  <v-col cols="12">
                    <v-text-field
                      v-model="task.detail"
                      label="タスクの詳細を入力する"
                      prepend-inner-icon="mdi-briefcase-outline"
                      clearable
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeAddTask">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="addTask(task)">Save</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-app>
    </v-dialog>
    <v-btn color="primary" dark class="hidden-xs-only" @click="openAddTask">
      <v-icon>mdi-pen-plus</v-icon>タスクを追加する
    </v-btn>
    <v-btn color="primary" dark class="hidden-sm-and-up" @click="openAddTask">
      <v-icon>mdi-pen-plus</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import FormValidation from '@/mixins/FormValidation.vue'
export default {
  mixins: [FormValidation],
  props: {
    task: {
      type: Object,
      default: () => ({
        title: '',
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        done: false
      })
    },
    taskDialog: {
      type: Boolean
    }
  },
  data() {
    return {
      dateMenu: false
    }
  },
  methods: {
    async addTask() {
      const task = this.task
      if (!task.title) {
        this.$refs.form.validate()
        return
      }
      await this.addTask(task)
      this.closeAddTask()
    },
    openAddTask() {
      this.$emit('open-add-task')
    },
    closeAddTask() {
      this.$emit('close-add-task')
      this.$refs.form.reset()
    },
    ...mapActions('modules/todos', ['addTask'])
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="taskDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">AddToTask</span>
        </v-card-title>
        <v-form ref="form"
    lazy-validation >
          <v-card-text>
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
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <nuxt-link to='/'>
            <v-btn color="blue darken-1" text @click="closeTaskDialog">Close</v-btn>
            </nuxt-link>
            <v-btn color="blue darken-1" text @click="addTask">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    created () {
    // ルートのパラメーターにアドレスIdが含まれているか
    if (!this.$route.params.id) return
    // 引数にアドレスのIdを渡すことで該当のアドレスを取得
    const task = this.$store.getters.getTaskById(this.$route.params.id)
    if (task) {
      // 取得できれば格納
      this.task = task
    } else {
      // できなければ一覧ページへ遷移
      this.$router.push({ path: '/' })
    }
  },
  data() {
    return {
      task: {
        title: '',
        detail: '',
        date: [new Date().toISOString().substr(0, 10)],
        done: false,
      },
      validate: true,
      titleRules:[
        v => !!v || 'タイトルは必須入力です'
        ],
      modal: false,
      taskDialog: true,
      menu: false,
    }
  },
  computed: {
    dateRangeText () {
      const date = this.task.date
      return Object.values(date).join('~')
      },
    },
  methods: {
    addTask() {
      if (!this.task.title) {
        this.$refs.form.validate()
        return
      }
      if (this.$route.params.id) {
        this.updateTask({ id: this.$route.params.id, task: this.task })
        console.log('updateTask')
      } else {
        this.addTask({task:this.task}).then(() => {
        setTimeout(() => {
          this.$store.dispatch('fetchTodos')
          console.log('addTask')
        }, 1000)
      })
      }
      this.$router.push({ path: '/' })
      this.task.title = ''
      this.task.detail = ''
      this.task.date = [new Date().toISOString().substr(0, 10)]
    },
    closeTaskDialog () {
      this.task.title = ''
      this.task.detail = ''
      this.task.date = [new Date().toISOString().substr(0, 10)]
      this.taskDialog = false
    },
      ...mapActions(['addTask', 'updateTask'])
  },

}
</script>


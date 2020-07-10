<template>
  <v-row justify="center">
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" @click="editTaskOpen" icon>
          <v-icon bottom>mdi-lead-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">EditToTask</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <!-- 日付入力エリア -->
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editDate"
                      label="Picker in menu"
                      prepend-icon="mdi-calendar-today"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="editDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(editDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <!-- 時間入力エリア -->
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editTime"
                      label="Picker in menu"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu2"
                    v-model="editTime"
                    full-width
                    @click:minute="$refs.menu.save(editTtime)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <!-- タスク入力エリア -->
                <v-text-field
                  v-model="editTask"
                  label="タスクを追加する"
                  prepend-inner-icon="mdi-pencil-outline"
                  clearable
                />
              </v-col>
              <v-col cols="12">
                <!-- 詳細入力エリア -->
                <v-text-field
                  v-model="editDetail"
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
          <v-btn color="blue darken-1" text @click="editDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="save()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  props: {
    // editTask: {
    //   type: String,
    //   required: true
    // },
    // editDetail: {
    //   type: String,

    // },
    // editDate: {
    //   type: String,
    //         required: true
    // },
    // editTime: {
    //   type: String,
    //         required: true
    // },
    task: {
      type: String
      // default: undefined
    },
    detail: {
      type: String,
      default: undefined
    },
    date: {
      type: String,
      default: undefined
    },
    time: {
      type: String,
      default: undefined
    }
  },
  data: () => ({
    editTask: '',
    editDetail: '',
    editDate: '',
    editTime: '',
    editDialog: false,
    menu: false,
    menu2: false
  }),
  computed: {
    ...mapState([])
  },
  methods: {
    editTaskOpen() {
      this.editDialog = true
      this.editTask = this.task
      this.editDetail = this.detail
      this.editDate = this.date
      this.editTime = this.time
    },
    save() {
      this.$emit('edit')
    }
    // addEditTask () {
    //         this.$store.dispatch('addEditTask')
    //         this.task = this.editTask

    //   // console.log(this.editTask)
    //   // console.log(this.task)

    // },
    // ...mapActions(['addEditTask',]),
  }
}
</script>


<template>
 <v-row justify="center">
                <v-dialog v-model="detailTask" persistent max-width="600px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">detailTask</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <!-- 日付変更エリア -->
                            <v-menu
                              ref="menu"
                              :value="$store.getters.getTask.date"
                              :close-on-content-click="false"
                              :return-value.sync="$store.getters.getTask.date"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  :value="$store.getters.getTask.date"
                                  label="日付を変更する"
                                  prepend-inner-icon="mdi-calendar-today"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="editDate" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="selectDate = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save($store.getters.getTask.date)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <!-- 時間変更エリア -->
                            <v-menu
                              ref="menu"
                              :value="$store.getters.getTask.time"
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
                                  :value="$store.getters.getTask.time"
                                  label="時間を変更する"
                                  prepend-inner-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="selectTime"
                                :value="$store.getters.getTask"
                                full-width
                                @click="$refs.menu.save($store.getters.getTask)"
                              ></v-time-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <!-- タスク変更エリア -->
                            <v-text-field
                              :value="$store.getters.getTask.title"
                              label="タスクを変更する"
                              prepend-inner-icon="mdi-pencil-outline"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12">
                            <!-- 詳細変更エリア -->
                            <v-text-field
                              :value="$store.getters.getTask.detail"
                              label="詳細を変更する"
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
                        <nuxt-link to="/">
                        <v-btn color="blue darken-1" text >Close</v-btn>
                        </nuxt-link>
                        <v-btn color="blue darken-1" text @click="editTask">Save</v-btn>
                      </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
</template>

<script>
export default {
  created() {
    const id = this.$route.params.id
    this.$store.dispatch('fetchTask', { id })
  },
  data() {
    return {
      detailTask: true,
      selectDate2: false,
      selectTime2: false
    }
  },

    methods: {
   editTask(e) {
     const task = {
        id: this.$store.getters.getTask.id,
        title:  e.target.title.value,
        detail: e.target.detail.value,
        date: e.target.date.value,
        time: e.target.time.value
        }
      this.$store.dispatch('editTask', { task })
      .then(() => {
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
      })
    }
  }
}
</script>

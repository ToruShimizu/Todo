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
                              v-model="selectDate"
                              :close-on-content-click="false"
                              :return-value.sync="date"
                              transition="scale-transition"
                              offset-y
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editDate"
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
                                <v-btn text color="primary" @click="$refs.menu.save(editDate)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <!-- 時間変更エリア -->
                            <v-menu
                              ref="menu"
                              v-model="selectTime"
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
                                  label="時間を変更する"
                                  prepend-inner-icon="mdi-clock-time-four-outline"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                v-if="selectTime"
                                v-model="editTime"
                                full-width
                                @click="$refs.menu.save(editTime)"
                              ></v-time-picker>
                            </v-menu>
                          </v-col>
                          <v-col cols="12" sm="12" md="12">
                            <!-- タスク変更エリア -->
                            <v-text-field
                              v-model="editTitle"
                              label="タスクを変更する"
                              prepend-inner-icon="mdi-pencil-outline"
                              clearable
                            />
                          </v-col>
                          <v-col cols="12">
                            <!-- 詳細変更エリア -->
                            <v-text-field
                              v-model="editDetail"
                              label="詳細を変更する"
                              prepend-inner-icon="mdi-briefcase-outline"
                              required
                              clearable
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </v-row>
</template>

<script>
export default {
  created() {
    const id = this.$route.params.id
    this.$store.dispatch('fetchTask', { id })
  }
}
</script>

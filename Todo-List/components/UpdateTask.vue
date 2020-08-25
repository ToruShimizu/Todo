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
                  @blur="saveEditDate"
                  ref="focusDate"
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
              ref="focusDetail"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <nuxt-link to="/">
          <v-btn color="blue darken-1" text>Cancel</v-btn>
        </nuxt-link>
        <v-btn color="blue darken-1" text @click="saveTask">Save</v-btn>
      </v-card-actions>
    </v-form>
    <Comment />
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
import Comment from "@/components/Comment";
export default {
  components: {
    Comment,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([]),
  },
};
</script>


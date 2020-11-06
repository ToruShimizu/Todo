<template>
  <v-dialog
    v-if="updateTaskDialog"
    v-model="updateTaskDialog"
    persistent
    max-width="600px"
    transition="scroll-y-transition"
  >
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
                    v-model="editTodo.task.title"
                    label="タスクを変更する"
                    prepend-inner-icon="mdi-pencil-outline"
                    :rules="[validRules.titleRules.required]"
                    clearable
                  />
                </v-col>
                <!-- 日付編集エリア -->
                <v-col cols="12">
                  <v-menu
                    v-model="updateDateMenu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="editTodo.task.date"
                        label="期限を変更する"
                        prepend-inner-icon="mdi-calendar-today"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="editTodo.task.date"
                      @input="updateDateMenu = false"
                      no-title
                      scrollable
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <!-- 詳細編集エリア -->
                <v-col cols="12">
                  <v-text-field
                    v-model="editTodo.task.detail"
                    label="タスクの詳細を変更する"
                    prepend-inner-icon="mdi-briefcase-outline"
                    required
                    clearable
                  ></v-text-field>
                </v-col>
                <AddComment :taskId="editTodo.task.id" />
                <Comment
                  :taskId="editTodo.task.id"
                  v-for="comment in comments"
                  :key="comment.id"
                  :comment="comment"
                />
              </v-row>
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="cancelUpdateTask">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="updateTask">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-app>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
import AddComment from '@/components/Comment/AddComment'
import Comment from '@/components/Comment/Comment'
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],
  components: {
    AddComment,
    Comment
  },
  props: {
    editTodo: {
      type: Object
    },
    updateTaskDialog: {
      type: Boolean,
      default: false
    },
    task: {
      type: Object,
      default: () => ({
        title: '',
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        done: false
      })
    }
  },
  data() {
    return {
      updateDateMenu: false
    }
  },
  computed: {
    ...mapState('modules/comment', ['comments'])
  },
  methods: {
    updateTask() {
      if (!this.editTodo.task.title) {
        this.$refs.form.validate()
        return
      }
      this.$store.dispatch('modules/todos/updateTask', {
        id: this.editTodo.task.id,
        task: this.editTodo.task
      })
      this.$refs.form.reset()
      this.closeUpdateTask()
    },
    closeUpdateTask() {
      this.$refs.form.reset()
      this.$emit('close-update-task')
    },
    cancelUpdateTask() {
      this.$refs.form.reset()
      this.$emit('cancel-update-task')
    }
  }
}
</script>

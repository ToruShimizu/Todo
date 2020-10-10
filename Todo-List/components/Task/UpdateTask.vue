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
                  v-model="editTitle"
                  label="タスクを変更する"
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
                  :return-value.sync="editDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="editDate"
                      label="期限を変更する"
                      prepend-inner-icon="mdi-calendar-today"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="updateDateMenu = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(editDate)">OK</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <!-- 詳細編集エリア -->
              <v-col cols="12">
                <v-text-field
                  v-model="editDetail"
                  label="タスクの詳細を変更する"
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
            <v-btn color="blue darken-1" text @click="closeUpdateTask">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="updateTask">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import AddComment from '@/components/Comment/AddComment'
import Comment from '@/components/Comment/Comment'
export default {
  components: {
    AddComment,
    Comment
  },
  props: {
    todo: {
      type: Object
    },
    id: {
      type: String
    },
    task: {
      type: Object,
      default: () => ({
        title: '',
        detail: '',
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
      default: () => [(v) => !!v || 'タイトルは必須入力です']
    }
  },
  data() {
    return {
      updateDateMenu: false
    }
  },
  computed: {
    editTitle: {
      get() {
        return this.editTodo.task.title
      },
      set(val) {
        this.updateTitle(val)
      }
    },
    editDate: {
      get() {
        return this.editTodo.task.date
      },
      set(val) {
        this.updateDate(val)
      }
    },
    editDetail: {
      get() {
        return this.editTodo.task.detail
      },
      set(val) {
        this.updateDetail(val)
      }
    },
    ...mapGetters('modules/todos', ['getTaskById']),
    ...mapState('modules/todos', ['editTodo'])
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
      this.closeUpdateTask()
    },
    closeUpdateTask() {
      this.$emit('close-update-task')
    },
    ...mapMutations('modules/todos', ['updateTitle', 'updateDate', 'updateDetail'])
  }
}
</script>

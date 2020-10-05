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
                  <v-date-picker v-model="editDate" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="updateDateMenu = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(editDate)"
                      >OK</v-btn
                    >
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
            <nuxt-link to="/">
              <v-btn
                color="blue darken-1"
                text
                @click="$emit('close-update-task')"
                >Cancel</v-btn
              >
            </nuxt-link>
            <v-btn color="blue darken-1" text @click="updateTask">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-col>
  </v-app>
</template>

<script>
import AddComment from '@/components/Comment/AddComment'
import Comment from '@/components/Comment/Comment'
import { mapGetters,mapState } from 'vuex'
export default {
  components: {
    AddComment,
    Comment,
  },
  props: {
    todo: {
      type:Object
    },
    task: {
      type: Object,
      default: () => ({
        title: '',
        detail: '',
        date: new Date().toISOString().substr(0, 10),
        done: false,
      }),
    },
    validate: {
      type: Boolean,
      default: true,
    },
    titleRules: {
      type: Array,
      default: () => [(v) => !!v || 'タイトルは必須入力です'],
    },
  },
  data() {
    return {
      updateDateMenu: false,
    }
  },
  computed: {
    editTitle: {
      get: function() {
        return this.todo.task.title
      },
      set: function(todo) {
        this.$emit('input', todo) // おやでは @input に書いたメソッドがよばれる。引数にvalue
      },
        },
    editDate: {
      get: function() {
        return this.todo.task.date
      },
      set: function(todo) {
        this.$emit('input', todo) // おやでは @input に書いたメソッドがよばれる。引数にvalue
      },
        },
    editDetail: {
      get: function() {
        return this.todo.task.detail
      },
      set: function(todo) {
        this.$emit('input', todo) // おやでは @input に書いたメソッドがよばれる。引数にvalue
      },
        },
    ...mapGetters('modules/todos',['getTaskById']),
    ...mapState('modules/todos',['editTodo'])
  },
  methods: {
    updateTask() {
      if (!this.todo.task.title) {
        this.$refs.form.validate()
        return
      }
      if (this.$route.params.id) {
        this.$store.dispatch('modules/todos/updateTask', {
          id: this.$route.params.id,
          task: this.todo.task,
        })
        console.log('updateTask')
      }
      this.task.title = ''
      this.task.detail = ''
      this.task.date = [new Date().toISOString().substr(0, 10)]
    },
  },
}
</script>

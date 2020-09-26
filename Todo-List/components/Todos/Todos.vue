<template>
  <v-container style="max-width: 500px">
    <v-layout>
      <v-flex>
        <!-- トータルtodos表示 -->
        <h2 class="display-1 grey--text pl-4">
          totalTodos:&nbsp;
          <v-fade-transition leave-absolute>
            <span :key="`todos-${todos.length}`">{{ todos.length }}</span>
          </v-fade-transition>
        </h2>
      </v-flex>
      <v-flex>
        <nuxt-link :to="{ name: 'edit-id' }">
          <v-btn color="primary" dark class="hidden-xs-only">
            <v-icon>mdi-pen-plus</v-icon>タスクを追加する
          </v-btn>
          <v-btn color="primary" dark class="hidden-sm-and-up">
            <v-icon>mdi-pen-plus</v-icon>
          </v-btn>
        </nuxt-link>
      </v-flex>
    </v-layout>

    <v-divider class="mt-4" />

    <v-card v-if="todos.length > 0">
      <FilteredTask @update:filterdTask="taskFilter = $event" />
      <v-divider />
      <v-row justify="center">
        <v-col cols="8">
          <SearchTask :search.sync="searchTask" />
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="todoList"
        :items-per-page="itemsPerPage"
        :search="searchTask"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.task.title`]="{ item }">
          <v-btn icon @click="doneTask(item)">
            <v-icon :color="(!item.task.done && 'grey') || 'primary'"
              >mdi-check-circle-outline</v-icon
            >
          </v-btn>
          <nuxt-link
            :to="{
              name: 'edit-id',
              params: {
                id: item.id,
              },
            }"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <tr
                  v-bind="attrs"
                  :class="(item.task.done && 'grey--text') || 'primary--text'"
                  class="ml-2"
                  v-on="on"
                >
                  {{
                    item.task.title
                  }}
                </tr>
              </template>
              <span>{{ item.task.title }}の詳細を開く</span>
            </v-tooltip>
          </nuxt-link>
        </template>
        <template v-slot:[`item.task.date`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <tr :class="(item.task.done && 'grey--text') || 'black--text'">
                {{
                  item.task.date
                }}
                <v-icon
                  v-if="task.date > item.task.date"
                  v-bind="attrs"
                  :class="(item.task.done && 'grey--text') || 'red--text'"
                  v-on="on"
                  >mdi-alert-outline</v-icon
                >
              </tr>
            </template>
            <span>期限が切れています</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.remove`]="{ item }">
          <v-btn icon>
            <v-icon @click="removeTask(item)">mdi-delete-outline</v-icon>
          </v-btn>
        </template>
        <template v-slot:[`item.autoRemove`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-layout>
                <v-switch
                  :input-value="item.task.autoRemoveSwitch"
                  :label="item.task.autoRemoveSwitch ? 'on' : 'off'"
                  @change="toggleRemoveSwitch(item)"
                ></v-switch>
                <v-icon
                  v-if="item.task.autoRemoveSwitchIcon"
                  v-bind="attrs"
                  v-on="on"
                  >mdi-delete-clock-outline</v-icon
                >
              </v-layout>
            </template>
            <span>〇〇時間後に自動で削除されます</span>
          </v-tooltip>
        </template>
      </v-data-table>
      <div class="text-center py-2">
        <v-pagination v-model="page" :length="pageCount" />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FilteredTask from '@/components/FilteredTask'
import SearchTask from '@/components/SearchTask'

export default {
  components: {
    FilteredTask,
    SearchTask,
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        title: '',
        detail: '',
        date: new Date().toISOString(),
        done: false,
        autoRemoveSwitch: false,
        autoRemoveSwitchIcon: false,
      }),
    },
  },

  data() {
    return {
      taskFilter: 'all',
      searchTask: '',
      headers: [
        {
          text: 'タスク',
          align: 'start',
          sortable: false,
          value: 'task.title',
        },
        { text: '期限', value: 'task.date' },
        { text: '削除', value: 'remove', sortable: false },
        { text: '自動削除', value: 'autoRemove', sortable: false },
      ],
      itemsPerPage: 7,
      page: 1,
      pageCount: 0,
    }
  },
  computed: {
    todoList() {
      return this.todosFiltered()
    },
    // タスク検索
    ...mapGetters('modules/todos', ['todosCount']),
    ...mapState('modules/todos', ['todos']),
  },
  methods: {
    removeTask(todo) {
      if (!confirm(todo.task.title + 'を削除しますか？')) return
      this.$store.dispatch('modules/todos/removeTask', { id: todo.id })
    },
    // FIXME:アーカイブに移す
    toggleRemoveSwitch(todo) {
      this.$store.dispatch('modules/todos/toggleRemoveSwitch', {
        todo,
        id: todo.id,
      })
      if (todo.task.done === true && todo.task.autoRemoveSwitch === false) {
        setTimeout(
          function () {
            if (confirm(todo.task.title + 'を削除しますか？')) {
              this.$store.dispatch('modules/todos/removeTask', { id: todo.id })
            } else {
              // FIXME: setTimeoutを解除する
              this.$store.dispatch('modules/todos/toggleRemoveSwitch', {
                todo,
                id: todo.id,
              })
            }
          }.bind(this),
          4000
        )
      }
    },
    doneTask(todo) {
      this.$store.dispatch('modules/todos/doneTask', {
        todo,
        id: todo.id,
      })
      // FIXME:アーカイブに移す
      if (todo.task.done === false && todo.task.autoRemoveSwitch === true) {
        setTimeout(
          function () {
            if (confirm(todo.task.title + 'を削除しますか？')) {
              this.$store.dispatch('modules/todos/removeTask', { id: todo.id })
            } else {
              // FIXME:setTimeoutを解除する
              this.$store.dispatch('modules/todos/toggleRemoveSwitch', {
                todo,
                id: todo.id,
              })
            }
          }.bind(this),
          5000
        )
      }
    },
    todosFiltered() {
      // 完了状態の絞り込み
      let returnvalue
      switch (this.taskFilter) {
        case 'all':
          returnvalue = this.todos
          break
        case 'active':
          returnvalue = this.todos.filter((todo) => !todo.task.done)

          break
        case 'done':
          returnvalue = this.todos.filter((todo) => todo.task.done)

          break
        default:
      }
      return returnvalue
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
a {
  text-decoration: none;
}
/* Vuetifyの仕様上スタイルが適用されてしまうため非表示にする */
.v-slide-group__prev {
  display: none !important;
}
</style>

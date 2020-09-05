<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-btn-toggle mandatory>
        <v-btn
          depressed
          color="grey-lighten"
          :value="false"
          class="ml-2"
          @click="ascTodos"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn depressed color="grey-lighten" :value="true" @click="descTodos">
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    todos: {
      type: Array
    }
  },
  data() {
    return {
      sortOrder: 1
    };
  },
  computed: {
    SortByTask() {
      return this.todos.sort((a, b) => {
        return a.task.title < b.task.title
          ? -this.sortOrder
          : a.task.title > b.task.title
          ? this.sortOrder
          : 0;
      });
    }
  },
  methods: {
    ascTodos() {
      this.sortOrder = 1;
    },
    descTodos() {
      this.sortOrder = -1;
    }
  }
};
</script>

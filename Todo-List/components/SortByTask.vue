<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-btn-toggle mandatory>
        <v-btn
          depressed
          color="grey-lighten"
          :value="false"
          class="ml-2"
          @click="sortAscTodos"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn depressed color="grey-lighten" :value="true" @click="sortDescTodos">
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
    },
    sortTask: {
      type: Number
    },
    handleAscTodos: {
      type: Function,
      required: true
    },
    handleDescTodos: {
      type: Function,
      required: true
    }
  },
  data() {
    return {

  }
  },
  computed: {
    //   selectTaskFilter: {
    //   get: function () {
    //     return this.taskfilter;
    //   },
    //   set: function (value) {
    //     this.$emit("update:filterdTask", value);
    //   },
    // },
  },
  methods: {
    sortAscTodos() {
      this.handleAscTodos()
    },
    sortDescTodos() {
      this.handleDescTodos()
    }
  }
};
</script>

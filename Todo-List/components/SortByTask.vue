<template>

      <v-btn-toggle mandatory>
        <v-btn
          depressed
          color="grey-lighten"
          :value="false"
          class="ml-2"
          @click="sortAscTodos"
          v-if="isActive"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
        <v-btn
          depressed
          color="grey-lighten"
          :value="true"
          @click="sortDescTodos"
          v-else
        >
          <v-icon>mdi-arrow-down</v-icon>
        </v-btn>
      </v-btn-toggle>

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
      isActive: true
    };
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
      this.handleAscTodos();
      this.isActive = false;
    },
    sortDescTodos() {
      this.handleDescTodos();
      this.isActive = true;
    }
  }
};
</script>

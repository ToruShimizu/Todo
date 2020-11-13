<template>
  <div class="text-center">
    <v-pagination v-model="todosPageCount" :length="todosPageLength" @input="changeTodosPage" />
  </div>
</template>

<script>
export default {
  props: {
    todosPage: {
      type: Number,
      required: true
    },
    todosPageLength: {
      type: Number,
      required: true
    }
  },
  computed: {
    todosPageCount: {
      get() {
        return this.todosPage
      },
      set(setTodosPage) {
        this.$emit('update:todos-page', setTodosPage)
      }
    }
  },
  methods: {
    changeTodosPage(pageNumber) {
      this.$emit('change-todos-page', pageNumber)
    }
  }
}
</script>

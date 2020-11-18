<template>
  <v-btn color="red darken-1" outlined @click="handleDeleteButton">
    <slot name="deleteButton"></slot>
    <span class="font-italic">{{ title }}</span>
  </v-btn>
</template>

<script>
export default {
  props: { title: String },
  methods: {
    handleDeleteButton() {
      this.$emit('delete-button')
    }
  }
}
</script>
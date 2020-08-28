<template>
  <v-text-field
    hide-details
    v-model="message"
    prepend-inner-icon="mdi-message-text-outline"
    label="Add Comment"
    clearable
    @keypress.enter="addComment"
  ></v-text-field>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapState(["comments"]),
  },
  methods: {
    addComment() {
      this.$store.dispatch("addComment", {
        id: this.$route.params.id,
        message: this.message,
      });
      this.message = "";
    },
  },
};
</script>

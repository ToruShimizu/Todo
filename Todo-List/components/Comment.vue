<template>
  <v-card max-width="400" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12" v-for='(message,i) in comments' :key='i'>
          <v-card>
            <v-card-title>{{message}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { AddComment } from 'vuex'

export default {
  components: {
    AddComment
  },
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
      this.$store.dispatch("addComment", { id: this.$route.params.id, message: this.message });
      this.message = "";
    },
  }

};
</script>

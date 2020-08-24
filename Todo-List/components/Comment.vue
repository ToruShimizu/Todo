<template>
  <v-card max-width="400" class="mx-auto">
    <v-container>
      <v-layout>
        <v-flex>
          <v-text-field
            flat
            solo-inverted
            hide-details
            v-model="message"
            prepend-inner-icon="mdi-message-text-outline"
            label="Add Comment"
            clearable
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-btn @click="addComment" color="primary">
            <v-icon left>mdi-pen-plus</v-icon>Add
          </v-btn>
        </v-flex>
      </v-layout>
      <v-row dense>
        <v-col cols="12">
          <v-card>
            <v-card-title>{{message}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
      addComment() {
      this.$store.dispatch("addComment", { id: this.$route.params.id, message: this.message });
      this.message = "";
    },
  }

};
</script>

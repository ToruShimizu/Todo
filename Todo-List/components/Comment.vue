<template>
    <v-container>
      <v-row dense>
        <v-col cols="12" v-for="(message,i) in comments" :key="i">
          <v-card max-width="400" class="mx-auto">
            <v-card-title>{{message}}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["comments"]),
  },
};
</script>

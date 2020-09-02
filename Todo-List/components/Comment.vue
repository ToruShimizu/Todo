<template>
  <v-list subheader>
    <v-list-item v-for="(item,i) in comments" :key="i">
      <v-list-item-content>
        <v-list-item-icon v-if="photoURL">
          <v-avatar size="50">
            <img :src="photoURL" />
          </v-avatar>
        </v-list-item-icon>
        <v-list-item-title>{{userName}}さんがコメントしました</v-list-item-title>
        <v-text-field :value="item"/>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  computed: {
    ...mapState(["comments"]),
    ...mapGetters(["userName", "photoURL", "userEmail"]),
  },
};
</script>

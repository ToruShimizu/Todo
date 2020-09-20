<template>
  <v-app>
    <v-container mt-12>
      <Todos />
    </v-container>
  </v-app>
</template>

<script>
import Todos from "@/components/Todos";
export default {
  components: {
    Todos,
  },
  props: {
    searchTask: {
      type: String,
    },
  },
};
</script>


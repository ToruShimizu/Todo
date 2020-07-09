<template>
  <div class="text-center">
<v-btn icon>
<v-icon @click="sheet = !sheet">mdi-clipboard-text-outline</v-icon>
</v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">

    <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >close</v-btn>
        <v-list-item>
      <v-list-item-content>
        <v-list-item-title> <v-icon>mdi-calendar-today</v-icon>{{date}} {{time}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title><v-icon>mdi-briefcase-outline</v-icon>{{task}}</v-list-item-title>
        <v-list-item-subtitle>{{detail}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

  export default {
    props: {
      task: {
        type: String,
        default: undefined
      },
      detail: {
        type:String,
        default: undefined
      },
      date: {
        type: String,
       default: undefined
      },
      time: {
        type: String,
       default: undefined
      }
    },
    computed: {
      ...mapState(['todos'])
    },
    data: () => ({
      sheet: false
    }),
  }
</script>

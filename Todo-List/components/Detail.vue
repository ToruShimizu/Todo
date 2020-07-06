<template>
  <div class="text-center">
    <v-btn
      color="blue"
      dark
      @click="sheet = !sheet"
    >
      Open v-model
    </v-btn>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200px">

    <v-btn
          class="mt-6"
          text
          color="red"
          @click="sheet = !sheet"
        >close</v-btn>
    <v-list disabled>
      <v-list-item-group  color="primary">
        <v-list-item>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{date}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{time}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{task}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon ></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{detail}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
        required: true
      },
      detail: {
        type:String
      },
      date: {
        type: Date
      },
      time: {
        type: Date
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

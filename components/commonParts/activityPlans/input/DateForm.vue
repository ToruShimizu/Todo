<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="innerDate"
        label="日付"
        prepend-inner-icon="mdi-calendar-today"
        readonly
        v-bind="attrs"
        v-on="on"
        :close-on-content-click="false"
      ></v-text-field>
    </template>
    <v-date-picker v-model="innerDate" no-title @click="menu = false" />
  </v-menu>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: false,
      default: new Date().toISOString().substr(0, 10)
    }
  },
  data() {
    return {
      dateMenu: false
    }
  },

  computed: {
    innerDate: {
      get() {
        return this.date
      },
      set(date) {
        this.dateMenu = false
        this.$emit('update:date', date)
      }
    }
  },
  metods: {}
}
</script>
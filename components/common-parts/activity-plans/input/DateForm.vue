<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateRangeText"
        label="日付"
        prepend-inner-icon="mdi-calendar-today"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="innerDate" no-title range>
      <v-spacer />
      <TextButton :title="'close'" class="primary--text" @handle-text-button="closeDateMenu" />
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    date: {
      type: Array,
      required: false,
      default: [new Date().toISOString().substr(0, 10)]
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
        this.$emit('update:date', date)
      }
    },
    dateRangeText: {
      get() {
        return this.innerDate.join('~')
      },
      set(dateRangeText) {
        return dateRangeText
      }
    }
  },
  methods: {
    closeDateMenu() {
      this.dateMenu = false
    }
  }
}
</script>

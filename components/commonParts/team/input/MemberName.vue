<template>
  <v-text-field
    ref="memberName"
    v-model="innerName"
    required
    :label="label"
    clearable
    dense
    prepend-inner-icon="mdi-card-account-details-outline"
    :rules="nameRules"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: ''
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    innerName: {
      get() {
        return this.name
      },
      set(memberName) {
        this.$emit('update:member-name', memberName)
      }
    }
  },
  data() {
    return {
      nameRules: [(v) => !!v || '名前は必須です。']
    }
  }
}
</script>
<template>
  <v-text-field
    v-model="innerName"
    prepend-inner-icon="mdi-card-account-details-outline"
    :label="nameLabel"
    :rules="nameRules"
    clearable
  />
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    nameLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      nameRules: [v => !!v || '名前は必須です。']
    }
  },
  computed: {
    innerName: {
      get() {
        return this.name
      },
      set(userName) {
        this.$emit('update:user-name', userName)
      }
    }
  }
}
</script>

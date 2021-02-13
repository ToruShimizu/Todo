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
    circleMember: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  computed: {
    innerName: {
      get() {
        return this.circleMember.name
      },
      set(memberName) {
        this.$emit('update:member-name', memberName)
      }
    }
  },
  data() {
    return {
      nameRules: [v => !!v || '名前は必須です。']
    }
  }
}
</script>

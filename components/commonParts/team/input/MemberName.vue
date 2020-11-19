<template>
  <v-text-field
    ref="memberName"
    v-model="innerName"
    required
    :label="label"
    clearable
    dense
    prepend-inner-icon="mdi-card-account-details-outline"
    :rules="[validRules.nameRules.required]"
  />
</template>

<script>
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],

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
  }
}
</script>
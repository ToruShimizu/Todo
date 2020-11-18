<template>
  <v-text-field
    v-model="innerName"
    prepend-inner-icon="mdi-card-account-details-outline"
    :label="nameLabel"
    :rules="[validRules.nameRules.required]"
    clearable
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
    nameLabel: {
      type: String,
      required: false,
      default: ''
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
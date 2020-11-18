<template>
  <v-text-field
    v-model="innerEmail"
    prepend-inner-icon="mdi-email-edit-outline"
    :label="emailLabel"
    :rules="[validRules.emailRules.required, validRules.emailRules.regex]"
    clearable
  />
</template>

<script>
import FormValidation from '@/mixins/FormValidation.vue'

export default {
  mixins: [FormValidation],
  props: {
    email: {
      type: String,
      required: false,
      default: ''
    },
    emailLabel: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: {
    innerEmail: {
      get() {
        return this.email
      },
      set(userEmail) {
        this.$emit('update:user-email', userEmail)
      }
    }
  }
}
</script>
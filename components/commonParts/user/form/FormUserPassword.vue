<template>
  <v-text-field
    v-model="innerPassword"
    :type="showPassword ? 'text' : 'Password'"
    prepend-inner-icon="mdi-lock-outline"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :label="passwordLabel"
    :rules="[validRules.passwordRules.required, validRules.passwordRules.regex]"
    counter="72"
    @click:append="showPassword = !showPassword"
  />
</template>

<script>
import FormValidation from '@/mixins/FormValidation.vue'
export default {
  mixins: [FormValidation],
  props: {
    password: {
      type: String,
      required: false,
      default: ''
    },
    passwordLabel: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      showPassword: false
    }
  },
  computed: {
    innerPassword: {
      get() {
        return this.password
      },
      set(password) {
        this.$emit('update:user-password', password)
      }
    }
  }
}
</script>
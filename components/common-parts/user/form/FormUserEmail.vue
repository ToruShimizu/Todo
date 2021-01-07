<template>
  <v-text-field
    v-model="innerEmail"
    prepend-inner-icon="mdi-email-edit-outline"
    :label="emailLabel"
    :rules="emailRules"
    clearable
  />
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: ''
    },
    emailLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      emailRules: [
        v => !!v || 'Emailは必須です',
        v =>
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || 'メールアドレスの形式が違います'
      ]
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

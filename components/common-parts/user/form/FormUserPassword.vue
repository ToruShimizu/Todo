<template>
  <v-text-field
    v-model="innerPassword"
    :type="showPassword ? 'text' : 'Password'"
    prepend-inner-icon="mdi-lock-outline"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :label="passwordLabel"
    :rules="passwordRules"
    counter="72"
    @click:append="clickShowPassword"
  />
</template>

<script>
export default {
  props: {
    password: {
      type: String,
      default: ''
    },
    passwordLabel: {
      type: String,
      default: ''
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passwordRules: [
        value => !!value || 'パスワードは必須です',
        value =>
          /^[\w-]{6,72}$/.test(value) || '半角英数字で6文字以上72文字以下でで入力してください'
      ]
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
  },
  methods: {
    clickShowPassword() {
      this.$emit('handle-show-password')
    }
  }
}
</script>

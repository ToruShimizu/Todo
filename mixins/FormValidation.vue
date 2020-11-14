<script>
// バリデーションの共通化
const validRules = {
  categoryRules: { required: (v) => v.length > 0 || 'カテゴリは必須です' },
  emailRules: {
    required: (value) => !!value || 'メールアドレスは必須です',
    regex: (value) =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      ) || 'メールアドレスの形式が違います'
  },
  passwordRules: {
    required: (value) => !!value || 'パスワードは必須です',
    regex: (value) =>
      /^[\w-]{6,72}$/.test(value) || '半角英数字で6文字以上72文字以下でで入力してください'
  },
  nameRules: { required: (value) => !!value || '名前は必須です' }
}

export default {
  data() {
    return {
      validRules
    }
  }
}
</script>

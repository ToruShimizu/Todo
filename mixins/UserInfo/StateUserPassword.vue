<script>
import { mapState } from 'vuex'

export default {
  computed: {
    // ユーザーパスワードの入力を検知してstoreに渡してstateを更新する
    getUserPassword: {
      get() {
        return this.userPassword
      },
      set(userPassword) {
        this.$store.dispatch('modules/auth/commitUserPassword', userPassword)
      }
    },
    ...mapState('modules/auth', ['userPassword'])
  }
}
</script>

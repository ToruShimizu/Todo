<script>
import { mapState } from 'vuex'

export default {
  computed: {
    // ユーザーのメールアドレスの入力を検知してstoreに渡してstateを更新する
    getUserEmail: {
      get() {
        return this.userEmail
      },
      set(userEmail) {
        this.$store.dispatch('modules/auth/commitUserEmail', userEmail)
      }
    },
    ...mapState('modules/auth', ['userEmail'])
  }
}
</script>

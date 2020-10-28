<script>
import { mapState } from 'vuex'

export default {
  computed: {
    // ユーザー名の入力を検知してstoreに渡してstateを更新する
    getUserName: {
      get() {
        return this.userName
      },
      set(userName) {
        this.$store.dispatch('modules/auth/commitUserName', userName)
      }
    },
    ...mapState('modules/auth', ['userName'])
  }
}
</script>

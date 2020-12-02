import firebase, { auth } from '~/plugins/firebase'

// initial state
const state = () => ({
  loginUser: null
})

const mutations = {
  // ログインユーザー情報の取得
  setLoginUser(state, userInfo) {
    state.loginUser = userInfo
  },
  updateUserName(state, userName) {
    state.loginUser.displayName = userName;
  },
  updateUserEmail(state, userEmail) {
    state.loginUser.email = userEmail;
  },
  updateUserAvatar(state, photoURL) {
    state.loginUser.photoURL = photoURL;
  },
  // ログインユーザー情報の削除
  deleteLoginUser(state) {
    state.loginUser = null
  }
}

const actions = {
  // ログインユーザー情報の取得
  async setLoginUser({ commit, dispatch }, userInfo) {
    await commit('setLoginUser', userInfo)
    dispatch('modules/activity-plans/activityPlans/fetchActivityPlans', null, { root: true })
    dispatch('modules/team/team/fetchTeam', null, { root: true })

  },
  // ログインユーザー情報の削除
  deleteLoginUser({ commit }) {
    commit('deleteLoginUser')
  },
  // Googleログイン
  async googleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(provider).then((result) => {
        alert('ようこそ ' + result.user.displayName + 'さん!')
        this.$router.push({ path: '/activityPlans' })
      })
    } catch (err) {
      alert('ログインに失敗しました。もう一度やり直してください。')
    }
  },
  // メールアドレスとパスワードでログイン
  async login({ commit }, { email, password }) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      const userInfo = await firebase.auth().currentUser
      alert('ようこそ' + userInfo.displayName + 'さん!')
      // サインイン成功後にトップページに遷移する
      this.$router.push({ path: '/activityPlans' })
    } catch {
      alert('ログインに失敗しました。もう一度やり直してください。')
    }
  },
  // ログアウト
  async logout({ commit }) {
    await auth.signOut()
    alert('ログアウトしました。')
    commit('deleteLoginUser')
  },
  // ユーザー作成してからそのままログインする
  async createUser({ dispatch }, { email, password, userName }) {
    try {
      const newUser = await auth.createUserWithEmailAndPassword(email, password)
      await newUser.user.updateProfile({
        displayName: userName
      })
      alert('ユーザーの作成に成功しました。このままログインします。')
      await dispatch('login', { email, password })
      email = null
      password = null
      userName = null
    } catch (err) {
      alert('ユーザーの作成に失敗しました。もう一度やり直してください。')
      console.log(err)
    }
  }
}

const getters = {
  // ユーザー名の取得
  gettersUserName: (state) => (state.loginUser ? state.loginUser.displayName : ''),
  // ユーザーのメールアドレスの取得
  gettersUserEmail: (state) => (state.loginUser ? state.loginUser.email : ''),
  // ユーザー画像の取得
  photoURL: (state) => (state.loginUser ? state.loginUser.photoURL : ''),
  // uidの取得
  uid: (state) => (state.loginUser ? state.loginUser.uid : null)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

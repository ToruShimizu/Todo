import firebase, { auth } from '~/plugins/firebase'

// initial state
const state = () => ({
  login_user: null
})

const mutations = {
  // ログインユーザー情報の取得
  setLoginUser(state, userInfo) {
    state.login_user = userInfo
    console.log('setLoginUser')
  },
  // ログインユーザー情報の削除
  deleteLoginUser(state) {
    state.login_user = null
    console.log('deleteLoginUser')
  }
}

const actions = {
  // ログインユーザー情報の取得
  setLoginUser({ commit }, userInfo) {
    commit('setLoginUser', userInfo)
  },
  // ログインユーザー情報の削除
  deleteLoginUser({ commit }) {
    commit('deleteLoginUser')
  },
  // Googleログイン
  async googleLogin({ commit }) {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(provider).then((result) => {
        alert('ようこそ ' + result.user.displayName + 'さん!')
        commit('setLoginUser')
        this.$router.push({ path: '/todos' })
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
      commit('setLoginUser', userInfo)
      // サインイン成功後にトップページに遷移する
      this.$router.push({ path: '/todos' })
    } catch {
      alert('ログインに失敗しました。もう一度やり直してください。')
    }
  },
  // ログアウト
  async logout({ commit }) {
    await auth.signOut()
    alert('ログアウトしました。')
    console.log('logout')
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
  gettersUserName: (state) => (state.login_user ? state.login_user.displayName : ''),
  // ユーザーのメールアドレスの取得
  gettersUserEmail: (state) => (state.login_user ? state.login_user.email : ''),
  // ユーザー画像の取得
  photoURL: (state) => (state.login_user ? state.login_user.photoURL : ''),
  // uidの取得
  uid: (state) => (state.login_user ? state.login_user.uid : null)
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

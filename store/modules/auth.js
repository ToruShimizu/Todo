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
    console.log(userInfo)
    commit('setLoginUser', userInfo)
  },
  // ログインユーザー情報の削除
  deleteLoginUser({ commit }) {
    commit('deleteLoginUser')
  },
  async onAuthStateChanged({ dispatch }) {
    await auth.onAuthStateChanged((user) => {
      if (user) {
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid
        }
        dispatch('setLoginUser', userInfo)
      }
    })
  },
  // Googleログイン
  async googleLogin({ commit }) {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      await auth.signInWithPopup(provider).then((result) => {
        alert('Hello, ' + result.user.displayName + '!')
        commit('setLoginUser')
        this.$router.push({ path: '/' })
      })
    } catch (err) {
      alert('ログインに失敗しました')
    }
  },
  // メールアドレスとパスワードでログイン
  async login({ commit }, { email, password, userName }) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      alert('ようこそ' + userName + 'さん')
      // サインイン成功後にトップページに遷移する
      this.$router.push({ path: '/' })
      commit('setLoginUser')
    } catch {
      alert('ログインに失敗しました')
    }
  },
  // ログアウト
  async logout({ commit }) {
    await auth.signOut()
    alert('ログアウトしました')
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
      alert('作成に成功しました')
      alert('このままログインします')
      dispatch('login', { email, password, userName })
    } catch (err) {
      alert('作成に失敗しました')
      console.log(err)
    }
  },
  // ユーザー情報の更新
  // FIXME:ユーザーのstate更新
  async updateUserName({ dispatch }, { userName }) {
    const user = await firebase.auth().currentUser
    if (user.displayName === 'テストユーザー') {
      alert('テストユーザーは変更できません')
    } else {
      try {
        await user.updateProfile({
          displayName: userName
        })
        alert('成功しました')
        console.log(user)
        dispatch('onAuthStateChanged')
      } catch (err) {
        alert('更新に失敗しました')
        console.log(err)
      }
    }
  },
  // メールアドレスの変更
  async updateEmailAddress({ dispatch }, { email }) {
    const user = firebase.auth().currentUser
    if (user.email === 'test@example.com') {
      alert('テストユーザーは変更できません')
    } else {
      try {
        await user.updateEmail(email)
        alert('新しいメールアドレスの登録が完了しました')
        dispatch('onAuthStateChanged')
      } catch (err) {
        alert('新しいメールアドレスの登録に失敗しました')
        console.log(err)
      }
    }
  },
  // パスワードの変更
  async updatePassword({ dispatch }, { email, password, updatePassword }) {
    const user = await firebase.auth().currentUser
    const credential = await firebase.auth.EmailAuthProvider.credential(email, password)
    if (user.displayName === 'テストユーザー') {
      alert('テストユーザーは変更できません')
    } else {
      // 最初に再認証してから変更処理を行う
      try {
        await user.reauthenticateWithCredential(credential)
        await user.updatePassword(updatePassword)
        alert('パスワードを変更しました')
        dispatch('logout')
      } catch (err) {
        console.log(err)
      }
    }
  },
  // パスワードの再登録
  async passwordReset({ commit }, { email }) {
    try {
      // 送信されるメールを日本語に変換
      auth.languageCode = 'ja'
      await auth.sendPasswordResetEmail(email)
    } catch {
      alert('送信に失敗しました')
    }
  },
  // ユーザー情報削除
  async deleteUser({ commit }, { email, password }) {
    if (email === 'test@example.com') {
      alert('テストユーザーは削除できません')
    } else {
      // 最初に再認証してから変更処理を行う
      try {
        const user = await firebase.auth().currentUser
        const credential = await firebase.auth.EmailAuthProvider.credential(email, password)
        await user.reauthenticateWithCredential(credential)
        await user.delete()
        alert('ユーザー情報を削除しました')
        commit('deleteLoginUser')
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const getters = {
  // ユーザーネームの取得
  userName: (state) => (state.login_user ? state.login_user.displayName : ''),
  userEmail: (state) => (state.login_user ? state.login_user.email : ''),
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

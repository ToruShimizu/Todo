import firebase, { auth, storageRef } from '~/plugins/firebase'

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
        this.$router.push({ path: '/' })
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
      this.$router.push({ path: '/' })
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
  },
  // ユーザープロフィール画像の追加
  async uploadUserAvatarFile({ getters, commit }, userAvatarFile) {
    const userInfo = await firebase.auth().currentUser
    const imageRef = await storageRef.child(`images/${getters.uid}/${userAvatarFile.name}`)
    const snapShot = await imageRef.put(userAvatarFile)
    const photoURL = await snapShot.ref.getDownloadURL()
    try {
      await userInfo.updateProfile({
        photoURL
      })
      alert('プロフィール画像の変更が完了しました。')
      // ログインユーザーの情報を更新
      commit('setLoginUser', userInfo)
    } catch (err) {
      alert('画像の変更に失敗しました。もう一度やり直してください。')
      console.log(err)
    }
  },
  // ユーザー情報の更新
  // FIXME:ユーザーのstate更新
  async updateUserName({ commit }, { userName, file }) {
    console.log('auth', file)
    const userInfo = await firebase.auth().currentUser
    if (userInfo.displayName === 'テストユーザー') {
      alert('テストユーザーは変更できません')
    } else {
      try {
        await userInfo.updateProfile({
          displayName: userName
        })
        alert('ユーザー名の変更が完了しました。')
        commit('setLoginUser', userInfo)
      } catch (err) {
        alert('ユーザー名の変更に失敗しました。もう一度やり直してください。')
        console.log(err)
      }
    }
  },
  // メールアドレスの変更
  async updateEmailAddress({ commit }, { email }) {
    const userInfo = firebase.auth().currentUser
    if (userInfo.email === 'test@example.com') {
      alert('テストユーザーは変更できません')
    } else {
      try {
        await userInfo.updateEmail(email)
        alert('新しいメールアドレスの登録が完了しました。')
        commit('setLoginUser', userInfo)
      } catch (err) {
        alert('新しいメールアドレスの登録に失敗しました。もう一度やり直してください。')
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
        alert('パスワードの変更が完了しました。ログイン画面に戻ります。')
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
      alert('送信が完了しました。記載されているURLより再登録をお願いします。')
    } catch {
      alert('送信に失敗しました。もう一度やり直してください。')
    }
  },
  // ユーザー情報削除
  async deleteAccount({ commit }, { email, password }) {
    if (email === 'test@example.com') {
      alert('テストユーザーは削除できません')
    } else {
      // 最初に再認証してから変更処理を行う
      try {
        const user = await firebase.auth().currentUser
        const credential = await firebase.auth.EmailAuthProvider.credential(email, password)
        await user.reauthenticateWithCredential(credential)
        await user.delete()
        alert('ユーザー情報を削除しました。ログイン画面に戻ります。')
        commit('deleteLoginUser')
      } catch (err) {
        console.log(err)
      }
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

import firebase, { auth, storageRef } from '~/plugins/firebase'

// initial state
const state = () => ({
  login_user: null,
  userName: null,
  userEmail: null,
  userPassword: null
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
  },
  // 入力されたユーザー名の更新
  mutateUserName(state, userName) {
    state.userName = userName
  },
  // 入力されたメールアドレスの更新
  mutateUserEmail(state, userEmail) {
    state.userEmail = userEmail
  },
  // 入力されたパスワードの更新
  mutateUserPassword(state, userPassword) {
    state.userPassword = userPassword
  }
}

const actions = {
  // 入力されたユーザー名の更新
  commitUserName({ commit }, userName) {
    commit('mutateUserName', userName)
  },
  // 入力されたメールアドレスの更新
  commitUserEmail({ commit }, userEmail) {
    commit('mutateUserEmail', userEmail)
  },
  // 入力されたパスワードの更新
  commitUserPassword({ commit }, userPassword) {
    commit('mutateUserPassword', userPassword)
  },
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
      const user = await firebase.auth().currentUser
      alert('ようこそ' + user.displayName + 'さん!')
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
  async updateUserName({ dispatch }, { userName, file }) {
    console.log('auth', file)
    const user = await firebase.auth().currentUser
    const imageRef = await storageRef.child(`images/${getters.uid}/${file.name}`)
    const snapShot = await imageRef.put(file)
    const image = await snapShot.ref.getDownloadURL()
    if (user.displayName === 'テストユーザー') {
      alert('テストユーザーは変更できません')
    } else {
      try {
        // await dispatch('uploadFile', file)
        await user.updateProfile({
          displayName: userName,
          photoURL: image
        })
        alert('ユーザー名の変更が完了しました。')
        console.log(user)
        dispatch('onAuthStateChanged')
      } catch (err) {
        alert('ユーザー名の変更に失敗しました。もう一度やり直してください。')
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
        alert('新しいメールアドレスの登録が完了しました。')
        dispatch('onAuthStateChanged')
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

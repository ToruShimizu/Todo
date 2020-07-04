import firebase from '~/plugins/firebase'
export const strict = false

export const state = () => ({
  todos: [],
  login_user: null,
})

export const mutations = {
  // ログインユーザー情報の取得
  setLoginUser (state, user) {
    state.login_user = user
  },
  // ログインユーザー情報の削除
  deleteLoginUser(state) {
    state.login_user = null
  },
  // タスク追加
  create (state, payload) {
    state.todos.push({ content: payload.content, done: false })
  },
  // タスク削除
  remove (state, payload) {
    state.todos.splice(state.todos.indexOf(payload.todo), 1)
  },
  // 完了、未完了切り替え
  toggle (state, payload) {
    payload.done = !payload.done
  },
  doneEdit (state, payload) {
    if (payload.editContent == "") {
      return
    }
    payload.content = payload.editContent
  },

}

export const actions = {
  // ログインユーザー情報の取得
  setLoginUser ( { commit }, user) {
    commit('setLoginUser', user)
  },
  // fetchAddresses ({ getters, commit }) {
  //   firebase.firestore().collection(`users/${getters.uid}/addresses`).get().then(snapshot => {
  //     snapshot.forEach(doc => commit('todos', { id: doc.id, todos:  doc.data() }))
  //   })
  // },
  // ログインユーザー情報の削除
  deleteLoginUser({ commit }){
    commit('deleteLoginUser')
  },
  // ログイン
  login () {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      alert('Hello, '+result.user.displayName+'!')
    })
  },
  // ログアウト
  logout () {
    firebase.auth().signOut()
  },
  // タスク追加
  // create ({ commit }, payload) {
  //   commit("create", payload)
  // },
  create ({ commit }, todo) {
    firebase.firestore().collection('users').doc('todos').set({content:todo.content,done:false})
    commit('todos',todo)
  },
  // タスク削除
  remove ({ commit }, payload) {
    commit("remove", payload)
  },
  // 完了、未完了切り替え
  toggle ({ commit }, payload) {
    commit("toggle", payload)
  },
  doneEdit ({ commit }, payload) {
    commit("doneEdit", payload)
  },
}

export const getters = {
  userName: state => state.login_user ? state.login_user.displayName : '',
  photoURL: state => state.login_user ? state.login_user.photoURL: '',
  uid: state => state.login_user ? state.login_user.uid: null,
  // タスク総数のカウント
  todosCount (state) {
    return state.todos.length
  },
  // 完了タスクのカウント
  completedTodos (state, getters) {
    return state.todos.filter(todo => todo.done).length
  },
  // タスクの完了率
  progress (state, getters) {
    return (getters.completedTodos / state.todos.length) * 100
  },
  // 未完了タスクのカウント
  remainingTodos (state, getters) {
    return state.todos.length - getters.completedTodos
  }
}

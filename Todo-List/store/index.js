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
  addTask (state, payload) {
    state.todos.push({ task: payload.task, done: false })
  },
  // タスク削除
  removeTask (state, payload) {
    state.todos.splice(state.todos.indexOf(payload.task), 1)
  },
  // 完了、未完了切り替え
  toggleDone (state, payload) {
    payload.done = !payload.done
  },
  addEditTask (state, payload) {
    if (payload.editTask == "") {
      return
    }
    payload.task = payload.editTask
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
  addTask ({ commit }, payload) {
      firebase.firestore().collection('users').doc('user1').set({task:payload.task,done:false})
    commit("addTask", payload)
  },
  // create ({ commit }, todo) {
  //   firebase.firestore().collection('users').doc('user1').set({content:todo.content,done:false})
  //   commit('todos',todo)
  // },
  // タスク削除
  removeTask ({ commit }, payload) {
    firebase.firestore().collection("users").doc("user1").delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error)
  })
  commit("removeTask", payload)
  },
  // 完了、未完了切り替え
  toggleDone ({ commit }, payload) {
    commit("toggleDone", payload)
  },
  addEditTask ({ commit }, payload) {
    commit("addEditTask", payload)
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

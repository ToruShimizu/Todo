import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  todos: [],
  login_user: null,
})

export const mutations = {
  // ログインユーザー情報の取得
  setLoginUser(state, user) {
    state.login_user = user
  },
  // ログインユーザー情報の削除
  deleteLoginUser(state) {
    state.login_user = null
  },
  // データを初期化する
  initTodos (state) {
    state.todos = []
  },
  // 取り出したデータを格納
  addTodos(state, todo) {
    state.todos.push(todo)
  },
  // タスク追加
  addTask(state, {id,todo}) {
    state.todos.push(todo)
    todo.id= id
  },
  // タスク削除
  removeTask (state, { id }) {
    const index = state.todos.findIndex(todo => todo.id === id)
    state.todos.splice(index, 1)
  },
  updateTask (state, { id, task }) {
    // インデックスを取得
    const index = state.todos.findIndex(todo => todo.id === id)
    state.todos[index] = task
  },
  // 完了、未完了切り替え
  doneTask(state, { todo }) {
    todo.done = !todo.done
  }
}

export const actions = {

  // ログインユーザー情報の取得
  setLoginUser({ commit }, user) {
    commit('setLoginUser', user)
  },
  // ログインユーザー情報の削除
  deleteLoginUser({ commit }) {
    commit('deleteLoginUser')
  },
  // Googleログイン
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then(result => {
      alert('Hello, ' + result.user.displayName + '!')
    })
  },
  // アカウントなしでログイン
  login ({commit},payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(result => {
        // サインイン成功後にトップページに遷移する
        alert('アカウントなしでログインします')
      })
  },
    // ログアウト
    logout() {
      alert('ログアウトしました')
      auth.signOut()
    },
  // firestoreからデータを取り出す
  fetchTodos ({ getters, commit }) {
    commit('initTodos')
    db.collection(`users/${getters.uid}/todos`).get().then(snapshot => {
      snapshot.forEach(doc => commit('addTodos', { id: doc.id, task:  doc.data() }))
    })
  },
  // タスク追加
 addTask({ getters,commit }, todo) {
    const task = {
      title: todo.task.title,
      detail: todo.task.detail,
      date: todo.task.date,
      done: false,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }
    if(getters.uid){
     db.collection(`users/${getters.uid}/todos`)
        .add(task)
        .then(doc => {
          commit('addTask', { id: doc.id,todo })
          console.log(doc.id)
        })
      }
  },
  // タスク更新
  updateTask ({ getters, commit }, { id, task }) {
    if (getters.uid) {
      db.collection(`users/${getters.uid}/todos`).doc(id).update(task).then(() => {
        commit('updateTask', { id, task })
      })
    }
  },
  // タスク削除
  removeTask({ getters,commit }, {id}) {
    if (getters.uid) {
      db.collection(`users/${getters.uid}/todos`).doc(id).delete().then(() => {
        commit('removeTask', { id })
      })
    }
  },
  // 完了、未完了切り替え
  doneTask({ commit }, todo) {
    taskRef.update({
      done: !todo.done
    })
    commit('doneTask', { todo })
  },
}

export const getters = {
  // ユーザーネームの取得
  userName: state => (state.login_user ? state.login_user.displayName : ''),
  // ユーザー画像の取得
  photoURL: state => (state.login_user ? state.login_user.photoURL : ''),
  // uidの取得
  uid: state => (state.login_user ? state.login_user.uid : null),
  // idを返す関数
  getAddressById: state => id => state.todos.find(todo => todo.id === id),

  // タスク総数のカウント
  todosCount(state) {
    return state.todos.length
  },
  // 完了タスクのカウント
  completedTodos(state) {
    return state.todos.filter(todo => todo.done).length
  },
  // タスクの完了率
  progress(state, getters) {
    let completed = (getters.completedTodos / state.todos.length) * 100
    return completed.toFixed()
  },
  // 未完了タスクのカウント
  remainingTodos(state, getters) {
    return state.todos.length - getters.completedTodos
  },
}

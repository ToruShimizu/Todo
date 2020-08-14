import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
import { v4 as uuidv4 } from 'uuid';

export const strict = false

export const state = () => ({
  todos: [],
  task: {
    id:'',
    title: '',
    detail: '',
    date: [new Date().toISOString().substr(0, 10)],
    done: false,
  },
  searchTask: '',
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
  // 初期化
  initTodos (state) {
    state.todos = []
  },
  // 取り出したデータを格納
  // タスク追加
  addTodos(state, todo) {
    state.todos.push(todo)
  },
  addTask(state, {id,todo}) {
    // state.task = task
    todo.id= id
    state.todos.push(todo)
  },
  // タスク削除
  removeTask (state, { id }) {
    state.todos.splice(state.todos.indexOf(id), 1)

    // const index = state.todos.findIndex(todo => todo.id === id)
    // state.todos.splice(index, 1)
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
  // ログイン
  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider).then(result => {
      alert('Hello, ' + result.user.displayName + '!')
    })
  },
  // ログアウト
  logout() {
    alert('ログアウトしました')
    auth.signOut()
  },
  login ({commit},payload) {
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(result => {
        // サインイン成功後にトップページに遷移する
        alert('アカウントなしでログインします')
      })
  },
  // データを取り出す
  fetchTodos ({ getters, commit }) {
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
  fetchTask({ getters,commit }, payload) {
    return new Promise((resolve, reject) => {
      db.collection(`users/${getters.uid}/todos`).where('id', '==', payload.id).get()
      .then(res => {
        res.forEach((doc) => {
          commit('addTask', doc.data())
          resolve(true)
        })
      })
      .catch(error => {
        console.error('An error occurred in fetchTodos(): ', error)
        reject(error)
      })
    })
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
  editTask({ commit }, payload) {
    return new Promise((resolve, reject) => {
      todosRef.where('id', '==', payload.task.id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const task = {
            id: uuidv4(),
            title: payload.task.title,
            // detail: payload.task.detail,
            // date: payload.task.date,
            updated_at: firebase.firestore.FieldValue.serverTimestamp()
          }

          todosRef.doc(doc.id).update(task)
          .then(ref => {
            resolve(true)
          })
          .catch(error => {
            console.error('An error occurred in editUser(): ', error)
            resolve(error)
          })
        })
      })
    })
  },
}

export const getters = {
  userName: state => (state.login_user ? state.login_user.displayName : ''),
  photoURL: state => (state.login_user ? state.login_user.photoURL : ''),
  uid: state => (state.login_user ? state.login_user.uid : null),

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
  getTask(state) {
    return state.task
  },
  getSearchTask(state) {
    return state.searchTask
  }
}

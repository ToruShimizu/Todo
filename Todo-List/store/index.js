import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
export const strict = false

export const state = () => ({
  todos: [
    {
      task: 'プログラミング学習',
      detail: 'Nuxt.jsとfirebaseでTodoリストを作る',
      date: '2020-07-01',
      time: '19:00',
      done: false
    }
  ],
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
  // タスク追加
  addTask(state, { todo }) {
    state.todos.push({
      date: todo.date,
      time: todo.time,
      task: todo.task,
      detail: todo.detail,
      done: false
    })
  },
  // タスク削除
  removeTask(state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  updateTask(state, todo) {
    todo.task = todo.editTask
    todo.detail = todo.editDetail
    todo.date = todo.editDate
    todo.time = todo.editTime
  },
  // 完了、未完了切り替え
  doneTask(state, { todo }) {
    todo.done = !todo.done
  }
}

export const actions = {
  addUser({commit}, payload) {
    const usersRef = db.collection('users')

    const user = {
      userName: payload.userName,
      password: payload.password,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
  updated_at: firebase.firestore.FieldValue.serverTimestamp()
    }
    return new Promise((resolve,reject) => {
      usersRef.add(user).then(ref => {
        resolve(true)
      })
      .catch(error => {
        console.error('An error occurred in addUser(): ', error)
        reject(error)
      })
    })
  },
  // ログインユーザー情報の取得
  setLoginUser({ commit }, user) {
    commit('setLoginUser', user)
  },
  // ログインユーザー情報の削除
  deleteLoginUser({ commit }) {
    commit('deleteLoginUser')
  },
  toggleSideMenu({ commit }) {
    commit('toggleSideMenu')
  },
  // ログイン
  login() {
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
  // タスク追加
  async addTask({ commit }, todo) {
    try {
      await db.collection('users').doc('user1')
      .set({
        task: todo.task,
        detail: todo.detail,
        date: todo.date,
        time: todo.time,
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
    catch(error) {
        console.log('Error writing document: ', error)
      }
    commit('addTask', { todo })
  },
  // タスク削除
  removeTask({ commit }, todo) {
    db.collection('users')
      .doc('user1')
      .delete()
      .then(function() {
        console.log('Document successfully deleted!')
      })
      .catch(function(error) {
        console.error('Error removing document: ', error)
      })
    commit('removeTask', { todo })
  },
  // 完了、未完了切り替え
  doneTask({ commit }, todo) {
    commit('doneTask', { todo })
  },
  async updateTask({ commit }, todo) {
    try {

      const taskRef = db.collection('users').doc('user1')

      // Set the 'capital' field of the city 'DC'
      return taskRef.update({
        task:todo.editTask,
        detail:todo.editDetail,
        date:todo.editDate,
        time:todo.editTime,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }
      catch(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error)
      }
    commit('updateTask', todo)
  }
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
    return (getters.completedTodos / state.todos.length) * 100
  },
  // 未完了タスクのカウント
  remainingTodos(state, getters) {
    return state.todos.length - getters.completedTodos
  }
}

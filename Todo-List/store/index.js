import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
export const strict = false

export const state = () => ({
  todos: [{task:'プログラミング学習',detail:'Nuxt.jsとfirebaseでTodoリストを作る',date:'2020-07-01',time:'19:00',done:false}],
  editTask:'',
  editDetail: '',
  login_user: null,
  drawer: false,
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
  toggleSideMenu (state) {
    state.drawer = !state.drawer
  },
  // タスク追加
  addTask (state, payload) {
    state.todos.push({ date:payload.date,time:payload.time,task: payload.task, detail:payload.detail,done: false })
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
    payload.task = payload.editTask
    payload.detail = payload.editDetail
    payload.date = payload.editDate
    payload.time = payload.editTime
    payload.done = false
  },

}

export const actions = {
  // ログインユーザー情報の取得
  setLoginUser ( { commit }, user) {
    commit('setLoginUser', user)
  },
  // ログインユーザー情報の削除
  deleteLoginUser({ commit }){
    commit('deleteLoginUser')
  },
  toggleSideMenu ({ commit }) {
    commit('toggleSideMenu')
  },
  // ログイン
  login () {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
    .then((result) => {
      alert('Hello, '+result.user.displayName+'!')
    })
  },
  // ログアウト
  logout () {
    alert('ログアウトしました')
    auth.signOut()
  },
  // タスク追加
  addTask ({ commit }, payload) {

      db.collection('users').doc('user1').set({task:payload.task}).then(function() {

        console.log("Document successfully written!")
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    commit("addTask", payload)
  },
  // タスク削除
  removeTask ({ commit }, payload) {
    db.collection("users").doc("user1").delete().then(function() {
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
    const taskRef = db.collection("users").doc("user1")

    // Set the "capital" field of the city 'DC'
    // taskRef.update({
    //    task:payload.editTask,
    //    detail: payload.editDetail,
    //    date: payload.editDate,
    //    time: payload.editTime
    // })
    // .then(function() {
    //     console.log("Document successfully updated!");
    // })
    // .catch(function(error) {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    // })
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
  completedTodos (state) {
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

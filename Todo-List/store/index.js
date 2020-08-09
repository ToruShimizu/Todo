import firebase from '~/plugins/firebase'
import { auth } from '~/plugins/firebase'
import { db } from '~/plugins/firebase'
import { v4 as uuidv4 } from 'uuid';

export const strict = false
const todosRef = db.collection('todos')
const taskRef = db.collection('todos').doc('task')



export const state = () => ({
  todos: [],
  task: {
    id:'',
    title: '',
    detail: '',
    date: [new Date().toISOString().substr(0, 10)],
    time: null,
    done: false,
  },

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
  addTodos(state, todos) {
    state.todos.push(todos)
  },
  // タスク追加
  // addTask(state, { todo }) {
  //   state.todos.push(todo.task)
  // },
  addTask(state, {id,todo}) {
    todo.id = id
    state.todos.push(todo)
  },
  // タスク削除
  removeTask(state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  updateTask(state, todo) {
    todo.title = todo.editTitle
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
  fetchTodos ({ getters,commit }) {
    commit('initTodos')
    return new Promise ((resolve, reject) => {
      db.collection(`user/${getters.uid}/todos`).orderBy('created', 'desc').get()
      .then(res => {
        res.forEach((doc) => {
          commit('addTodos', doc.data())
          resolve(true)
        })
      })
      .catch(error => {
        console.error('An error occurred in fetchUsers(): ', error)
        reject(error)
      })
    })
  },
  // タスク追加
 addTask({ getters,commit }, todo) {
    // const task = {
    //   title: todo.task.title,
    //   detail: todo.task.detail,
    //   date: todo.task.date,
    //   time: todo.task.time,
    //   done: false,
    //   created: firebase.firestore.FieldValue.serverTimestamp()
    // }
    if(getters.uid){
     db.collection(`user/${getters.uid}/todos`)
        .add(todo)
        .then(doc => {
          commit('addTask', { id: doc.id,todo })
        })
      }
  },
  fetchTask({ getters,commit }, payload) {
    return new Promise((resolve, reject) => {
      db.collection(`user/${getters.uid}/todos`).where('id', '==', payload.id).get()
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
  removeTask({ getters,commit }, payload) {
    return new Promise((resolve, reject) => {
      db.collection(`user/${getters.uid}/todos`).where('id', '==', payload.id).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          db.collection(`user/${getters.uid}/todos`).doc(doc.id).delete()
          .then(ref => {
            resolve(true)
          })
          .catch(error => {
            console.error('An error occurred in removeTask(): ', error)
            reject(error)
          })
        })
      })
    })
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
            // time: payload.task.time,
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
  async updateTask({ commit }, todo) {
    try {
      // Set the 'capital' field of the city 'DC'
      return taskRef.update({
        task:todo.editTitle,
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
  }
}

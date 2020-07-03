import firebase from '~/plugins/firebase'
export const strict = false



export const state = () => ({
  todos: [],
  login_user: null,
})

export const mutations = {
  // setLoginUser (state, user) {
  //   state.login_user = user
  // },
  setLoginUser (state, user) {
    state.login_user = user
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
  }
}

export const actions = {
  // setLoginUser ( context , user) {
  //   context.commit('setLoginUser', user)
  // },
  setLoginUser ( context, user) {
    context.commit('setLoginUser', user)
  },
  // ログイン機能
  // login () {
  //   const google_auth_provider = new firebase.auth.GoogleAuthProvider()
  //   firebase.auth().signInWithRedirect(google_auth_provider)
  // },
  login () {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      alert('Hello, '+result.user.displayName+'!')
    })
  },

  // タスク追加
  create (context, payload) {
    context.commit("create", payload)
  },
  // タスク削除
  remove (context, payload) {
    context.commit("remove", payload)
  },
  // 完了、未完了切り替え
  toggle (context, payload) {
    context.commit("toggle", payload)
  },
  doneEdit (context, payload) {
    context.commit("doneEdit", payload)
  }
}

export const getters = {
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

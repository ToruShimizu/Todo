export const state = () => ({
  todos: [],
})

export const mutations = {
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


export const state = () => ({
  todos:[]
})

export const mutations = {
  // リスト追加
  create (state, payload,text) {
    state.todos.push({content: payload.content, done:false,})
  },
  remove (state, payload) {
    state.todos.splice(state.todos.indexOf(payload.todo), 1)
  },
  toggle (state, payload) {
    payload.done = !payload.done
  },
  update(state, { id, title, detail }) {
    const index = state.todos.findIndex(todo => todo.id === id);
    if (index >= 0) {
      state.todos[index].title = title;
    }
  }

}

export const actions = {
  // リスト追加
  create (context, payload) {
    context.commit('create', payload)
  },
  remove (context, payload) {
    context.commit('remove', payload)
  },
  toggle (context, payload) {
    context.commit('toggle', payload)
  },
  updateTodo({ commit }, todo) {
    commit("update", todo);
  },

}

export const getters = {
  todosCount (state) {
    return state.todos.length;
  },
  completedTodos (state,getters) {
    return state.todos.filter(todo => todo.done).length
  },
  progress (state,getters) {
    return (getters.completedTodos / state.todos.length) * 100
  },
  remainingTodos (state,getters) {
    return state.todos.length - getters.completedTodos
  },
}

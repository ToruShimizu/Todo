
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
  }

}

export const getters = {

}


export const state = () => ({
  todos:[]
})

export const mutations = {
  // リスト追加
  create (state, payload) {
    state.todos.push({content: payload.content})
  },
  remove (state, payload) {
    state.todos.splice(state.todos.indexOf(payload.todo), 1)
  },
}

export const actions = {
  // リスト追加
  create (context, payload) {
    context.commit('create', payload)
  },
  remove (context, payload) {
    context.commit('remove', payload)
  }
}

export const getters = {

}

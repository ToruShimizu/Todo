
export const state = () => ({
  tasks:[]
})

export const mutations = {
  // リスト追加
  create (state, payload) {
    state.tasks.push({content: payload.content})
  },
}

export const actions = {
  // リスト追加
  create (context, payload) {
    context.commit('create', payload)
  },
}

export const getters = {

}

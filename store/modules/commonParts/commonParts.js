const state = () => ({
  snackbar: false,
})
const mutations = {
  openSnackbar(state) {
    state.snackbar = true
    console.log(state.snackbar)

  },
  closeSnackbar(state) {
    state.snackbar = false
    console.log(state.snackbar)
  }


}

export default {
  namespaced: true,
  state,

  mutations
}

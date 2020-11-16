import { v4 as uuidv4 } from 'uuid'
import firebase, { db } from '~/plugins/firebase'

const state = () => ({
  team: {
    name: '',
    id: '',
  }
})
const mutations = {
  registrationTeam(state, registrationTeam) {
    state.team.name = registrationTeam.teamName
    state.team.id = registrationTeam.teamId
    console.log('registrationTeam')
  },

}
const actions = {

  async fetchTeamData({ getters, commit }) {
    console.log(getters.userUid)
    const snapShot = await db
      .collection(`users/${getters.userUid}/team`)
      .get()
    snapShot.docs.map((doc) => {

      const teamData = doc.data()
      commit('registrationTeam', teamData)
    })
  },
  async registrationTeamName({ getters, commit }, teamName) {
    const id = uuidv4()
    const teamId = String(id)
    const registrationTeam = {
      teamName,
      teamId,
    }

    if (getters.userUid) {
      await db.collection(`users/${getters.userUid}/team`).doc(teamId).set(registrationTeam)
    }
    commit('registrationTeam', registrationTeam)
  },

}

const getters = {
  // チームネームの取得
  teamName: (state) => {
    return state.team.name
  },
  // チームidの取得
  teamId: (state) => {
    return state.team.id
  },
  // uidの取得
  userUid: (state, getters, rootState, rootGetters) => {
    return rootGetters['modules/user/auth/uid']
  },


}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import { v4 as uuidv4 } from 'uuid'
import firebase, { db } from '~/plugins/firebase'

const state = () => ({
  team: []
})
const mutations = {
  registrationTeam(state, registrationTeam) {
    console.log(registrationTeam)
    state.team.unshift(registrationTeam)
    console.log('registrationTeam')
  },

}
const actions = {
  async fetchActivityPlans({ getters, commit }) {

  },
  async fetchTeamData({ getters, commit }) {
    const snapShot = await db
      .collection(`users/${getters.userUid}/team`)
      .orderBy('created', 'desc')
      .get()
    snapShot.docs.map((doc) => {
      const teamData = doc.data()
      commit('registrationTeam', teamData)
    })
  },
  async registrationTeamName({ getters, commit }, teamName) {
    console.log(teamName)
    const teamId = uuidv4()
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

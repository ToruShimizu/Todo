import { v4 as uuidv4 } from 'uuid'
import firebase, { db } from '~/plugins/firebase'

const state = () => ({
  team: {
    name: '',
    id: '',
  },
  teamMember: [],
})
const mutations = {
  registrationTeam(state, registrationTeam) {
    state.team.name = registrationTeam.teamName
    state.team.id = registrationTeam.teamId
    console.log('registrationTeam')
  },
  registrationMember(state, registrationMember) {
    state.teamMember.unshift(registrationMember)
    console.log('registrationMember')
  },

}
const actions = {

  async fetchTeamData({ getters, commit, dispatch }) {
    console.log(getters.userUid)
    const snapShot = await db
      .collection(`users/${getters.userUid}/team`)
      .get()
    await snapShot.docs.map((doc) => {

      const teamData = doc.data()
      commit('registrationTeam', teamData)
    })
    dispatch('fetchMember')
  },
  async fetchMember({ getters, commit },) {
    const snapShot = await db.collection(`users/${getters.userUid}/team`).doc(getters.teamId).get()
    const subCollection = await snapShot.ref.collection('teamMember').get()
    subCollection.docs.map((doc) => {
      const member = doc.data()
      commit('registrationMember', member)
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

  async registrationMember({ commit, getters }, teamMember) {
    const id = uuidv4()
    const memberId = String(id)
    const registrationMember = {
      name: teamMember.name,
      role: teamMember.role,
      improvementRole: teamMember.improvementRole
    }
    try {
      if (getters.userUid) {
        await db
          .collection(`users/${getters.userUid}/team`)
          .doc(getters.teamId)
          .collection('teamMember')
          .doc(memberId)
          .set(registrationMember)
      }
    }
    catch (err) {
      alert('登録に失敗しました。もう一度やり直してください。')
      console.log(err);
    }
    commit('registrationMember', registrationMember)
  }
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

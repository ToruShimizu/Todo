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
  updateMember(state, editMember) {
    const index = state.teamMember.findIndex((member) => member.id === editMember.id)
    const teamMember = state.teamMember[index]
    teamMember.name = editMember.name
    teamMember.role = editMember.role
    teamMember.improvementRole = editMember.improvementRole
    console.log('updateMember')

  },
  removeMember(state, id) {
    const index = state.teamMember.findIndex((member) => member.id === id)
    state.teamMember.splice(index, 1)
  }

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
      id: memberId,
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
  },
  async updateMember({ getters, commit }, editMember) {
    try {
      if (getters.userUid) {
        const snapShot = await db.collection(`users/${getters.userUid}/team`).get()
        snapShot.docs.map(async (doc) => {
          await doc.ref.collection('teamMember').doc(editMember.id).update(editMember
          )
        })
        await commit('updateMember', editMember
        )
      }
    } catch (err) {
      alert('更新に失敗しました。もう一度やり直しください。')
      console.log(err);
    }
  },
  async removeMember({ commit, getters }, teamMember) {
    const id = teamMember.id;
    if (getters.userUid) {
      const snapShot = await db.collection(`users/${getters.userUid}/team`).get()
      snapShot.forEach(async (doc) => {
        await doc.ref.collection('teamMember').doc(id).delete()
      })
      commit('removeMember', id)
    }
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

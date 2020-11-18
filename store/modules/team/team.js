import { v4 as uuidv4 } from 'uuid'
import { db, storageRef } from '~/plugins/firebase'

const state = () => ({
  team: {
    name: '',
    id: '',
    photoURL: ''
  },
  teamMember: [],
})
const mutations = {
  registrationTeam(state, registrationTeam) {
    state.team = registrationTeam
    console.log('registrationTeam')
  },
  updateTeamImageFile(state, photoURL) {
    console.log(photoURL)
    state.team.photoURL = photoURL
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
  removeTeam(state, id) {
    const index = state.teamMember.findIndex((member) => member.id === id)
    state.team.splice(index, 1)
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

  async registrationTeam({ getters, commit }, team) {
    const imageFile = team.imageFile
    const imageRef = await storageRef.child(`teamImages/${getters.userUid}/${imageFile.name}`)
    const snapShot = await imageRef.put(imageFile)
    const photoURL = await snapShot.ref.getDownloadURL()
    const id = uuidv4()
    const teamId = String(id)
    const registrationTeam = {
      name: team.name,
      id: teamId,
      photoURL,
    }
    try {
      if (getters.userUid) {
        await db.collection(`users/${getters.userUid}/team`).doc(teamId).set(registrationTeam)
      }
      commit('registrationTeam', registrationTeam)
    } catch (err) {
      alert('登録に失敗しました。もう一度やり直してください')
      console.log(err);
    }
  },
  async removeTeam({ commit, state, getters }) {
    const id = state.team.id
    await db.collection(`users/${getters.userUid}/team`).doc(id).delete()
    commit('removeTeam', id)
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
  },
  async uploadTeamImageFile({ getters, commit }, teamImageFile) {
    const imageRef = await storageRef.child(`teamImages/${getters.userUid}/${teamImageFile.name}`)
    const snapShot = await imageRef.put(teamImageFile)
    const photoURL = await snapShot.ref.getDownloadURL()
    console.log(photoURL)
    try {
      if (getters.userUid) {
        await db.collection(`users/${getters.userUid}/team`).doc(getters.teamId).update({ photoURL: photoURL })
        alert('プロフィール画像の変更が完了しました。')
        commit('updateTeamImageFile', photoURL)
      }
    } catch (err) {
      alert('画像の変更に失敗しました。もう一度やり直してください。')
      console.log(err)
    }
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
  teamPhotoURL: (state) => (state.team.photoURL ? state.team.photoURL : ''),

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

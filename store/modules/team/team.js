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
  updateTeam(state, updateTeam) {
    state.team = updateTeam
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
  initMember(state) {
    state.teamMember = []
  },
  removeTeam(state, id) {
    state.team = {}
  },
  removeMember(state, id) {
    const index = state.teamMember.findIndex((member) => member.id === id)
    state.teamMember.splice(index, 1)
  }

}
const actions = {

  async fetchTeam({ getters, commit, dispatch }) {
    const snapShot = await db
      .collection(`users/${getters.userUid}/team`)
      .get()
    await snapShot.docs.map((doc) => {
      const teamData = doc.data()
      commit('registrationTeam', teamData)
    })
    dispatch('fetchMember')
  },
  async fetchMember({ state, getters, commit },) {
    const id = state.team.id
    if (id) {
      const snapShot = await db.collection(`users/${getters.userUid}/team`).doc(id).get()
      const subCollection = await snapShot.ref.collection('teamMember').get()
      commit('initMember')
      subCollection.docs.map((doc) => {
        const member = doc.data()
        commit('registrationMember', member)
      })
    }
  },

  async registrationTeam({ getters, commit, dispatch }, team) {
    const id = await db.collection(`users/${getters.userUid}/team`).doc().id
    if (team.imageFile) {
      await dispatch('uploadTeamImageFile', { team, id })
    } else {
      const registrationTeam = {
        name: team.name,
        id
      }
      try {
        if (getters.userUid) {
          await db.collection(`users/${getters.userUid}/team`).doc(id).set(registrationTeam)
        }
        commit('registrationTeam', registrationTeam)
        commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })

      } catch (err) {
        alert('登録に失敗しました。もう一度やり直してください')
        console.log(err);
      }
    }
  },
  async uploadTeamImageFile({ getters, commit }, { team, id }) {
    const imageFile = team.imageFile
    const imageRef = await storageRef.child(`teamImages/${getters.userUid}/${imageFile.name}`)
    const snapShot = await imageRef.put(imageFile)
    const photoURL = await snapShot.ref.getDownloadURL()
    const registrationTeam = {
      name: team.name,
      id,
      photoURL,
    }
    try {
      if (getters.userUid) {
        await db.collection(`users/${getters.userUid}/team`).doc(id).set(registrationTeam)
      }
      commit('registrationTeam', registrationTeam)
      commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })
    } catch (err) {
      alert('登録に失敗しました。もう一度やり直してください')
      console.log(err);
    }
  },
  async updateTeam({ state, getters, dispatch }, team) {
    if (team.imageFile) {
      dispatch('updateTeamImageFile', team)
    } else {
      const updateTeam = {
        name: team.name,
        id: team.id
      }
      try {
        if (getters.userUid) {
          await db.collection(`users/${getters.userUid}/team`).doc(team.id).update(updateTeam)
          alert('チーム情報の変更が完了しました。')
          commit('updateTeam', updateTeam)
          commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })
        }
      } catch (err) {
        alert('変更に失敗しました。もう一度やり直してください')
        console.log(err)
      }
    }
  },
  async updateTeamImageFile({ getters, commit }, team) {
    const imageFile = team.imageFile
    const imageRef = await storageRef.child(`teamImages/${getters.userUid}/${imageFile.name}`)
    const snapShot = await imageRef.put(imageFile)
    const photoURL = await snapShot.ref.getDownloadURL()
    const registrationTeam = {
      name: team.name,
      photoURL,
    }
    try {
      if (getters.userUid) {
        await db.collection(`users/${getters.userUid}/team`).doc(getters.teamId).set(registrationTeam)
      }
      commit('registrationTeam', registrationTeam)
      commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })

    } catch (err) {
      alert('変更に失敗しました。もう一度やり直してください')
      console.log(err);
    }
  },
  async removeTeam({ commit, state, getters }) {
    const id = state.team.id
    try {

      await db.collection(`users/${getters.userUid}/team`).doc(id).delete()
      commit('removeTeam', id)
    } catch (err) {
      alert('削除に失敗しました。もう一度やり直してください')
      console.log(err)
    }
  },

  async registrationMember({ state, commit, getters }, teamMember) {
    const uid = String(state.team.id)
    console.log(uid)
    const id = await db.collection(`users/${getters.userUid}/team`).doc(uid).collection('teamMember').doc().id

    const registrationMember = {
      id,
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
          .doc(id)
          .set(registrationMember)
      }
      commit('registrationMember', registrationMember)
      commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })
    }
    catch (err) {
      alert('登録に失敗しました。もう一度やり直してください。')
      console.log(err);
    }
  },
  async updateMember({ getters, commit }, editMember) {
    try {
      if (getters.userUid) {
        const snapShot = await db.collection(`users/${getters.userUid}/team`).get()
        snapShot.docs.map(async (doc) => {
          await doc.ref.collection('teamMember').doc(editMember.id).update(editMember
          )
        })
        await commit('updateMember', editMember)
        commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })

      }
    } catch (err) {
      alert('更新に失敗しました。もう一度やり直しください。')
      console.log(err);
    }
  },
  async removeMember({ commit, getters }, teamMember) {
    const id = teamMember.id;
    try {

      if (getters.userUid) {
        const snapShot = await db.collection(`users/${getters.userUid}/team`).get()
        snapShot.docs.map(async (doc) => {
          await doc.ref.collection('teamMember').doc(id).delete()
        })
        commit('removeMember', id)
      }
    } catch (err) {
      alert('削除に失敗しました。もう一度やり直してください')
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

  // メンバーの名前を取得
  gettersTeamMember: (state) => {
    return state.teamMember.map((member) => {
      return member.name
    })
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

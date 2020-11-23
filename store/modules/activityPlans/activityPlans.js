import firebase, { storageRef, db } from '~/plugins/firebase'

const state = () => ({
  activityPlans: []
})
const mutations = {
  // データを初期化する
  initActivityPlans(state) {
    state.activityPlans = []
    console.log('initActivityPlans')
  },
  // 活動計画追加
  addActivityPlan(state, activityPlan) {
    state.activityPlans.unshift(activityPlan)
    console.log('addActivityPlan')
  },
  // 活動計画削除
  removeActivityPlan(state, { activityPlanId }) {
    const index = state.activityPlans.findIndex((activityPlan) => activityPlan.id === activityPlanId)
    state.activityPlans.splice(index, 1)
    console.log('removePlanContents')
  },
  // 活動計画更新
  updateActivityPlan(state, updateActivityPlan) {
    const index = state.activityPlans.findIndex((contents) => contents.id === updateActivityPlan.id)
    const activityPlan = state.activityPlans[index]
    activityPlan.category = updateActivityPlan.category
    activityPlan.date = updateActivityPlan.date
    activityPlan.detail = updateActivityPlan.detail
    activityPlan.inChargeMember = updateActivityPlan.inChargeMember
    activityPlan.done = updateActivityPlan.done
    activityPlan.id = updateActivityPlan.id
    activityPlan.photoURL = updateActivityPlan.photoURL
    activityPlan.fileName = updateActivityPlan.fileName

    console.log('updateActivityPlan')
  },
  // 活動計画の完了状態切り替え
  doneActivityPlan(state, planContents) {
    planContents.done = !planContents.done
  },
  removePhotoURL(state, id) {
    const index = state.activityPlans.findIndex((contents) => contents.id === id)
    state.activityPlans[index].photoURL = null

  }
}
const actions = {
  // firestoreからactivityPlanのデータを取り出す
  async fetchActivityPlans({ getters, commit }) {
    const snapShot = await db
      .collection(`users/${getters.userUid}/activityPlans`)
      .orderBy('created', 'desc')
      .get()
    commit('initActivityPlans')
    snapShot.docs.map((doc) => {
      const planContents = doc.data()
      commit('addActivityPlan', planContents)
    })
  },
  // 活動計画追加
  async addActivityPlan({ getters, commit }, planContents) {
    const id = await db.collection(`users/${getters.userUid}/activityPlans`).doc().id
    const createActivityPlan = {
      id,
      category: planContents.category,
      detail: planContents.detail,
      date: planContents.date,
      inChargeMember: planContents.inChargeMember,
      done: false,
      fileName: planContents.fileName,
      photoURL: planContents.photoURL,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }
    try {
      if (getters.userUid) {
        await db.collection(`users/${getters.userUid}/activityPlans`).doc(id).set(createActivityPlan)
        commit('addActivityPlan', createActivityPlan)
        commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })
      }
    } catch (err) {
      console.log(err)
    }
  },
  async uploadPlanContentsImageFile({ dispatch, getters }, planContents) {
    const imageFile = planContents.imageFile
    const imageRef = await storageRef.child(`planContentsImages/${getters.userUid}/${imageFile.name}`)
    const snapShot = await imageRef.put(imageFile)
    const photoURL = await snapShot.ref.getDownloadURL()
    planContents.photoURL = photoURL
    planContents.fileName = imageFile.name
    dispatch('addActivityPlan', planContents)
  },
  // 活動計画更新
  async updateActivityPlan({ getters, commit }, planContents) {
    const id = planContents.id
    const updateActivityPlan = {
      id,
      category: planContents.category,
      date: planContents.date,
      detail: planContents.detail,
      inChargeMember: planContents.inChargeMember,
      done: false,
      photoURL: planContents.photoURL,
      fileName: imageFile.name,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }
    try {
      if (getters.userUid) {
        await db.collection(`users/${getters.userUid}/activityPlans`).doc(id).update(updateActivityPlan)
        commit('updateActivityPlan', updateActivityPlan)
        commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })
      }
    }
    catch (err) {
      log(err)
    }
  },
  async updatePlanContentsImageFile({ dispatch }, { planContents, id }) {
    const imageFile = planContents.imageFile
    const imageRef = await storageRef.child(`planContentsImages/${id}/${imageFile.name}`)
    const snapShot = await imageRef.put(imageFile)
    const photoURL = await snapShot.ref.getDownloadURL()

    planContents.photoURL = photoURL
    planContents.fileName = imageFile
    dispatch('updatePlanContentsImageFile', planContents)
  },
  // 活動計画削除
  async removeActivityPlan({ getters, commit }, { id }) {
    const activityPlanId = id
    if (getters.userUid) {
      await db.collection(`users/${getters.userUid}/activityPlans`).doc(activityPlanId).delete()
      commit('removeActivityPlan', { activityPlanId })
    }
  },
  async allRemoveActivityPlan({ commit, getters }) {
    const snapShot = await db
      .collection(`users/${getters.userUid}/activityPlans`)
      .orderBy('created', 'desc')
      .get()
    snapShot.docs.map(async (doc) => {
      await db.collection(`users/${getters.userUid}/activityPlans`).doc(doc.id).delete()
      commit('initActivityPlans')
    })
  },
  // 活動計画の完了状態切り替え
  async doneActivityPlan({ getters, commit }, { planContents, id }) {
    await db.collection(`users/${getters.userUid}/activityPlans`).doc(id).update({
      done: !planContents.done
    })
    commit('doneActivityPlan', planContents)
  },
  async updateImageFile({ getters, commit }, planContents) {
    const id = planContents.id
    const imageFile = planContents.imageFile
    const imageRef = await storageRef.child(`planContentsImages/${id}/${imageFile.name}`)
    const snapShot = await imageRef.put(imageFile)
    const photoURL = await snapShot.ref.getDownloadURL()
    const updateActivityPlan = {
      id,
      category: planContents.category,
      date: planContents.date,
      detail: planContents.detail,
      inChargeMember: planContents.inChargeMember,
      done: false,
      photoURL,
      fileName: imageFile.name,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }

    try {
      if (getters.userUid) {
        await db.collection(`users/${getters.userUid}/activityPlans`).doc(id).update(updateActivityPlan)
        commit('updateActivityPlan', updateActivityPlan)
        commit('modules/commonParts/commonParts/openSnackbar', null, { root: true })
        planContents.photoURL = photoURL
        planContents.imageFile = null
      }
    }
    catch (err) {
      console.log(err)
    }
  },
  async removePlanContentsImage({ commit, getters }, planContents) {
    const id = planContents.id
    const imageRef = await storageRef.child(`planContentsImages/${id}/${planContents.fileName}`)
    try {
      await imageRef.delete()
      await db.collection(`users/${getters.userUid}/activityPlans`).doc(id).update({ photoURL: null })
      commit('removePhotoURL', id)
      planContents.photoURL = null
    } catch (err) {
      console.log(err)
    }
  },
}

const getters = {
  // uidの取得
  userUid: (state, getters, rootState, rootGetters) => {
    return rootGetters['modules/user/auth/uid']
  },

  // 活動計画総数のカウント
  activityPlansCount(state) {
    return state.activityPlans.length
  },
  remainingActivityPlansLength(state, getters) {
    return state.activityPlans.length - getters.completedActivityPlansLength
  },
  // 完了活動計画のカウント
  completedActivityPlansLength(state, getters) {
    return getters.completedActivityPlans.length
  },
  // 活動計画の完了率
  completionRateOfActivityPlans(state, getters) {
    const completed = (getters.completedActivityPlansLength / state.activityPlans.length) * 100
    return completed.toFixed()
  },
  // 未完了状態の活動計画の絞り込み
  remainingActivityPlans(state, getters) {
    return state.activityPlans.filter((activityPlan) => !activityPlan.done)
  },
  // 完了状態の絞り込み
  completedActivityPlans(state) {
    return state.activityPlans.filter((activityPlan) => activityPlan.done)
  },
  sortByCategory(state) {
    return state.activityPlans.slice().sort((a, b) => {
      if (a.category < b.category) return -1
    })
  },
  sortByAscDate(state) {
    return state.activityPlans.slice().sort((a, b) => {
      if (a.date > b.date) return -1
    })
  },
  sortByDescDate(state) {
    return state.activityPlans.slice().sort((a, b) => {
      if (a.date < b.date) return -1
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

import { v4 as uuidv4 } from 'uuid'
import firebase, { db } from '~/plugins/firebase'

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
  updateActivityPlan(state, activityPlan) {
    const index = state.activityPlans.findIndex((contents) => contents.id === activityPlan.id)
    state.activityPlans[index] = activityPlan
    console.log('updateActivityPlan')
  },
  // 活動計画の完了状態切り替え
  doneActivityPlan(state, planContents) {
    planContents.done = !planContents.done
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
    const activityPlanId = uuidv4()
    const createActivityPlan = {
      id: activityPlanId,
      categorys: planContents.categorys,
      detail: planContents.detail,
      date: planContents.date,
      done: false,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }
    if (getters.userUid) {
      await db.collection(`users/${getters.userUid}/activityPlans`).doc(activityPlanId).set(createActivityPlan)
    }
    commit('addActivityPlan', createActivityPlan)
  },
  // 活動計画更新
  async updateActivityPlan({ getters, commit }, planContents) {
    const activityPlanId = planContents.id
    const updateActivityPlan = {
      id,
      categorys: planContents.categorys,
      date: planContents.date,
      detail: planContents.detail,
      done: false,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }
    if (getters.userUid) {
      await db.collection(`users/${getters.userUid}/activityPlans`).doc(activityPlanId).update(updateActivityPlan)
      commit('updateActivityPlan', updateActivityPlan)
    }
  },
  // 活動計画削除
  async removeActivityPlan({ getters, commit }, { id }) {
    const activityPlanId = id
    if (getters.userUid) {
      await db.collection(`users/${getters.userUid}/activityPlans`).doc(activityPlanId).delete()
      commit('removeActivityPlan', { activityPlanId })
    }
  },
  // 活動計画の完了状態切り替え
  async doneActivityPlan({ getters, commit }, { planContents, id }) {
    await db.collection(`users/${getters.userUid}/activityPlans`).doc(id).update({
      done: !planContents.done
    })
    commit('doneActivityPlan', planContents)
  }
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
  sortByCategorys(state) {
    return state.activityPlans.slice().sort((a, b) => {
      if (a.categorys < b.categorys) return -1
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
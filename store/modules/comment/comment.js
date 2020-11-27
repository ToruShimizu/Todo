import { db } from '~/plugins/firebase'

const mutations = {
  // コメントの初期化
  initComments(state) {
    state.comments = []
    console.log('initComments')
  }
}
const actions = {
  // コメントの追加処理
  async addComment({ getters, commit }, { id, message }) {
    const date = new Date()
    const createTime =
      date.getFullYear() +
      '年' +
      (date.getMonth() + 1) +
      '月' +
      date.getDate() +
      '日' +
      date.getHours() +
      '時' +
      date.getMinutes() +
      '分'
    const commentId = await db.collection(`users/${getters.userUid}/activityPlans`).doc(id).collection(`comments/${getters.userUid}/message`).doc().id

    const comment = {
      activityPlanId: id,
      message,
      id: commentId,
      created: createTime
    }
    if (getters.userUid) {
      await db
        .collection(`users/${getters.userUid}/activityPlans`)
        .doc(id)
        .collection(`comments/${getters.userUid}/message`)
        .doc(commentId)
        .set(comment)
    }
    commit('modules/activityPlans/activityPlans/addComment', { comment, id }, { root: true })

  },
  // コメントの削除
  async removeComment({ getters, commit }, comment) {
    if (getters.userUid) {
      const snapShot = await db.collection(`users/${getters.userUid}/activityPlans`).get()
      snapShot.docs.map(async (doc) => {
        await doc.ref.collection(`comments/${getters.userUid}/message`).doc(comment.id).delete()
      })
      commit('modules/activityPlans/activityPlans/removeComment', comment, { root: true })
    }
  },
  // コメントの取得
  async fetchComments({ getters, commit }, id) {
    commit('initComments')
    const snapShot = await db.collection(`users/${getters.userUid}/activityPlans`).doc(id).get()
    const subCollection = await snapShot.ref
      .collection(`comments/${getters.userUid}/message`)
      .orderBy('created', 'desc')
      .get()
    subCollection.docs.map((doc) => {
      const comment = doc.data()
      const commentId = comment.activityPlanId
      commit('modules/activityPlans/activityPlans/addComment', { comment, id: commentId }, { root: true })
    })
  }
}

const getters = {
  // uidの取得
  userUid: (state, getters, rootState, rootGetters) => {
    return rootGetters['modules/user/auth/uid']
  }
}

export default {
  namespaced: true,
  getters,
  actions,
  mutations
}

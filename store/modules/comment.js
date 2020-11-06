import { v4 as uuidv4 } from 'uuid'
import { db } from '~/plugins/firebase'

const state = () => ({
  comments: []
})
const mutations = {
  // コメントの追加処理
  addComment(state, comment) {
    state.comments.push(comment)
    console.log('addComments')
  },
  // コメント削除
  removeComment(state, { id }) {
    const index = state.comments.findIndex((comment) => comment.id === id)
    state.comments.splice(index, 1)
    console.log('removeComment')
  },
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
      '分' +
      date.getSeconds() +
      '秒'
    const commentId = uuidv4()
    const comment = {
      message,
      id: commentId,
      created: createTime
    }
    if (getters.userUid) {
      await db
        .collection(`users/${getters.userUid}/todos`)
        .doc(id)
        .collection(`comments/${getters.userUid}/message`)
        .doc(commentId)
        .set(comment)
    }
    commit('addComment', comment)
  },
  // コメントの削除
  async removeComment({ getters, commit }, { id }) {
    if (getters.userUid) {
      const snapShot = await db.collection(`users/${getters.userUid}/todos`).get()
      snapShot.forEach(async (doc) => {
        await doc.ref.collection(`comments/${getters.userUid}/message`).doc(id).delete()
      })
      commit('removeComment', { id })
    }
  },
  // コメントの取得
  async fetchComments({ getters, commit }, id) {
    commit('initComments')
    const snapShot = await db.collection(`users/${getters.userUid}/todos`).doc(id).get()
    const subCollection = await snapShot.ref
      .collection(`comments/${getters.userUid}/message`)
      .orderBy('created', 'desc')
      .get()
    subCollection.forEach((doc) => {
      const comment = doc.data()
      commit('addComment', comment)
    })
  }
}

const getters = {
  // uidの取得
  userUid: (state, getters, rootState, rootGetters) => {
    return rootGetters['modules/auth/uid']
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

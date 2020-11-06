import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './modules/user/auth'
import * as userInfo from './modules/user/userInfo'
import * as todos from './modules/todos'
import * as comment from './modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    userInfo,
    todos,
    comment
  }
})

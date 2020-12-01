import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './modules/user/auth'
import * as userInfo from './modules/user/userInfo'
import * as activityPlans from './modules/activityPlans/activityPlans'
import * as team from './modules/team/team'
import * as commonParts from './modules/commonParts/commonParts'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    userInfo,
    activityPlans,
    team,
    commonParts,
  }
})

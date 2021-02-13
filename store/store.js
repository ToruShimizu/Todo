import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './modules/user/auth'
import * as userInfo from './modules/user/userInfo'
import * as activityPlans from './modules/activity-plans/activityPlans'
import * as circle from './modules/circle'
import * as commonParts from './modules/common-parts/commonParts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    userInfo,
    activityPlans,
    circle,
    commonParts
  }
})

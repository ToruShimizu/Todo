import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from './modules/auth'
import * as todos from './modules/todos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    todos
  }
})

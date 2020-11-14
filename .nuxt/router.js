import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _1aa39070 = () => interopDefault(import('../pages/activityPlans.vue' /* webpackChunkName: "pages/activityPlans" */))
const _14038586 = () => interopDefault(import('../pages/signIn.vue' /* webpackChunkName: "pages/signIn" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/activityPlans",
    component: _1aa39070,
    name: "activityPlans"
  }, {
    path: "/signIn",
    component: _14038586,
    name: "signIn"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}

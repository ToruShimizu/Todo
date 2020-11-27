import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fd12f094 = () => interopDefault(import('../pages/activityPlans.vue' /* webpackChunkName: "pages/activityPlans" */))
const _cbaf6e92 = () => interopDefault(import('../pages/signIn.vue' /* webpackChunkName: "pages/signIn" */))
const _455f8d12 = () => interopDefault(import('../pages/team.vue' /* webpackChunkName: "pages/team" */))

// TODO: remove in Nuxt 3
const emptyFn = () => { }
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onComplete = emptyFn, onAbort) {
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
    path: "/",
    component: _fd12f094,
    name: "activityPlans"
  }, {
    path: "/signIn",
    component: _cbaf6e92,
    name: "signIn"
  }, {
    path: "/team",
    component: _455f8d12,
    name: "team"
  }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}

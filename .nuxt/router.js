import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _14038586 = () => interopDefault(import('../pages/signIn.vue' /* webpackChunkName: "pages/signIn" */))
const _d4e346bc = () => interopDefault(import('../pages/todos.vue' /* webpackChunkName: "pages/Todos" */))
const _46804a27 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    path: "/signIn",
    component: _14038586,
    name: "signIn"
  }, {
    path: "/todos",
    component: _d4e346bc,
    name: "todos"
  }, {
    path: "/",
    component: _46804a27,
    name: "index"
  }],

  fallback: false
}

export function createRouter() {
  return new Router(routerOptions)
}

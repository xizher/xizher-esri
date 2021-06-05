import VueRouter, { RouteConfig } from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const routes : RouteConfig[] = [
  {
    path: '/index',
    component: () => import('~views/Index.vue'),
    // component: Index,
  },
  { path: '/', redirect: '/index' }
]

const router = new VueRouter({
  routes,
  mode: 'hash',
})

export default router

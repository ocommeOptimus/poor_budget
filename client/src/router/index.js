import Vue from 'vue'
import VueRouter from 'vue-router'
import { authGuard, setDocumentTitle } from './utils'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  authGuard(to.name)

  setDocumentTitle(to.meta.title)

  next()
})

export default router

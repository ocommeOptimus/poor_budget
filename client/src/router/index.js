import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import i18n from '../plugins/i18n'
import Register from '../views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { title: i18n.t('router-link.home') }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: i18n.t('router-link.login') }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { title: i18n.t('router-link.register') }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const routerTitle = to.meta.title
  if (routerTitle) {
    document.title = `Poor budget | ${routerTitle}`
  } else {
    document.title = 'Poor budget'
  }
  next()
})

export default router

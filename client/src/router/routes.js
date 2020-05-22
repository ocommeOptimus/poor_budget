import i18n from '../plugins/i18n'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'

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

export default routes

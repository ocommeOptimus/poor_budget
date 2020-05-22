import router from './index'
import store from '../store'

/**
 * Force unauth user to login and register and prevent auth user from accessing it
 * @param {string} routeName
 */
const authGuard = routeName => {
  const anonymousRoute = ['login', 'register']

  if (store.getters.isAuth && anonymousRoute.includes(routeName)) {
    router.replace({ name: 'home' })
  } else if (!anonymousRoute.includes(routeName)) {
    router.replace({ name: 'login' })
  }
}

/**
 * Change page title
 * @param {string} routeTitle
 */
const setDocumentTitle = routeTitle => {
  if (routeTitle) {
    document.title = `Poor budget | ${routeTitle}`
  } else {
    document.title = 'Poor budget'
  }
}

export { authGuard, setDocumentTitle }

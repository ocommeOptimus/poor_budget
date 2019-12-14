import axios from 'axios'
import store from '../../store'

const api = axios.create({ baseURL: 'http://127.0.0.1:3333/api/' })

api.interceptors.request.use(
  request => {
    const token = store.state.token

    if (token) {
      request.headers.authorization = `Bearer ${token}`
    }

    return request
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      // Let unauthorized login response go
      if (error.response.request.responseURL.includes('auth/login') && error.response.status === 401) {
        return Promise.reject(error)
      } else {
        store.dispatch('setError', error.status)
      }
    } else {
      store.dispatch('setError', 'serverDown')
    }
  }
)

const authApi = {
  register: user => api.post('auth/register', user),
  login: credentials => api.post('auth/login', credentials),
  user: () => api.get('auth/user')
}

const transfersApi = {
  getAll: () => api.get('transfers')
}

export { authApi, transfersApi }

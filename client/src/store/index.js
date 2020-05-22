import Vue from 'vue'
import Vuex from 'vuex'
import { authApi, transfersApi } from '../plugins/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    success: null,
    token: '',
    user: null
  },
  mutations: {
    SET_ERROR(state, error) {
      state.error = error
    },
    SET_SUCCESS(state, success) {
      state.success = success
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async getTransfers() {
      await transfersApi.getAll().then(function({ data }) {
        console.log(data)
      })
    },
    setError({ commit }, error) {
      commit('SET_ERROR', error)
    },
    setSuccess({ commit }, success) {
      commit('SET_SUCCESS', success)
    },
    async loginUser({ commit }, credentials) {
      const auth = await authApi.login(credentials)

      if (auth) {
        commit('SET_TOKEN', auth.data.token)
        const user = await authApi.user()
        commit('SET_USER', user.data)
      }
    },
    logoutUser({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_USER', null)
    },
    async registerUser({ commit }, credentials) {
      const auth = await authApi.register(credentials)

      if (auth) {
        commit('SET_TOKEN', auth.data.token)
        const user = await authApi.user()
        commit('SET_USER', user.data)
      }
    },
    resetError({ commit }) {
      commit('SET_ERROR', null)
    },
    resetSuccess({ commit }) {
      commit('SET_SUCCESS', null)
    }
  },
  getters: {
    isAuth: state => {
      return Boolean(state.user && state.user.id)
    }
  }
})

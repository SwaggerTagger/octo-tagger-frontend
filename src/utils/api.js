import Vue from 'vue'
import VueResource from 'vue-resource'

import store from '@/store'

Vue.use(VueResource)
Vue.http.options.root = '/api'

Vue.http.interceptors.push((request, next) => {
  let jwt = store.state.loggedIn.token
  if (jwt) {
    request.headers.set('x-auth-token', jwt)
  }
  next((response) => {
    const jwt = response.headers.get('x-auth-token')
    if (jwt) {
      store.commit('setToken', jwt)
    }
  })
})
/* eslint-disable no-param-reassign */
export const ApiMutations = {
  setLogin(state, loginState) {
    state.loggedIn = loginState
  },
  setRegister(state, registerState) {
    state.registered = registerState
  },
}
/* eslint-enable no-param-reassign */
export const ApiActions = {
  async login({ commit, dispatch }, credentials) {
    await dispatch('logout')

    return new Promise((resolve) => {
      Vue.http.post('/api/signIn', credentials)

        .then((success) => {
          commit('setLogin', { is: true, reason: success, token: success.headers.get('x-auth-token') })
          resolve(true)
        }, (error) => {
          commit('setLogin', { is: false, reason: error })
          resolve(false)
        })
    })
  },
  async logout({ commit }) {
    //localStorage.removeItem('jwt')
    commit('setLogin', { is: false, reason: null, token: null })
  },
  async register({ commit }, data) {
    Vue.http.post('/api/signUp', data)

      .then((success) => {
        commit('setRegister', { is: true, reason: success })
      }, (error) => {
        commit('setRegister', { is: false, reason: error })
      })
  },
}

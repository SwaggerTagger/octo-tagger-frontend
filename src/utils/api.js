import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = '/api'

Vue.http.interceptors.push((request, next) => {
  request.headers.set('x-auth-token', localStorage.getItem('jwt'))
  next(response => {
    let jwt = response.headers.get('x-auth-token')
    if (jwt) {
      localStorage.setItem('jwt', jwt)
    }
  });
});

export const ApiMutations = {
    setLogin(state, loginState) {
       state.loggedIn = loginState
    },
    setRegister(state, registerState) {
        state.registered = registerState;
    }
}

export const ApiActions = {
    async login( { commit, dispatch }, credentials ) {
      await dispatch('logout')

      return new Promise(resolve => {
        Vue.http.post('/api/signIn', credentials)

        .then(success => {
          commit('setLogin', {is: true, reason: success});
          resolve(true)
        }, error => {
          commit('setLogin', {is: false, reason: error})
          resolve(false)
        })
      })
    },
    async logout ( { commit } ) {
      localStorage.removeItem('jwt')
      commit('setLogin', {is: false, reason: null})
    },
    async register( { commit }, data ) {
      console.log(data);
      Vue.http.post('/api/signUp', data)

      .then(success => {
        commit('setRegister', {is: true, reason: success});
      }, error => {
        commit('setRegister', {is: false, reason: error})
      });
    },
    async loadTokenFromCache({ commit }) {
      let jwt = localStorage.getItem('jwt')
      if (jwt) {
        commit('setLogin', {is: true})
      }
    }
}
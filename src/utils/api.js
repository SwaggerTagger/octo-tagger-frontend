import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = '/api'

export const ApiMutations = {
    setLogin(state, loginState) {
       state.loggedIn = loginState
    },
    setRegister(state, registerState) {
        state.registered = registerState;
    }
}

export const ApiActions = {
    async login( { commit }, credentials ) {
      Vue.http.post('/api/signIn', credentials)

      .then(success => {
        commit('setLogin', {is: true, reason: success});
      }, error => {
        commit('setLogin', {is: false, reason: error})
      });
    },
    async register( { commit }, data ) {
      console.log(data);
      Vue.http.post('/api/signUp', data)

      .then(success => {
        commit('setRegister', {is: true, reason: success});
      }, error => {
        commit('setRegister', {is: false, reason: error})
      });
    }
}
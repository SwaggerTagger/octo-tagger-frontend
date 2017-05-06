import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.root = '/api'

export default {
    async login( { commit }, credentials ) {
      Vue.http.post('/api/signIn', credentials)

      .then(success => {
        console.log("ok");
        console.log(success);
      }, error => {

        console.log("nay");
        console.log(error)
      });
    }
}
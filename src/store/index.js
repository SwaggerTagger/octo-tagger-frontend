import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const initalState = {
  images: [],
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
/* eslint-disable no-param-reassign */
const mutations = {
  setImages(state, images) {
    Vue.set(state, 'images', images)
  },
  addImage(state, image) {
    state.image.push(image)
  },
  deleteImage(state, imageId) {
    state.images = state.filter(value => imageId === value.imageId)
  },
}
/* eslint-enable no-param-reassign */
// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  // reloadImages: () => {
  //   console.log(this)
  // },
  async reloadImages({ commit }) {
    const imageResponse = await Vue.http.get('images')
    commit('setImages', imageResponse.body)
  },
  async deleteImage({ commit }, imageId) {
    await Vue.http.delete('images')
    commit('deleteImage', imageId)
  },
}

// getters are functions
const getters = {
  getImages: state => state.images,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  initalState,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
})

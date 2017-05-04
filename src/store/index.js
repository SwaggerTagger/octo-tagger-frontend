import Vue from 'vue'
import Vuex from 'vuex'
import MockApi from '@/utils/mockApi'
import { readFileToString } from '@/utils/helpers'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const initalState = {
  images: [],
  uploadQueue: [],
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
    state.images.push(image)
  },
  deleteImage(state, imageId) {
    state.images = state.filter(value => imageId === value.imageId)
  },
  addFileToQueue(state, file) {
    state.uploadQueue.push(file)
  },
  removeFileFromQueue(state, file) {
    const index = state.uploadQueue.findIndex(e => e === file)
    state.uploadQueue.splice(index, 1)
  },
  setUploadProgress(state, file, progress) {
    Vue.set(file, 'progress', progress)
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
    let imageResponse
    if (window.localStorage.mockApi && process.env.NODE_ENV !== 'production') {
      imageResponse = MockApi.images
    } else {
      imageResponse = (await Vue.http.get('images')).body
    }
    commit('setImages', imageResponse)
  },
  async deleteImage({ commit }, imageId) {
    await Vue.http.delete('images')
    commit('deleteImage', imageId)
  },
  async uploadImage({ commit }, file) {
    const fileObject = {
      file,
    }
    commit('addFileToQueue', fileObject)
    const fileContents = await readFileToString(file)
    const response = await Vue.http.post('images', fileContents, {
      headers: {
        'X-Filename': file.name,
        'Content-Type': file.type,
      },
      progress(e) {
        if (e.lengthComputable) {
          commit('setUploadProgress', fileObject, e.loaded)
          console.log('e.loaded: %o, e.total: %o, percent: %o', e.loaded, e.total, (e.loaded / e.total) * 100)
        }
      },
    })
    commit('removeFileFromQueue', fileObject)
    commit('addImage', response.body)
  },
}

// getters are functions
const getters = {
  getImages: state => state.images,
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state: initalState,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
})
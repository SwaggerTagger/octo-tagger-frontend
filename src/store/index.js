import Vue from 'vue'
import Vuex from 'vuex'

import createPersist, { createStorage } from 'vuex-localstorage'
import MockApi from '@/utils/mockApi'
import Poller from '@/utils/poller'
import { ApiMutations, ApiActions } from '@/utils/api'
import router from '@/router'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const initalState = {
  images: [],
  uploadQueue: [],
  pollingInterval: 5,
  filterText: '',
  useLegacy: false,
  predictionBoxWidth: 2,
  predictionConfidence: 33,
  predictionFontSize: 'inherit',
  loggedIn: {
    is: false,
    sessionExpired: false,
    token: null,
    reason: null,
  },
  registered: {
    is: false,
    reason: null,
  },
}
const imagePoller = Poller()

let imageEventSource

// getters are functions
const getters = {
  getImages: state => state.images,
  getFilteredImages: state => (state.filterText !== '' ?
    state.images.filter(x => x.predictions
        && x.predictions.some(el => el.category.startsWith(state.filterText)))
    : state.images),
  getProbabilityFilteredImages: (state, getters) =>
    getters.getFilteredImages.map((image) => {
      const filteredImages = Object.assign({}, image)
      filteredImages.predictions = image.predictions ?
        image.predictions.filter(pred => (pred.probability >= (getters.getPredictionConfidence / 100.0)))
      : undefined
      return filteredImages
    }),
  getFilterText: state => state.filterText,
  getPollingInterval: state => state.pollingInterval,
  getImage: (state, uuid) => state.images.find(x => x.imageId === uuid),
  isLoggedIn: state => state.loggedIn.is,
  getLogin: state => state.loggedIn.reason,
  getUploadQueue: state => state.uploadQueue,
  getPredictionBoxWidth: state => state.predictionBoxWidth,
  getPredictionFontSize: state => state.predictionFontSize,
  getPredictionConfidence: state => state.predictionConfidence,
  getUseLegacy: state => state.useLegacy,
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
    state.images.sort((a, b) => (b.uploadedAt - a.uploadedAt))
  },
  updateImage(state, image) {
    const index = state.images.findIndex(e => image.imageId === e.imageId)
    Vue.set(state.images, index, image)
  },
  deleteImage(state, imageId) {
    state.images = state.images.filter(value => imageId !== value.imageId)
  },
  addFileToQueue(state, file) {
    state.uploadQueue.push(file)
  },
  removeFileFromQueue(state, file) {
    const index = state.uploadQueue.findIndex(e => e === file)
    state.uploadQueue.splice(index, 1)
  },
  setUploadProgress(state, { file, progress }) {
    Vue.set(file, 'progress', progress)
  },
  setUploadRequest(state, { file, request }) {
    file.request = request
  },
  setLegacyPolling(state, useLegacy) {
    state.useLegacy = useLegacy
  },
  setPollingInterval(state, seconds) {
    state.pollingInterval = seconds
  },
  setPollingMethod(state, useLegacy) {
    state.pollingMethod = useLegacy
  },
  setUploadDataUrl(state, { file, dataUri }) {
    Vue.set(file, 'dataUrl', dataUri)
  },
  setToken(state, token) {
    state.loggedIn.token = token
  },
  updateFilter(state, filterText) {
    state.filterText = filterText
  },
  sessionExpired(state, response) {
    if (router.currentRoute.fullPath !== '/login') {
      state.loggedIn.is = false
      state.loggedIn.token = null
      state.loggedIn.sessionExpired = true
    }
  },
  setPredictionBoxWidth(state, width) {
    state.predictionBoxWidth = width
  },
  setPredictionFontSize(state, size) {
    state.predictionFontSize = size
  },
  setPredictionConfidence(state, confidence) {
    state.predictionConfidence = confidence
  },
  ...ApiMutations,
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
    if (window.localStorage.mockApi === 'true' && process.env.NODE_ENV !== 'production') {
      imageResponse = MockApi.images
    } else {
      const response = await Vue.http.get('images')
      imageResponse = response.body
    }
    commit('setImages', imageResponse)
  },
  async deleteImage({ commit }, imageId) {
    await Vue.http.delete(`images/${imageId}`)
    commit('deleteImage', imageId)
  },
  readFile({ commit }, file) {
    const fileReader = new FileReader()
    fileReader.onload = function (fileLoadedEvent) {
      commit('setUploadDataUrl', { file, dataUri: fileLoadedEvent.target.result })
    }
    fileReader.readAsDataURL(file.file)
  },
  async uploadImage({ commit, dispatch }, file) {
    const fileObject = {
      file,
      id: Math.floor(Math.random() * 5000),
    }
    commit('addFileToQueue', fileObject)
    dispatch('readFile', fileObject)
    const formData = new FormData()
    formData.append('picture', file)
    try {
      const response = await Vue.http.post('images', formData, {
          // use before callback
        before(request) {
          commit('setUploadRequest', { file: fileObject, request })
        },
        progress(e) {
          if (e.lengthComputable) {
            commit('setUploadProgress', { file: fileObject, progress: e.loaded })
          }
        },
      })
      commit('removeFileFromQueue', fileObject)
      commit('addImage', response.body)
    } catch (e) {
      if (e.status !== 0) {
        console.log(e)
      }
    }
  },
  cancelUpload({ commit }, file) {
    if (file.request) {
      try {
        file.request.abort()
        commit('removeFileFromQueue', file)
      } catch (e) {
        console.log(e)
      }
    }
  },
  setPollingInterval({ commit, dispatch }, seconds) {
    commit('setPollingInterval', seconds)
    dispatch('startPolling')
  },
  setPollingMethod({ commit, dispatch }, useLegacy) {
    commit('setPollingMethod', useLegacy)
    dispatch('startPolling')
  },
  startPolling({ state, dispatch, commit }) {
    if (state.useLegacy === false) {
      if (imageEventSource != null) {
        imageEventSource.close()
      }
      imageEventSource = new EventSource(`/api/events?X-Auth-Token=${state.loggedIn.token}`)
      imageEventSource.onError = function (event) {
        console.log(event)
      }
      const callback = function (e) {
        console.log(e)
        commit('updateImage', JSON.parse(e.data).image)
      }
      imageEventSource.addEventListener('started', callback)
      imageEventSource.addEventListener('finished', callback)
    } else {
      console.log('Polling started')
      imagePoller.startPolling(getters.getPollingInterval(state) * 1000, () => {
        dispatch('reloadImages')
      })
    }
  },
  stopPolling() {
    console.log('Polling stopped')
    if (imageEventSource != null) {
      imageEventSource.close()
    }
    imagePoller.cancelPolling()
  },
  ...ApiActions,
}

export default new Vuex.Store({
  state: initalState,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersist({
      namespace: 'local',
      initialState: initalState,
      expires: 5 * 3600,
    })],
})

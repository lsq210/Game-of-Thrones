import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navName: null,
    videoState: false,
    families: {
    },
    charaters: {
      selectedEvents: []
    },
    events: {
      selectedEvents: [],
      center: null
    },
    threelayer: {
      visible: false,
      center: null
    }
  },
  mutations: {
    changeNav (state, navName) {
      state.navName = navName
    },
    fly (state, center) {
      state.events.center = center
    },
    changeEvents (state, selectedEvents) {
      state.events.selectedEvents = selectedEvents
    },
    changeCharacter (state, selectedEvents) {
      state.charaters.selectedEvents = selectedEvents
    },
    showVideo (state, videoState) {
      state.videoState = videoState
    },
    changeThreeLayer (state, visible) {
      state.threelayer.visible = visible
    },
    sendModelCenter (state, center) {
      state.threelayer.center = center
    }
  }
})

export default store

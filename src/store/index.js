import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navName: null,
    families: {
      layers: ['politcalLayer']
    },
    charaters: {
      selectedEvents: []
    },
    events: {
      selectedEvents: [],
      layers: ['eventLayer'],
      center: null
    },
    layersState: {
      eventLayer: false,
      politcalLayer: false
    }
  },
  mutations: {
    changeNav (state, navName) {
      state.navName = navName
    },
    changeLayer (state, visibility) {
      state.layersState.eventLayer = visibility.eventLayer
      state.layersState.politcalLayer = visibility.politcalLayer
    },
    fly (state, center) {
      state.events.center = center
    },
    changeEvents (state, selectedEvents) {
      state.events.selectedEvents = selectedEvents
    }
  }
})

export default store

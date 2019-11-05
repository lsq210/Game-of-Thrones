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
    }
  },
  mutations: {
    changeNav (state, navName) {
      state.navName = navName
    },
    changeTime (state, time) {
      state.event.time = time
    },
    changeLayer (state, visibility) {
      state.layersShow.eventLayer = visibility.eventLayer
      state.layersShow.politcalLayer = visibility.politcalLayer
    },
    fly (state, center) {
      state.center = center
    },
    changeEvents (state, selectedEvents) {
      state.events.selectedEvents = selectedEvents
    }
  }
})

export default store

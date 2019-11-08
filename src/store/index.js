import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    navName: null,
    families: {
    },
    charaters: {
      selectedEvents: []
    },
    events: {
      selectedEvents: [],
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
    }
  }
})

export default store

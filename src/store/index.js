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
    familyInfoID: 0,
    familyAllegiance: false,
    familyVassals: false
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
    }
  }
})

export default store

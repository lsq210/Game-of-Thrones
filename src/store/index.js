import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    familiesShow: false,
    charatersShow: false,
    eventsShow: false,
    navBarShow: true,
    familyInfoShow: false,
    layersShow: {
      eventLayer: 'none',
      politcalLayer: 'none'
    },
    event: {
      time: 298
    },
    familyInfoID: 0,
    familyAllegiance: false,
    familyVassals: false
  },
  mutations: {
    changeNavShow (state, payload) {
      state.familiesShow = payload.familiesShow
      state.charatersShow = payload.charatersShow
      state.eventsShow = payload.eventsShow
      state.navBarShow = payload.navBarShow
    },
    changeTime (state, time) {
      state.event.time = time
    },
    changeLayer (state, visibility) {
      state.layersShow.eventLayer = visibility.eventLayer
      state.layersShow.politcalLayer = visibility.politcalLayer
    }
  }
})

export default store

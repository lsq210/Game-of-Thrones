import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    familiesShow: false,
    charatersShow: false,
    eventsShow: false,
    navBarShow: true,
    event: {
      time: 298,
      visibility: 'none'
    }
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
    changeEventLayer (state, payload) {
      state.event.visibility = payload.visibility
    }
  }
})

export default store

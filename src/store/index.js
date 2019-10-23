import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    familiesShow: false,
    charatersShow: false,
    eventsShow: false,
    event: {
      time: 0
    }
  },
  mutations: {
    changeNavShow (state, payload) {
      state.familiesShow = payload.familiesShow
      state.charatersShow = payload.charatersShow
      state.eventsShow = payload.eventsShow
    },
    changeTime (state, time) {
      state.time = time
    }
  }
})

export default store

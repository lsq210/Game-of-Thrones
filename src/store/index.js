import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    familiesShow: false,
    charatersShow: false,
    eventsShow: false,
    navBarShow: true,
    layersShow: {
      eventLayer: 'none',
      politcalLayer: 'none'
    },
    waysShow: {
      timeLineShow: false,
      seriesShow: false
    },
    event: {
      time: 298
    },
    center: null
  },
  mutations: {
    changeNavShow (state, payload) {
      state.familiesShow = payload.familiesShow
      state.charatersShow = payload.charatersShow
      state.eventsShow = payload.eventsShow
      state.navBarShow = payload.navBarShow
      state.waysShow.timeLineShow = payload.eventsShow
      state.waysShow.seriesShow = payload.eventsShow
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
    changeEventWay (state, way) {
      state.waysShow.seriesShow = way.series
      state.waysShow.timeLineShow = way.timeLine
    }
  }
})

export default store

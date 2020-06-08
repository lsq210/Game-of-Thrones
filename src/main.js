// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './utils/initThreejs'
import App from './App'
import store from './store'
import vSelect from 'vue-select'
import './styles/index.scss'

Vue.config.productionTip = false
Vue.component('v-select', vSelect)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  store
})

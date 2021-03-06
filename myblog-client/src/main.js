import Vue from 'vue'
import App from './App.vue'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import VueRouter from 'vue-router'
import {routes} from './routes'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {store} from './store'

Vue.use(VueAxios, axios)
const router = new VueRouter({
  routes
})
Vue.use(VueRouter)
Vue.use(iview)
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

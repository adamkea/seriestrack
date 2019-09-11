// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Master from './components/Master'
import axios from 'axios'
import router from './routes'
import VueAxios from 'vue-axios'
import {store} from './store/store'
import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css" 
import 'vue-awesome/icons'
import firebase from 'firebase'; 
import Icon from 'vue-awesome/components/Icon'
import VueProgress from 'vue-progress/src/index'

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(VueProgress)
Vue.config.productionTip = false
Vue.component('v-icon', Icon)


let app;
firebase.auth().onAuthStateChanged(user => {
  if(!app){
    app =  new Vue({
      user: user,
      el: '#app',
      store: store,
      router: router,
      components: { Master },
      template: '<Master/>'
    })
  }
});




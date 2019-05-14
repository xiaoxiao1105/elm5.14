// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'FastClick'
import store from './store/index'
import router from './router/index'
import './config/rem'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'
Vue.prototype.axios=axios
Vue.use(Mint)
axios.defaults.withCredentials=true
Vue.config.productionTip = false
if(addEventListener in document){
  document.addEventListener('DOMContentLoaded',function(){
    FastClick.attach(document.body)
  },false)
}
/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')

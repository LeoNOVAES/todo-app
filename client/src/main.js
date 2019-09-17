import Vue from 'vue'
import App from './App.vue'
import router from './routes'

import Bootstrap from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2)
Vue.use(Bootstrap);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
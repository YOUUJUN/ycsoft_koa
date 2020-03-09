import Vue from 'vue'
import Home from './Community.vue'
import store from '../../store/index'
import lib from '../../utils/lib'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);

Vue.config.productionTip = false;

Vue.prototype.$axios = lib.axios;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




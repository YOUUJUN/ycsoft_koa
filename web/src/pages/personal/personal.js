import Vue from 'vue'
import Home from './Personal.vue'
import store from '../../store/index'
import lib from '../../utils/lib'
import ElementUI from 'element-ui'
/*---element-ui---*/
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$axios = lib.axios;

let bus = new Vue;
Vue.prototype.$bus = bus;

Vue.prototype.$common = lib.common;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




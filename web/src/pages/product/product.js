import Vue from 'vue'
import Product from './Product.vue'
import store from '../../store/index'
import router from '../../router/index'
import lib from '../../utils/lib'
import ElementUI from 'element-ui'

/*---element-ui---*/
Vue.use(ElementUI);

let bus = new Vue;
Vue.prototype.$bus = bus;

Vue.config.productionTip = false;

Vue.prototype.$common = lib.common;
Vue.prototype.$config = lib.config;



new Vue({
  router,
  store,
  render: h => h(Product)
}).$mount('#app');




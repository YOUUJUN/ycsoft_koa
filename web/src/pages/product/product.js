import Vue from 'vue'
import Product from './Product.vue'
import store from '../../store/index'
import router from '../../router/index'
import lib from '../../utils/lib'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

/*---element-ui---*/
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$common = lib.common;



new Vue({
  router,
  store,
  render: h => h(Product)
}).$mount('#app');




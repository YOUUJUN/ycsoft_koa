import Vue from 'vue'
import Product from './Product.vue'
import store from '../../store/index'
import lib from '../../utils/lib'

Vue.config.productionTip = false;



new Vue({
  store,
  render: h => h(Product)
}).$mount('#app');




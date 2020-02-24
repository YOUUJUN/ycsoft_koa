import Vue from 'vue'
import Home from './Contact.vue'
import store from '../../store/index'
import lib from '../../utils/lib'

Vue.config.productionTip = false;

Vue.prototype.$echarts = lib.echarts;


new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




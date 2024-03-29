import Vue from 'vue'
import Home from './Contact.vue'
import store from '../../store/index'
import lib from '../../utils/lib'
import ElementUI from 'element-ui'

import echarts from "echarts"

/*---element-ui---*/
Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.$echarts = echarts;

Vue.prototype.$common = lib.common;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




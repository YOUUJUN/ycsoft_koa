import Vue from 'vue'
import Home from './Guide.vue'
import store from '../../store/index'
import lib from '../../utils/lib'

Vue.config.productionTip = false;

Vue.prototype.$axios = lib.axios;
Vue.prototype.$editormd = lib.editormd;
Vue.prototype.$common = lib.common;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




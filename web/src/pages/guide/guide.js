import Vue from 'vue'
import Home from './Guide.vue'
import store from '../../store/index'
import lib from '../../utils/lib'

Vue.config.productionTip = false;

Vue.prototype.$axios = lib.axios;
Vue.prototype.$editormd = lib.editormd;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




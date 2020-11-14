import Vue from 'vue'
import Home from './Community.vue'
import store from '../../store/index'
import lib from '../../utils/lib'
import VueCookies from 'vue-cookies'
import ElementUI from 'element-ui'
Vue.use(VueCookies);

/*---element-ui---*/
Vue.use(ElementUI);

// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Button);

Vue.prototype.$common = lib.common;

Vue.config.productionTip = false;

Vue.prototype.$axios = lib.axios;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




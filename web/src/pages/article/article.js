import Vue from 'vue'
import Home from './Article.vue'
import store from '../../store/index'
import lib from '../../utils/lib'
import ElementUI from 'element-ui'
// import {Dropdown,DropdownMenu,DropdownItem,Button} from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

/*---element-ui---*/
Vue.use(ElementUI);

// Vue.use(Dropdown);
// Vue.use(DropdownMenu);
// Vue.use(DropdownItem);
// Vue.use(Button);

let bus = new Vue;
Vue.prototype.$bus = bus;

Vue.config.productionTip = false;

Vue.prototype.$axios = lib.axios;

new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




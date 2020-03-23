import Vue from 'vue'
import index from './Index.vue'
import store from '../../store/index'
import lib from '../../utils/lib'

Vue.config.productionTip = false;

Vue.prototype.$common = lib.common;

new Vue({
    store,
    render: h => h(index)
}).$mount('#app');








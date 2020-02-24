import Vue from 'vue'
import Home from './Home.vue'
import store from '../../store/index'
import lib from '../../utils/lib'

Vue.config.productionTip = false;



new Vue({
  store,
  render: h => h(Home)
}).$mount('#app');




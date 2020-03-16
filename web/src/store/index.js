import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged : false

  },
  mutations: {
    changeLogStatus(state, status){
      state.logged = status;
    },

    getUserInfo (){
      let userData = window.localStorage.getItem("userData");
      userData = JSON.parse(userData);
      return userData;
    }

  },
  actions: {


  },
  modules: {




  }
})

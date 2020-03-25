import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let vm = new Vue;

export default new Vuex.Store({
  state: {
    logged : false,

    navigationList : [
      {
        name : "首页",
        href : "/",
      },
      {
        name : "产品与服务",
        href : "/products",
      },
      {
        name : "开发文档",
        href : "/guide",
      },
      {
        name : "联系我们",
        href : "/contact",
      },
      {
        name : "开发平台",
        href : "http://erp.bfcgj.com/login.html",
        target : "_blank"
      },
      {
        name : "社区",
        href : "/community"
      }
    ]

  },
  mutations: {
    changeLogStatus(state, status){
      vm.$set(state,"logged",status);
    },

    upDateNavigationIndex (state,payload){
      let naviArr = state.navigationList;

      if(payload == "/personal"){
        payload = "/community";
      }

      for(let item of naviArr){
        console.log("payload",payload,item.href);
        if(payload == item.href){
          item.active = "nav-current";
        }
      }

      state.navigationList = naviArr;

    }
  },
  actions: {


  },
  modules: {




  }
})

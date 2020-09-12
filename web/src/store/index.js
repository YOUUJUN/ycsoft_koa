import Vue from 'vue'
import Vuex from 'vuex'

import lib from '../utils/lib';
Vue.use(Vuex);

Vue.prototype.$axios = lib.axios;

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
        name : "产品与解决方案",
        href : "/products",
      },
      {
        name : "合作案例",
        href : "/cases",
      },
      {
        name : "云开发平台",
        href : "http://erp.bfcgj.com/login.html",
        target : "_blank"
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
        name : "社区",
        href : "/community"
      }
    ],


    productsList : [
      {
        type : "企业ERP管理系统",
        name : "农机报废管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        Introduction : "",
        images : ["/images/template/njbf/login.png","/images/template/njbf/content.png"],
        media : {
          type : "video",
          poster : "/images/template/njbf/login.png",
          url : "/videos/njbfys.webm"
        },
        addressUrl : "/"
      },
      {
        type : "企业ERP管理系统",
        name : "报废车管家ERP管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/bfcgj/index.png","/images/template/bfcgj/content.png","/images/template/bfcgj/login.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "企业ERP管理系统",
        name : "报废车管家-回收流程介绍",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        detailUrl : "/products/details",
        addressUrl : "/"
      },
      {
        type : "企业ERP管理系统",
        name : "报废车管家-财务系统介绍",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        detailUrl : "/products/details",
        addressUrl : "/"
      },
      {
        type : "组件可视化云开发平台",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        detailUrl : "",
        addressUrl : "/"
      },
      {
        type : "玉成软件ORM系统",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo2.png","/images/template/platform-demo2.png"],
        detailUrl : "",
        addressUrl : "/"
      },
      {
        type : "玉成软件ORM系统",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo2.png"],
        detailUrl : "",
        addressUrl : "/"
      },
      {
        type : "数据可视化",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png"],
        detailUrl : "",
        addressUrl : "/"
      },
      {
        type : "数据可视化",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        detailUrl : "",
        addressUrl : "/"
      },
      {
        type : "企业ERP解决方案",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        detailUrl : "",
        addressUrl : "/"
      },
      {
        type : "企业ERP解决方案",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        detailUrl : "",
        addressUrl : "/"
      },
      {
        type : "企业ERP解决方案",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        detailUrl : "",
        addressUrl : "/"
      }
    ],

    casesList : [
      {
        name : "北京汽车解体厂",
        url : "http://www.jtc.cn/",
        image : "/images/case/bg.jpg"
      },
      {
        name : "北京汽车解体厂",
        url : "http://www.jtc.cn/",
        image : "/images/case/bg.jpg"
      },
      {
        name : "北京汽车解体厂",
        url : "http://www.jtc.cn/",
        image : "/images/case/bg.jpg"
      },
      {
        name : "北京汽车解体厂",
        url : "http://www.jtc.cn/",
        image : "/images/case/bg.jpg"
      },
      {
        name : "北京汽车解体厂",
        url : "http://www.jtc.cn/",
        image : "/images/case/bg.jpg"
      },
      {
        name : "北京汽车解体厂",
        url : "http://www.jtc.cn/",
        image : "/images/case/bg.jpg"
      },
      {
        name : "北京汽车解体厂",
        url : "http://www.jtc.cn/",
        image : "/images/case/bg.jpg"
      },
      {
        name : "北京汽车解体厂",
        url : "http://www.jtc.cn/",
        image : "/images/case/bg.jpg"
      }
    ]

  },

  getters : {

    getProductByName : (state) => (name) =>{
      let obj = state.productsList.filter((currentValue, index, arr)=>{
        return  currentValue["name"] === name
      })

      return obj;

    }
  },

  mutations: {
    changeLogStatus(state, status){
      vm.$set(state,"logged",status);
    },

    upDateNavigationIndex (state,payload){
      let naviArr = state.navigationList;
      if(payload == "/personal" || payload == "/topics" || payload == "/users" || payload == "/topicList" || payload == "/editor"){
        payload = "/community";
      }

      for(let item of naviArr){
        if(payload == item.href){
          item.active = "nav-current";
        }
      }

      state.navigationList = naviArr;

    },



  },
  actions: {

    getUserLogStatus (){
      vm.$axios({
        method : "post",
        url : "verifyToken"
      }).then(value =>{
        console.log("value ====-====",value);
        this.commit("changeLogStatus",value.data.logged);
      }).catch(err => {
        console.log(err);
      })
    }

  },
  modules: {




  }
})

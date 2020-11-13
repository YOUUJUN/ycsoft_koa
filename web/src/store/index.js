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
        name : "产品与平台",
        href : "/products",
      },
      {
        name : "解决方案",
        href : "/solutions",
      },
      {
        name : "合作案例",
        href : "/cases",
      },
      {
        name : "联系我们",
        href : "/contact",
      },
      {
        name : "开发文档",
        href : "/guide",
      },
      {
        name : "社区",
        href : "/community"
      },
      {
        name : "云开发平台",
        href : "http://erp.bfcgj.com/login.html",
        target : "_blank"
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
    ],

    solutionList : [
      {
        name : "购物商场网站",
        name_en : "WEB ONLINE MALL",
        icon : "/images/index/icon1.png",
        tips : "11111111111111111针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 ",
        title : "高端定制网站",
        content:"针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 "
      },
      {
        name : "报废车管家解决方案",
        name_en : "WEB ONLINE MALL",
        icon : "/images/index/icon2.png",
        tips : "22222222222222222222222针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 ",
        title : "报废车管家解决方案",
        content:"2222222222222222222222222222222222222据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 "
      },
      {
        name : "企业ERP解决方案",
        name_en : "WEB ONLINE MALL",
        icon : "/images/index/icon3.png",
        tips : "3333333333333333333333针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 ",
        title : "企业ERP解决方案",
        content:"333333333333333333333333333333333333333333333宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 "
      },
      {
        name : "购物商场网站",
        name_en : "WEB ONLINE MALL",
        icon : "/images/index/icon4.png",
        tips : "444444444444444444444444444针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 ",
        title : "高端定制网站",
        content:"4444444444444444444444444444444444企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 "
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

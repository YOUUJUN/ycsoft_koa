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
        name : "关于我们",
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
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "企业ERP管理系统",
        name : "报废车管家-财务系统介绍",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "组件可视化云开发平台",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "玉成软件ORM系统",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo2.png","/images/template/platform-demo2.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "玉成软件ORM系统",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo2.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "数据可视化",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "数据可视化",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "企业ERP解决方案",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "企业ERP解决方案",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
        addressUrl : "/"
      },
      {
        type : "企业ERP解决方案",
        name : "商家管理系统",
        document : "该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作 ",
        images : ["/images/template/platform-demo1.png","/images/template/platform-demo1.png"],
        media : {
          type : "image",
          url : "/images/template/bfcgj/index.png"
        },
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
        name : "报废车企业信息化解决方案",
        name_en : "BAOFEICHEGUANJIA",
        icon : "/images/index/icon1.png",
        tips : "报废车行业是一个十分特殊的行业，目前普遍没有任何规范化的管理标准，加上大多数规模偏小，信息化程度低，如何提升企业附加值，提升企业经济效益，降低管理成本，一直是个十分困难的问题。我司针对不同的企业需求，推出的三种解决方案...",
        title : "报废车企业信息化解决方案",
        content: "# 报废车企业信息化解决方案\n" +
            "### 1. 项目背景\n" +
            "报废车行业是一个十分特殊的行业，目前普遍没有任何规范化的管理标准，加上大多数规模偏小，信息化程度低，如何提升企业附加值，提升企业经济效益，降低管理成本，一直是个十分困难的问题。\n" +
            "国内报废车企业实行资质管理，虽然资质已经完全放开，但准入门槛越来越高，特别是行业主管部门、环保部门、车辆管理部门都有一些特殊的监管要求，需要填报的信息非常多，企业需要投入大量的人力物力才能完成，造成企业管理成本居高不下。\n" +
            "根据《报废机动车回收管理办法》（2019国务院第715号令）以及最新的《报废机动车回收拆解企业技术规范》，《中华人民共和国固体废物污染环境防治法 》等法律法规要求，报废机动车回收拆解企业需要对报废车总成件、回用件以及危废物需要进行溯源管理和流向追踪，信息化管理已经成为必备的硬件条件；\n" +
            "### 2. 主要产品（SaaS）\n" +
            "《报废车管家》是我公司专注于该行业10多年不断研发、完善和升级，期间参观过欧美、澳洲、日本等先进的和成熟的企业经营管理经验和信息化管理解决方案，结合国家行业主管部门的监管要求以及玉成有限公司所属20多家报废车、再制造等子公司多年的标准化管理实战经验，而精心制作的。系统使用流程化管理，对回收、信息录入、现场管理、拆解、销售、库存、回用件溯源、危废物管理等进行一体化管理，同时实现了线上线下相结合的管理模式。由于大量采用AI人工智能识别技术，一次录入，随处使用，结合现场手机APP、平板、扫码等智能终端管理和流程化推送等技术手段，大幅度提高了员工的工作效率，降低了管理成本，提高了回用件再利用率水平，提升了经济附加值和企业效益，也满足了国家行业主管部门对行业监管的要求。\n" +
            "针对不同的企业需求，推出的三种解决方案：\n" +
            "#### 基础版：\n" +
            "包括PC端和APP，实现报废车回收、信息快速录入、拍照和扫码、与商务部门、车管部门的信息转递（制挡、注销和监销的事务跟踪、拍照、打印等），毁性直至拆解完成，车辆款项（残值款、运费等）的应付、未付的跟踪管理；\n" +
            "#### 标准版：\n" +
            "在基础版本的基础上，增减采购管理、销售管理、现场管理、库存管理、业务收付款、绩效考核、业务报表等功能；\n" +
            "#### 专业版：\n" +
            "在标准版的基础上，增加标准的财务系统功能（包括总账、固定资产、出纳系统、智能化财务报表）、成本核算（完全自动化），完全财务业务一体化管理；"
      },
      {
        name : "财务业务一体化解决方案",
        name_en : "CAIWUYEWUYITIHUA",
        icon : "/images/index/icon2.png",
        tips : "面向众多行业企业不同管理系统形成的信息孤岛，与财务系统不能完全集成，或原有的业务系统虽然存在财务系统但难以做到财务和业务系统的信息集成，依托我公司标准化的财务系统和接口系统，建立数据发现和映射机制，使财务系统中的“凭证探测器”能够实时自动搜索业务系统形成的各种表单（如销售单、采购单、借款还款、费用报销等等）。根据企业具体核算形式和核算内容，制定业务适配规则。基于松耦合集成原则，形成完整的业务逻辑信息闭环，自动创建会计凭证。业务人员不需要处理任何与财务相关的问题，只需熟悉自己的业务，即可熟练使用信息化系统，极大降低了信息化系统的使用难度，简捷高效。传统那种ERP信息化系统的使用，“上了贼船”的负担，将不复存在。",
        title : "报废车管家解决方案",
        content:"# 财务业务一体化解决方案\n" +
            "## 一体化策略\n" +
            "面向众多行业企业不同管理系统形成的信息孤岛，与财务系统不能完全集成，或原有的业务系统虽然存在财务系统但难以做到财务和业务系统的信息集成，依托我公司标准化的财务系统和接口系统，建立数据发现和映射机制，使财务系统中的“凭证探测器”能够实时自动搜索业务系统形成的各种表单（如销售单、采购单、借款还款、费用报销等等）。根据企业具体核算形式和核算内容，制定业务适配规则。基于松耦合集成原则，形成完整的业务逻辑信息闭环，自动创建会计凭证。在此基础上，可以实现完整的成本核算系统（比如间接费用的归集和分配），按收入与成本匹配原则，自动归集当月销售成本，大幅度降低财务核算的工作量和工作强度，实现智能化、自动化管理，同时提升信息的完整性、可靠性；\n" +
            "## 业务逻辑追溯\n" +
            "基于业务规则、松耦合的一体化管理方案，业务逻辑追溯充分运用人工智能方法，可以分析每份会计凭证是否存在足够的业务单据的数据支持，核算内容是否正确，并提示验证结果信息，以便审计核查和监控；\n" +
            "## 松耦合集成\n" +
            "是指财务和业务单据之间的管理不是象传统会计软件那样所谓的“无缝链接”，而是一种松散链接、紧密集成的实现策略，比如通过“凭证探测器”创建的会计凭证，可以删除、修改；但一旦会计凭证被删除，财务与业务系统的单据就会自动解耦，可以重新再次创建（可以一对一、一对多）。会计凭证关联的单据也可以移除（自动解绑）。这种方式，可以确保业务系统单据必须被入账且只入一次账，以确保数据的完整性。基于验证规则，不论是手工创建的会计凭证还是自动创建、修改的会计凭证的效果都是一样的，业务逻辑追溯功能一样可以进行分析，并得出结论。比如，报销单据费用1000元，但实际入账误为10000元，这种类似错误，即使面对海量的数据，在业务逻辑追溯的这种智能化监控分析下，也会无所遁形。松耦合提高了系统的灵活性，更强调业务数据逻辑的完整性和一致性，完全分离了财务系统和业务系统在传统所谓“无缝链接”带来的种种弊端，使得各系统相互独立却又能相互集成，业务人员不需要处理任何与财务相关的问题，只需熟悉自己的业务，即可熟练使用信息化系统，极大降低了信息化系统的使用难度，简捷高效。传统那种ERP信息化系统的使用，“上了贼船”的负担，将不复存在。\n" +
            "## 主要产品（SaaS）\n" +
            "### 基础版：\n" +
            "面向小微型企业、记账代理公司推出的，在线云端解决方案，包括财务总账、固定资产、出纳管理、智能化财务报表等功能；\n" +
            "### 标准版：\n" +
            "面向大中型企业推出的，包括财务总账、项目核算、固定资产、出纳管理、智能化财务报表、自定义报表等功能，提供财务业务接口方案和业务逻辑追溯功能，与已经存在的业务系统（也可以定制开发）进行数据整合和集成，防止信息孤岛，做到财务业务一体化管理；\n" +
            "### 集团版：\n" +
            "面向集团型企业推出的，包括财务总账、项目核算、固定资产、出纳管理、智能化财务报表、合并会计报表、自定义报表等功能，提供财务业务接口方案和业务逻辑追溯功能，与已经存在的业务系统（也可以定制开发）进行数据整合和集成，防止信息孤岛，做到集团化的财务业务一体化管理；"
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
      },
      {
        name : "企业ERP解决方案",
        name_en : "WEB ONLINE MALL",
        icon : "/images/index/icon3.png",
        tips : "3333333333333333333333针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 ",
        title : "企业ERP解决方案",
        content:"333333333333333333333333333333333333333333333宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 针对企业进行重新策划、方案书写、重新设计、重新功能开发的网站制作，说的简单一点，就是根据企业的产品特点、宣传推广量身订做网站定制网站区别于模板网站与套餐网站。 "
      }
    ],

    contactImgList : [
      // {
      //   name : '',
      //   path : '/images/contact/item1.jpg'
      // },
      // {
      //   name : '',
      //   path : '/images/contact/item2.jpg'
      // },
      {
        name : '',
        path : '/images/contact/item3.jpg'
      },
      {
        name : '',
        path : '/images/contact/item4.jpg'
      },
      {
        name : '',
        path : '/images/contact/item5.jpg'
      },
      {
        name : '',
        path : '/images/contact/item6.jpg'
      },
      {
        name : '',
        path : '/images/contact/item7.jpg'
      },
      {
        name : '',
        path : '/images/contact/item8.jpg'
      },
      {
        name : '',
        path : '/images/contact/item9.jpg'
      },
      {
        name : '',
        path : '/images/contact/item10.jpg'
      }
    ]

  },

  getters : {

    getProductByName : (state) => (name) =>{
      let obj = state.productsList.filter((currentValue, index, arr)=>{
        return  currentValue["name"] === name
      })

      return obj;

    },

    getLogStatus : (state) => () =>{
      return state.logged;
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

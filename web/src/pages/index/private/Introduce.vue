<template>

    <article class="body">
<!--        <button v-on:click="show = !show">-->
<!--            Toggle-->
<!--        </button>-->

        <section class="product-container">

            <div class="container">
                <div class="area cols-12">

                    <h2>核心产品与咨询服务</h2>

                    <div class="document wow zoomIn" style="margin-bottom: 0;">
                        <span>核心产品，必是精品。融合Al识别，基于业务规则抽象+人工智能化分析</span>
                        <span>复杂的事情且简单，传统方式不可行的事情变得可行，一切就是那么简单...</span>
                    </div>


                    <div class="panel-body" style="margin-top: 0;">

                        <div class="product-nav">

                            <ul class="menu" ref="productMenu">
                                <li v-for="(item, index) in products"  v-on:mouseenter="startAnimation(item, index, $event)" v-on:mouseleave="endAnimation($event)">
                                    <a v-bind:href="item.href">{{item.name}}</a><span class="ribbon"></span>
                                </li>

                                <li>
                                    <el-button  size="medium" @click="goTo('/products', 'location')">更多产品<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
                                </li>
                            </ul>

                        </div>

                        <div class="container product-content">

                            <div class="area cols-3" style="padding:0;">

                                <aside class="product-aside">

                                    <div class="wow lightSpeedIn">
                                        <h3>{{productRender.name}}</h3>

                                        <p>{{productRender.introduction}}</p>

                                        <el-button round @click="goTo('/products/details/'.concat(productRender.name), 'location')">更多详情</el-button>
                                    </div>


                                </aside>

                            </div>

                            <div class="area cols-9" style="padding:0;">

                                <article class="product-article">


                                </article>

                            </div>

                        </div>

                    </div>




                    <!--<div class="container panel-body">

                        <div class="area cols-6 ic-panel" style="text-align: center">
                            <img  class="ic-1-cone wow fadeInLeft" src="/images/template/ic-cone.svg" alt="cone" style="left:0;">
                            <img class="ic-0 wow lightSpeedIn" src="/images/showimg1.png">
                        </div>

                        <div class="area cols-6" style="overflow: hidden;">
                            <div class="detail-doc wow fadeInRight">
                                <h2>
                                    <span style="color:#248aff;">企业软件</span>，稳定高效
                                </h2>
                                <p>专注于企业管理软件、ERP管理软件软件开发、实施；参与和主导国家商务部、发改委、农业部、中国汽车技术研究中心的多个大型的软件项目设计和开发，拥有一支实力雄厚的软件设计、开发和实施经验的技术团队</p>

                                <el-button round @click="goTo('http://dev.bfcgj.com/login.html')">更多详情</el-button>



                            </div>
                        </div>

                    </div>-->



                </div>
            </div>

        </section>


        <section class="solution-container">

            <h2 data-v-3aad87a2="">创新方案 集成 智能</h2>

            <div class="document wow zoomIn">
<!--                <span>Yckjsoft致力于<b class="txt-target">平台性软件PaaS</b></span>-->
                <span>专注财务与业务信息化集成解决方案20多年，本着智能、简捷、高效、实用的原则，深入本质</span>
                <span>创新方案：松耦合、紧集成，真正可分可、合、可正可逆，高度智能化特点...</span>
            </div>

            <div class="container">

                <div class="area cols-3">

                    <ul class="product-list wow fadeInLeft animated" ref="list">

                        <li class="list-item" v-for="(item,index) of solutionList" v-on:mouseenter="actSolution(item,index, $event)">

                            <img class="item-icon" v-bind:src="item.icon">

                            <div class="item-title">
                                <p class="ch">{{item.title}}</p>
                                <span>{{item.name_en}}</span>
                            </div>

                        </li>

                    </ul>

                </div>

                <div class="area cols-9">

                    <div class="solution-panel wow fadeInRight animated">


                        <div class="solution-doc wow bounceInUp animated"  ref="doc">

                            <h4 class="doc-title">{{showContent.name}}</h4>

                            <p class="doc-content">
                                {{showContent.tips}}
                            </p>

                            <el-button size="small" style="background: none;color:#fff;" @click="goTo('/solutions','location')">查看详情</el-button>

                        </div>



                    </div>

                </div>

            </div>

        </section>


        <section>

            <h2>PaaS平台 所见即所得</h2>

            <div class="document wow flipInY">
                <span>站在前人的肩膀上，看得更高   创新思维，挑战传统.</span>
                <span>面向业务逻辑、面向切面和面向接口，构件化、松耦合、开放性、拖拽式...</span>
            </div>

            <div class="container panel-body">

                <div class="area cols-6" style="overflow: hidden;">

                    <div class="detail-doc wow fadeInLeft">
                        <h2>
                            页面开发，<span style="color:#248aff;">快速便捷</span>
                        </h2>
                        <p>报废车管家ERP软件。全面兼容office、PDF等办公常用文档，无需下载即可查看编辑。</p>

                        <el-button round @click="goTo('http://dev.bfcgj.com/login.html')">查看详情</el-button>
                    </div>

                </div>

                <div class="area cols-6 ic-panel">

                    <img  class="ic-2-cone wow fadeInRightBig" src="/images/template/ic_cube.svg" alt="cone">
<!--                    <img class="ic-1 wow fadeIn" src="/images/template/platform-demo1.png">-->
                    <img class="ic-1 wow fadeInRight" src="/images/template/bfcgj/content.png">

                </div>

            </div>

        </section>

        <el-divider><i class="el-icon-chat-dot-square"></i></el-divider>

        <section class="panel-container">

            <h2>可视化网站编辑工具可以做的事</h2>

            <div class="document wow zoomIn">
                <span>聚集全网最新鲜的创意，直击用户需求海量优质素材，快速锁定优质商品</span>
            </div>

            <div class="container panel-body">

                <div class="area cols-6 ic-panel">

                    <img  class="ic-1-cone wow fadeInLeftBig" src="/images/template/ic-cone.svg" alt="cone">
                    <img class="ic-1 wow fadeInLeft" src="/images/template/platform-demo1.png">

                </div>

                <div class="area cols-6" style="overflow: hidden;">

                    <div class="detail-doc wow fadeInRight">
                        <h2>
                            <span style="color:#248aff;">项目管理</span>，简单高效
                        </h2>
                        <p>文字/图片/语音/手写/OCR/Markdown等多种形式，随时随地记录你的精彩。全面兼容office、PDF等办公常用文档，无需下载即可查看编辑。</p>
                    </div>

                </div>

            </div>


        </section>


    </article>

</template>

<script>
    const myAnimated = () => import("../../../components/MyAnimated.vue");

    export default {
        name: "Introduce",
        components : {myAnimated},
        data(){
            return {
                show : false,
                productRender : {
                    name : null,
                    introduction : null,
                    media : null
                },
                showContent : {
                    title : null,
                    tips : null,
                    href : null
                }
            }
        },

        methods : {

            startAnimation (item, index, event) {

                let ribbon = event.target.querySelector(".ribbon");
                $(ribbon).stop().css('height','2px');
                $(ribbon).animate({
                    left:'0',
                    width:'100%',
                    right:'0'
                },200,() => {
                    event.target.classList.add("nav-current");
                });

                let menu = this.$refs['productMenu'];
                let childs = menu.querySelectorAll("li");
                childs = Array.prototype.slice.call(childs);
                for(let item of childs){
                    item.classList.remove("nav-current");
                }

                this.actProduct(item, index);
            },
            endAnimation (event){

                let ribbon = event.target.querySelector(".ribbon");
                $(ribbon).stop().animate({
                    left:'50%',
                    width:'0'
                },400);

            },

            initProductNav(){
                let menu = this.$refs['productMenu'];
                let childs = menu.querySelectorAll("li");
                childs = Array.prototype.slice.call(childs);
                childs[0].classList.add('nav-current');
            },

            actProduct(item, index){
                let vm = this;

                vm.productRender = {
                    name : item.name,
                    introduction : item.introduction,
                    media : item.media
                };
            },

            actSolution (item, index){

                let vm = this;
                let shell = vm.$refs['list'];
                for(let item of shell.children){
                    item.classList.remove("active");
                }
                shell.children[index].classList.add("active");

                vm.showContent = {
                    name : item.name,
                    tips : item.tips,
                    href : item.href
                };

                vm.$refs['doc'].style.visibility = 'hidden';
                vm.$refs['doc'].classList.remove('animated', 'bounceInUp');
                setTimeout(() =>{
                    vm.$refs['doc'].style.visibility = 'visible';
                    vm.$refs['doc'].classList.add('animated', 'bounceInUp');
                },40);


            },

            goTo (href, target='__blank'){
                if(target === "location"){
                    location.href=href;
                }else{
                    window.open(href, target);
                }
            },

        },


        computed : {
            solutionList (){
                let data = this.$store.state.solutionList;
                let renderData = data.slice(0, 4);
                return renderData;
            },

            products () {
                let data = this.$store.state.productsList;
                let specific = ['报废车管家','财务管理系统'];
                let renderData = data.filter((item, index, arr)=>{
                    return specific.includes(item.name);
                });
                return renderData;
            }
        },

        mounted() {

            if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
                console.log("new WOW()",new WOW());
                new WOW().init();
            }

            this.initProductNav();
            this.actProduct(this.products[0],0);
            this.actSolution(this.solutionList[0], 0);
        },

        created() {

        }
    }
</script>

<style>

    .el-divider{
        width:1170px;
        margin : 0 auto;
    }

</style>

<style scoped>

    .fadeLeft-enter{
        opacity: 0;
        margin-right: -500px;
    }

    .fadeLeft-enter-to{
        opacity: 1;
        margin-right: 0;
    }

    .fadeLeft-enter-active, .fadeLeft-leave-active {
        transition: all 1s;
    }
    .fadeLeft-leave-to  {
        opacity: 0;
    }


    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.5);
        }
        100% {
            transform: scale(1);
        }
    }


    section{
        margin:45px auto 65px;
    }


    .body{
        text-align: center;
        background-color: #fff;
        overflow: hidden;
    }

    .body h2{
        color: #009fb3;
        margin: 20px 0 20px 0;
    }

    .product-container{
        overflow: hidden;
    }

    .img-box{
        max-width: 400px;
        margin:0 auto;
        border: 0;
    }

    .img-box img{
        width: 400px;
        height: 290px;
    }

    .split{
        border-bottom: 1px solid rgba(0,0,0,0.1);
        margin: 60px 0;
    }

    .document{
        margin-bottom: 30px;
    }

    .document span{
        display: block;
        font: 14px/24px Arial, Helvetica, sans-serif;
        color: #a1a1a1;
    }

    @media(max-width: 767px) {
        .body{
            padding: 10px;
        }
    }


    /*--product container--*/

    .product-content{
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .product-nav{
        text-align: right;
        margin:8px 0;
    }


    .product-aside{
        padding: 80px 10px 0;
        height: 360px;
        background-image: url("/images/index/product_bg3.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .product-aside h3{
        text-align: center;
        color: rgba(0,0,0,0.7);
        font-size: 27px;
    }

    .product-aside p {
        color: rgba(0,0,0,0.6);
        font-size: 14px;
        margin-bottom: 30px;
    }

    .product-article{
        background: #f5f7fa;
        height: 100%;
        padding:50px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .menu{
        display: inline-block;
        height: 46px;
        padding:0;
        padding-bottom: 2px;
        margin:0;
    }

    .menu li{
        list-style:none;
        display:inline-block;
        position:relative;
        margin-right: 5px;
    }

    .menu li:after{
        border-bottom:2px solid #e67e22;
        margin-bottom:-2px;
    }



    .menu li a{
        font-family: Libre Baskerville;
        color: rgba(0,0,0,0.5);
        font-size:15px;
        font-weight:400;
        line-height:40px;
        display:block;
        padding: 0 15px;
        text-decoration:none;
        cursor:pointer;
    }

    .menu li a:hover{
        color: #409eff;
        outline: none;
    }

    #main-menu{
        overflow:hidden;
    }

    .nav-current {
        border-bottom: 2px solid #409eff;
    }

    .ribbon{
        display:block;
        position:absolute;
        background:#409eff;
        top:40px;
        left:50%;
    }



    /*------*/

    .panel-body{
        margin-top: 55px;
    }

    .ic-panel{
        position: relative;
        text-align: left;
    }

    .ic-1-cone{
        position: absolute;
        width: 150px;
        height: auto;
        left: -90px;
        top: -55px;
    }

    .ic-2-cone{
        position: absolute;
        width: 150px;
        height: auto;
        right: -20px;
        top: -55px;
    }

    .ic-0{
        width: 360px;
        margin-bottom: 45px;
    }

    .ic-1{
        width: 480px;
        margin-bottom: 45px;
        box-shadow: 10px 10px 20px rgba(104, 151, 221, 0.16), 0 3px 6px rgba(61, 198, 202, 0.16);
    }

    .detail-doc{
        padding-top: 30px;
        text-align: center;
    }

    .detail-doc h2 {
        display: inline-block;
        font-weight: 500;
        font-size: 36px;
        color: #333333;
        line-height: 62px;
        width: 450px;
        margin:0;
    }

    .detail-doc p {
        font-size: 16px;
        line-height: 28px;
        text-align: justify;
        color: #666666;
        margin:20px 0;
    }



    /*---product container---*/

    .solution-container{
        background: #f5f8f6;
        padding: 30px 0;
    }

    .solution-container .cols-3{
        padding-right: 0;
        border-right: none;
    }

    .solution-container .cols-9{
        padding-left: 0;
        border-left: none;
    }

    .solution-container h2{
        color:#21cd97;
        margin-top:0;
    }

    .list-item{
        padding: 40px 0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        transition: background .4s;
    }

    .list-item.active{
        background: #21cd97;
    }

    .list-item.active p, .list-item.active span{
        color:#fff !important;
    }

    .list-item .item-icon{
        float:left;
        width : 50px;
        margin-left:10px;
        vertical-align: middle;
    }

    .item-title{
        display: inline-block;
        margin-left: 5px;
        vertical-align: middle;
    }

    .item-title p{
        font-size: 16px;
        color: #2a333c;
    }

    /*--right--*/

    .solution-panel{
        background-image: url("/images/index/product_bg.jpg");
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;
        text-align: left;
        padding:55px 35px;
        box-sizing: border-box;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .solution-doc{
        color:#ffff;
        transition: all .2s;
    }

    .doc-title{
        font-size: 26px;
    }

    .doc-content{
        font-size: 14px;
        line-height: 2;
        margin:20px 0 35px;
        white-space: break-spaces;
    }


</style>

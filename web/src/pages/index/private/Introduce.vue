<template>

    <article class="body">
<!--        <button v-on:click="show = !show">-->
<!--            Toggle-->
<!--        </button>-->

        <section class="body-container">

            <div class="container">
                <div class="area cols-12">

                    <h2>可视化网站编辑工具预览</h2>

                    <div class="document wow zoomIn">
                        <span>快速构建自适应页面，便捷绑定交互数据</span>
                    </div>

                    <div class="container panel-body">

                        <div class="area cols-6 ic-panel" style="text-align: center">

                            <img  class="ic-1-cone wow fadeInLeft" src="/images/template/ic-cone.svg" alt="cone" style="left:0;">
                            <img class="ic-0 wow lightSpeedIn" src="/images/showimg1.png">

                        </div>

                        <div class="area cols-6" style="overflow: hidden;">

                            <div class="detail-doc wow fadeInRight">
                                <h2>
                                    <span style="color:#248aff;">页面构建</span>，高效快速
                                </h2>
                                <p>文字/图片/语音/手写/OCR/Markdown等多种形式，随时随地记录你的精彩。全面兼容office、PDF等办公常用文档，无需下载即可查看编辑。</p>

                                <el-button round @click="goTo('http://dev.bfcgj.com/login.html')">立即体验</el-button>
                            </div>

                        </div>

                    </div>

<!--                    <div class="img-box">-->

<!--                        <img class="wow lightSpeedIn" src="images/showimg1.png">-->

<!--                    </div>-->


                    <!--                <el-divider><i class="el-icon-cpu"></i></el-divider>-->

                </div>
            </div>

        </section>


        <section class="product-container">

            <h2 data-v-3aad87a2="">高效方案 赋能企业</h2>

            <div class="document wow zoomIn">
                <span>Yckjsoft致力于<b class="txt-target">平台性软件PaaS</b></span>
            </div>

            <div class="container">

                <div class="area cols-3">

                    <ul class="product-list wow fadeInLeft animated" ref="list">

                        <li class="list-item" v-for="(item,index) of solutionList" v-on:mouseenter="actProduct(item,index, $event)">

                            <img class="item-icon" v-bind:src="item.icon">

                            <div class="item-title">
                                <p class="ch">{{item.name}}</p>
                                <span>{{item.name_en}}</span>
                            </div>

                        </li>

                    </ul>

                </div>

                <div class="area cols-9">

                    <div class="product-panel wow fadeInRight animated">


                        <div class="product-doc wow bounceInUp animated">

                            <h4 class="doc-title">{{showContent.title}}</h4>

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

            <h2>产品&&服务</h2>

            <div class="document wow flipInY">
                <span>聚集全网最新鲜的创意，直击用户需求</span>
                <span>海量优质素材，快速锁定优质商品、图片、视频</span>
            </div>

            <div class="container panel-body">

                <div class="area cols-6" style="overflow: hidden;">

                    <div class="detail-doc wow fadeInLeft">
                        <h2>
                            车辆信息，<span style="color:#248aff;">高效记录</span>
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
                            <span style="color:#248aff;">文档管理</span>，高效记录
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
                showContent : {
                    title : null,
                    tips : null,
                    href : null
                }
            }
        },

        methods : {
            actProduct (item, index){

                let vm = this;
                let shell = vm.$refs['list'];
                for(let item of shell.children){
                    item.classList.remove("active");
                }
                shell.children[index].classList.add("active");

                vm.showContent = {
                    title : item.title,
                    tips : item.tips,
                    href : item.href
                }

            },

            goTo (href, target='__blank'){

                if(target === "location"){
                    location.href=href;
                }else{
                    window.open(href, target);
                }
            }
        },


        computed : {
            solutionList (){
                let data = this.$store.state.solutionList;
                let renderData = data.splice(0, 4);
                return renderData;
            }
        },

        mounted() {

            if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
                console.log("new WOW()",new WOW());
                new WOW().init();
            }
            this.actProduct(this.solutionList[0], 0);
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

    .body-container{
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

    .product-container{
        background: #f5f8f6;
        padding: 30px 0;
    }

    .product-container .cols-3{
        padding-right: 0;
        border-right: none;
    }

    .product-container .cols-9{
        padding-left: 0;
        border-left: none;
    }

    .product-container h2{
        color:#21cd97;
        margin-top:0;
    }

    .list-item{
        padding: 30px 0;
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
        width : 60px;
        vertical-align: middle;
    }

    .item-title{
        display: inline-block;
        margin-left: 30px;
        vertical-align: middle;
    }

    .item-title p{
        font-size: 20px;
        color: #2a333c;
    }

    /*--right--*/

    .product-panel{
        background-image: url("/images/index/product_bg.jpg");
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;
        text-align: left;
        padding:70px 35px;
        box-sizing: border-box;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .product-doc{
        color:#ffff;
    }

    .doc-title{
        font-size: 26px;
    }

    .doc-content{
        font-size: 14px;
        line-height: 2;
        margin:20px 0 35px;
    }


</style>

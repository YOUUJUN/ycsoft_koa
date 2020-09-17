<template>

    <div class="body">
<!--        <button v-on:click="show = !show">-->
<!--            Toggle-->
<!--        </button>-->

        <div class="container body-container">
            <div class="area cols-12">

                <h2>可视化网站编辑工具预览</h2>


                <div class="img-box">

                    <img class="wow lightSpeedIn" src="images/showimg1.png">

                </div>



<!--                <div class="split"></div>-->
                <el-divider><i class="el-icon-cpu"></i></el-divider>



                <h2>可视化网站编辑工具可以做的事</h2>

                <div class="document wow zoomIn">
                <span>Yckjsoft致力于<b class="txt-target">平台性软件PaaS</b>、企业管理软件产品和行业应用软件的开发， 并提供完整的行业解决方案和服务支持。一贯坚持以简捷、实用、高效、智能作为设计主导思想和宗旨。 Yckjsoft服务于广大企业用户，通过信息化方案实施， 帮助他们加强财务管理和业务监控，提高工作效率和抵御风险能力。
多年来执著的探索和创新，Yckjsoft建立了以“智能化动态业务模型”为主导的设计思想。 以企业利益最大化为目标，创造性地采用“数据协同”的接口方案， 摒弃了传统管理软件僵化的“无缝链接”，完全符合中国企业复杂多变的业务特点，真正实现了财务业务一体化。  </span>
                </div>

            </div>
        </div>


        <div class="container panel-container">
            <div class="area cols-6 ic-panel">

                <img  class="ic-1-cone wow fadeInLeft" src="/images/template/ic-cone.svg" alt="cone">
                <img class="ic-1 wow fadeIn" src="/images/template/platform-demo1.png">

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


        <div class="container">

            <div class="area cols-12">

                <!--                <div class="split"></div>-->
                <el-divider><i class="el-icon-chat-dot-square"></i></el-divider>


                <h2>高效的网页制作工具</h2>


                <div class="document wow flipInY">
                    <span>聚集全网最新鲜的创意，直击用户需求</span>
                    <span>海量优质素材，快速锁定优质商品、图片、视频</span>
                    <span>发布前内容质量诊断，内容编辑更高效</span>
                </div>

            </div>

        </div>


    </div>

</template>

<script>
    const myAnimated = () => import("../../../components/MyAnimated.vue");

    export default {
        name: "Introduce",
        components : {myAnimated},
        data(){
            return {
                show : false
            }
        },

        mounted() {

            if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
                console.log("new WOW()",new WOW());
                new WOW().init();
            };
        }
    }
</script>

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



    .body{
        text-align: center;
        padding: 26px;
        background-color: #fff;
        overflow: hidden;
    }

    .body h2{
        color: #009fb3;
        margin: 20px 0 40px 0;
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

    .panel-container{
        margin:80px auto;
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

    .ic-1{
        width: 480px;
        margin-bottom: 45px;
        box-shadow: 10px 10px 20px rgba(104, 151, 221, 0.16), 0 3px 6px rgba(61, 198, 202, 0.16);
    }

    .detail-doc{
        padding-top: 30px;
    }

    .detail-doc h2 {
        font-weight: 500;
        font-size: 36px;
        color: #333333;
        padding-bottom: 20px;
        line-height: 62px;
        width: 450px;
        margin:0;
    }

    .detail-doc p {
        font-size: 16px;
        line-height: 28px;
        text-align: justify;
        color: #666666;
    }


</style>

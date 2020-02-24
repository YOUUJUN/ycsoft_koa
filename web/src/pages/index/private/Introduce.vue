<template>

    <div class="body">

        <div class="container">
            <div class="area cols-12">

                <h2>可视化网站编辑工具预览</h2>
                <div class="img-box">
                    <img  src="images/showimg1.png">
                </div>

                <div class="split"></div>

                <h2>可视化网站编辑工具可以做的事</h2>

                <div class="document">
                    <span>Yckjsoft致力于<b class="txt-target">平台性软件PaaS</b>、企业管理软件产品和行业应用软件的开发， 并提供完整的行业解决方案和服务支持。一贯坚持以简捷、实用、高效、智能作为设计主导思想和宗旨。 Yckjsoft服务于广大企业用户，通过信息化方案实施， 帮助他们加强财务管理和业务监控，提高工作效率和抵御风险能力。
多年来执著的探索和创新，Yckjsoft建立了以“智能化动态业务模型”为主导的设计思想。 以企业利益最大化为目标，创造性地采用“数据协同”的接口方案， 摒弃了传统管理软件僵化的“无缝链接”，完全符合中国企业复杂多变的业务特点，真正实现了财务业务一体化。  </span>
                </div>

                <div class="split"></div>

                <h2>高效的网页制作工具</h2>

                <div class="document">
                    <span>聚集全网最新鲜的创意，直击用户需求</span>
                    <span>海量优质素材，快速锁定优质商品、图片、视频</span>
                    <span>发布前内容质量诊断，内容编辑更高效</span>
                </div>


            </div>
        </div>


    </div>

</template>

<script>
    export default {
        name: "Introduce"
    }
</script>

<style scoped>

    .body{
        text-align: center;
        padding: 26px;
        background-color: #fff;
    }

    .body h2{
        color: #009fb3;
        margin: 20px 0 40px 0;
    }

    .img-box{
        max-width: 400px;
        margin:0 auto;
        border: 0;
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

</style>
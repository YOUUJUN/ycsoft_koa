<template>

    <section class="details clearfix">



        <div class="container crumbs-container">
            <div  class="area cols-12">

                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/products' }"><i class="fa fa-reply" style="margin-right:4px;"></i>产品&&方案</el-breadcrumb-item>
                    <el-breadcrumb-item>{{randerData.name}}</el-breadcrumb-item>
                </el-breadcrumb>

            </div>
        </div>

        <article class="container head-container">

            <h1></h1>

            <figure class="area cols-6">

<!--                <img class="showImg" src="/images/product/bfcgj.png">-->
                    <stream-video></stream-video>

            </figure>

            <aside class="area cols-6 introduce">

                <h2>{{randerData.name}}</h2>

                <p>{{randerData.document}}</p>
            </aside>

        </article>


        <article class="container details-container">


            <figure class="area cols-7 details-content">
                <h3 class="details-title">详细信息</h3>
                <img src="/images/product/detailContent.gif" style="width:100%;height:auto">
            </figure>

            <aside class="area cols-4 details-aside">
                <h3 class="details-title">其他信息</h3>

            </aside>


        </article>

    </section>

</template>

<script>
    const streamVideo = () => import("../../../components/StreamVideo.vue");

    export default {
        name: "Details",
        components : {streamVideo},
        data (){
            return {
                productsList : this.$store.state.productsList,
                randerData : {}
            }
        },

        methods : {

        },

        created() {
            var name = this.$route.params.name;
            let item = this.$store.getters.getProductByName(name);
            this.randerData = item[0];
            console.log("randerData ====>",this.randerData);
        }
    }
</script>

<style>
    body {
        background: #fff;
    }
</style>

<style scoped>

    .details{
        background: url("/images/product/bg2.png");
        background-repeat: no-repeat;
        background-origin: content-box;
        background-position: inherit;
        background-size: 100% 100%;
    }

    .showImg{
        width:100%;
        height: auto;
        box-sizing: border-box;
        padding: 20px;
    }

    .introduce{
        padding-left: 40px;
    }

    .crumbs-container{
        margin: 20px auto;
        margin-top: 30px;
    }

    .head-container{
        z-index: 2;
        margin:70px auto;
        margin-top:50px;
    }

    .details-container{
        justify-content: space-between;
    }

    .details-content{
        position: relative;
        z-index: 2;
        margin-bottom: 60px;
    }

    .head-container::before, .details-content::before, .details-aside::before {
        position: absolute;
        left: -20px;
        right:-20px;
        top: -20px;
        bottom: -20px;
        z-index: -1;
        display: block;
        content: '';
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.15);
        background: #fff;
        opacity: .975;
    }


    .details-title {
        display: inline-block;
        margin: 0;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
        width: 100%;
    }

    .details-aside{
        position: relative;
        z-index: 2;
        margin-bottom: 60px;
    }



</style>

<template>

    <section class="details clearfix">



        <div class="container crumbs-container">
            <div  class="area cols-12">

                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/products' }"><i class="fa fa-reply" style="margin-right:4px;"></i>产品&&方案</el-breadcrumb-item>
                    <el-breadcrumb-item>{{renderData.name}}</el-breadcrumb-item>
                </el-breadcrumb>

            </div>
        </div>

        <article class="container head-container">

            <h1></h1>

            <figure class="area cols-6">


                <img v-if="renderData.media.type === `image`" class="showImg" v-bind:src="renderData.media.url">

                <template v-else>
                    <stream-video v-bind:src="renderData.media.url" v-bind:poster="renderData.media.poster"></stream-video>
                </template>


            </figure>

            <aside class="area cols-6 introduce">

                <h2>{{renderData.name}}</h2>

                <el-divider></el-divider>

                <p>{{renderData.introduction}}</p>
            </aside>

        </article>


        <article class="container details-container">


            <figure class="area cols-7 details-content">
                <h3 class="details-title">详细信息</h3>

                <editor-md v-bind:config="config" v-bind:preview="true" v-bind:initData="renderData.document"></editor-md>

            </figure>

            <aside class="area cols-4 details-aside">
                <h3 class="details-title">其他信息</h3>

                <template>
                    <div>
                        <span>青春是一个短暂的美梦, 当你醒来时, 它早已消失无踪</span>
                        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                        <span>少量的邪恶足以抵消全部高贵的品质, 害得人声名狼藉</span>
                    </div>
                </template>

            </aside>


        </article>

        <back-top></back-top>

    </section>

</template>

<script>
    const streamVideo = () => import("../../../components/StreamVideo.vue");
    const editorMd = () => import("../../../components/Mymd.vue");

    export default {
        name: "Details",
        components : {streamVideo, editorMd},
        data (){
            return {
                productsList : this.$store.state.productsList,
                renderData : {}
            }
        },

        methods : {

        },

        created() {
            var name = this.$route.params.name;
            let item = this.$store.getters.getProductByName(name);
            this.renderData = item[0];
            console.log("renderData ====>",this.renderData);
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
        margin-bottom: 60px;
        justify-content: space-between;
    }

    .details-content{
        position: relative;
        z-index: 2;
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
        position: relative;
        display: inline-block;
        margin: 0;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        font-size: 18px;
        width: 100%;
    }

    .details-title::after {
        content: " ";
        height: 2px;
        width: 85px;
        background: #409eff;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 29px;
    }

    .details-aside{
        position: relative;
        z-index: 2;
    }



</style>

<template>

    <section class="details clearfix">

        <article class="container head-container">

            <h1></h1>

            <figure class="area cols-6">

                <img class="showImg" src="/images/product/bfcgj.png">

            </figure>

            <aside class="area cols-6 introduce">

                <h2>报废车管家</h2>

                <p>这是一些介绍这是一些介绍这是一些介绍这是一些介绍这是一些介绍这是一些介绍这是一些介绍</p>
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
    export default {
        name: "Details"
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

    .head-container{
        z-index: 2;
        margin:70px auto;
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

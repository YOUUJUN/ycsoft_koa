<template>

    <div class="banner">

        <div class="container">
            <div class="area cols-md-12 cols-sm-12 cols-xs-12">

                <div class="banner-inner">

                    <h2 class="banner-title">关于我们</h2>

                    <p class="banner-description">专注于软件技术平台（PaaS）、企业管理软件、ERP管理软件和再生行业（主要是报废车、总成再制造、动力电池回收）软件开发、实施</p>

                </div>

            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped>

    .banner{
        background-color: #1accc3;
    }

    .banner-inner {
        max-width: 1200px;
        height: 380px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 4em;
    }

    @media (max-width:767px) {
        .banner-inner {
            padding: 55px 1em;
        }
    }

    .banner-title {
        margin: 0 0 20px;
        color: #fff;
        font-size: 42px;
        line-height: normal;
    }

    .banner-description {
        margin: 0;
        color: #fff;
        font-size: 16px;
    }


</style>

<template>

    <div class="banner">

        <div class="container">
            <div class="area cols-md-12 cols-sm-12 cols-xs-12">

                <div class="banner-inner">

                    <h2 class="banner-title">丰富的企业管理应用参考</h2>

                    <p class="banner-description">企业管理软件私人定制，提供多种企业管理应用支持，基于 GUI 工具快速创建项目，支持风格切换，满足个性化需求</p>

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
        background-color: #6875E9;
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
            padding: 0 1em;
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
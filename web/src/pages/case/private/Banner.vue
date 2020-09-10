<template>

    <div class="banner">

        <div class="container">
            <div class="area cols-md-12 cols-sm-12 cols-xs-12">

                <div class="banner-inner">

                    <h2 class="banner-title">合作案例</h2>

                    <p class="banner-description"> 玉成软件实施企业组网服务，帮助您制定实施组网计划，并完善您的的网络中验证、迁移和集成新的技术，降低成本，让您专注于您的核心业务。</p>

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
        background-color: #00bcd4;
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

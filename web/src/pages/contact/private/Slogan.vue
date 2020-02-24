<template>

    <div class="slogan">

        <div class="container panel-content">
            <div class="area cols-12">

                <h1 class="title">15 天全功能免费试用</h1>
                <p class="desc">0成本体验玉成ERP带来的改变</p>
                <a class="btn link">免费试用</a>

            </div>
        </div>

    </div>
    
</template>

<script>
    export default {
        name: "Slogan",
        methods : {

        }
    }
</script>

<style scoped>

    .slogan{
        background: url(../../../../public/images/trial.jpg) no-repeat;
        background-size: cover;
        background-position: center;
        padding: 70px 0;
    }

    @media (max-width:767px) {
        .slogan{
            padding: 140px 0;
        }
    }

    .area{
        text-align: center;
    }

    .title{
        font-size: 24px;
        margin-top: 0px;
        text-align: center;
        font-weight: 300;
        color: #fff;
        margin-bottom: 20px;
    }

    .desc{
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        width: 80%;
        color: #ffffff;
        margin: 0px auto 10px auto;
    }

    .link{
        background: #1accc3;
        border-color: #1accc3;
        color: #fff;
        border-radius: 3px;
        font-size: 14px;
        height: 35px;
        line-height: 33px;
    }



</style>
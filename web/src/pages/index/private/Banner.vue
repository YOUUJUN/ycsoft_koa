<template>

    <section class="banner">

        <div class="container ">
            <div class="area cols-md-9 cols-md-offset-1">

<!--                <h1 class="banner-title">提供企业在线管理软件（SAAS）服务，快速、简单、可靠的可视化网站构建工具。</h1>-->
                <h1 class="banner-title">创新是引领发展的第一动力<br>面向企业财务核算、财务业务一体化、PaaS云开发平台的人工智能已经到来</h1>
                <h1 class="banner-title"></h1>
                <div>
                    <a class="banner-btn" href="http://dev.bfcgj.com/login.html" target="_blank">开始使用</a>
                    <a class="banner-btn" href="/guide">查看文档</a>
                    <a class="banner-btn" href="/contact">加入我们</a>
                </div>

            </div>
        </div>

        <div class="right-wind"></div>

    </section>

</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped>

    /*.view-area::after{*/
    /*    display: table-cell;*/
    /*    width:100%;*/
    /*}*/

    .banner{
        position: relative;
        background-color: #009fb3;
        padding: 120px 0;
    }

    .banner-title{
        position: relative;
        color: #fff;
        margin: 0 0 35px 0;
        font-size: 55px;
        font-weight: 700;
        text-transform: uppercase;
        text-shadow: 5px 5px #1476A2;
    }

    .banner-btn {
        display: inline-block;
        line-height: 1.25;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        -moz-user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
        border: 2px solid #008ca0;
        transition: all 0.2s ease-in-out;
        background-image: none;
        background-color: transparent;
        padding: 12px 26px;
        margin-right:10px;
        border-radius: 5px;
        font-size: 18px;
        color: white;
        text-transform: uppercase;
        text-decoration: none;
        font-weight: 700;
        letter-spacing: 1px;
    }

    .banner-btn:hover {
        background-color: #fff;
        color: #009fb3;
        text-decoration: none;
    }

    .right-wind {
        position: absolute;
        right: 0;
        top: 0;
        width: 15%;
        height: 100%;
        background-image: linear-gradient(to right,rgba(240,171,0,0.4) 33.33%,rgba(240,171,0,0.7) 33.33%,rgba(240,171,0,0.7) 66.66%,#f0ab00 66.66%);
    }

    @media(max-width: 767px) {
        .banner{
            padding: 70px 0;
        }
        .banner-title{
            font-size: 23px;
        }

        .banner-btn{
            padding: 6px 14px;
            font-size: 13px;
            margin-top:8px;
        }
    }



</style>

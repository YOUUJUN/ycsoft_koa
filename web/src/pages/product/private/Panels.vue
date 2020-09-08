<template>


    <div class="panel">

        <div class="container">
            <div class="area cols-md-6">
                <div data-category="backstage" class="scaffold-item-link">

                    <div class="scaffold-item">

                        <img class="scaffold-thumbnail float-middle" src="/images/template/platform-demo2.png">

                    </div>

                    <div class="scaffold-info">

                        <div class="scaffold-info-title">
                            商家管理系统
                        </div>

                        <div class="scaffold-info-desc">
                            该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作
                        </div>

                    </div>

                    <div class="scaffold-item-action">

                        <a class="scaffold-item-button"><i class="fa fa-eye"></i>详情介绍</a>
                        <a class="scaffold-item-button"><i class="fa fa-edit"></i>项目地址</a>

                    </div>

                </div>
            </div>

            <div class="area cols-md-6">
                <div data-category="backstage" class="scaffold-item-link">

                    <div class="scaffold-item">

                        <img class="scaffold-thumbnail float-middle" src="/images/template/platform-demo2.png">

                    </div>

                    <div class="scaffold-info">

                        <div class="scaffold-info-title">
                            商家管理系统
                        </div>

                        <div class="scaffold-info-desc">
                            该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作
                        </div>

                    </div>

                    <div class="scaffold-item-action">

                        <a class="scaffold-item-button"><i class="fa fa-eye"></i>详情介绍</a>
                        <a class="scaffold-item-button"><i class="fa fa-edit"></i>项目地址</a>

                    </div>

                </div>
            </div>

            <div class="area cols-md-6">
                <div data-category="backstage" class="scaffold-item-link">

                    <div class="scaffold-item">

                        <img class="scaffold-thumbnail float-middle" src="/images/template/platform-demo2.png">

                    </div>

                    <div class="scaffold-info">

                        <div class="scaffold-info-title">
                            商家管理系统
                        </div>

                        <div class="scaffold-info-desc">
                            该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作
                        </div>

                    </div>

                    <div class="scaffold-item-action">

                        <a class="scaffold-item-button"><i class="fa fa-eye"></i>详情介绍</a>
                        <a class="scaffold-item-button"><i class="fa fa-edit"></i>项目地址</a>

                    </div>

                </div>
            </div>

            <div class="area cols-md-6">
                <div data-category="backstage" class="scaffold-item-link">

                    <div class="scaffold-item">

                        <img class="scaffold-thumbnail float-middle" src="/images/template/platform-demo2.png">

                    </div>

                    <div class="scaffold-info">

                        <div class="scaffold-info-title">
                            商家管理系统
                        </div>

                        <div class="scaffold-info-desc">
                            该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作
                        </div>

                    </div>

                    <div class="scaffold-item-action">

                        <a class="scaffold-item-button"><i class="fa fa-eye"></i>详情介绍</a>
                        <a class="scaffold-item-button"><i class="fa fa-edit"></i>项目地址</a>

                    </div>

                </div>
            </div>

            <div class="area cols-md-6">
                <div data-category="backstage" class="scaffold-item-link">

                    <div class="scaffold-item">

                        <img class="scaffold-thumbnail float-middle" src="/images/template/platform-demo2.png">

                    </div>

                    <div class="scaffold-info">

                        <div class="scaffold-info-title">
                            商家管理系统
                        </div>

                        <div class="scaffold-info-desc">
                            该模板适用于商家类管理后台，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作
                        </div>

                    </div>

                    <div class="scaffold-item-action">

                        <a class="scaffold-item-button"><i class="fa fa-eye"></i>详情介绍</a>
                        <a class="scaffold-item-button"><i class="fa fa-edit"></i>项目地址</a>

                    </div>

                </div>
            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "Panels"
    }
</script>

<style scoped>

    .panel{
        background-color: #fff;
    }

    .scaffold-item-link{
        position: relative;
        display: block;
        transition: transform .3s ease;
        box-shadow: 0 8px 24px rgba(163,177,191,.35);
        background: #fafafa;
        margin-bottom: 40px;
        overflow: hidden;
    }

    .scaffold-item-link:hover{
        -ms-transform: translateY(-2%);
        transform: translateY(-2%);
    }

    .scaffold-item-link:hover .scaffold-item-action{
        -ms-transform: translateY(0);
        transform: translateY(0);
    }

    .scaffold-item-link:hover .scaffold-info{
        -ms-transform: translateY(-20%);
        transform: translateY(-20%);
    }

    .scaffold-item{
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        justify-content: center;
        height:280px;
    }


    .scaffold-thumbnail{
        display: block;
        width: 100%;
        height: auto;
        border-radius: 4px;
        transition: margin-top .3s ease;
    }

    .float-middle{
        transform: scale(0.6);
    }

    .float-bottom{
        transform: scale(0.6);
        position: absolute;
        bottom: -20%;
        right: -10%;
        z-index: 1;
    }

    .float-left{
        transform: scale(0.5);
        position: absolute;
        bottom: -5%;
        right: 20%;
    }

    .float-right{
        transform: scale(0.5);
        position: absolute;
        bottom: -5%;
        right: -20%;
    }

    .float-up{
        transform: scale(0.6);
        position: relative;
        z-index: 9;
        box-shadow: rgb(139, 133, 133) 0px 0px 30px;
        bottom: 0;
        right: 0;
    }

    .scaffold-info{
        position: relative;
        background: 0 0;
        text-align: center;
        padding: 20px 40px;
        transition: transform .3s ease;
        -ms-transform: translateY(0);
        transform: translateY(0);
        z-index: 9;
    }

    .scaffold-info-title{
        margin-top: 14px;
        font-size: 14px;
        font-weight: 700;
        color: #333;
    }

    .scaffold-info-desc{
        color: #999;
        margin-top: 10px;
        font-size: 12px;
        line-height: 22px;
        height: 44px;
        font-weight: 400;
    }

    .scaffold-item-action{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 0 0 4px 4px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-around;
        transition: transform .3s ease;
        -ms-transform: translateY(100%);
        transform: translateY(100%);
        z-index: 10;
    }

    .scaffold-item-button{
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        justify-content: center;
        width: 50%;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        font-weight: 700;
        background: #2077ff;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
    }

    .scaffold-item-button:hover{
        text-decoration: none;
        color: rgba(255,255,255,.8);
    }

    .scaffold-item-button i{
        margin-right:4px;
        font-size: 18px;
    }

</style>

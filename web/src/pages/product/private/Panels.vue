<template>


    <div class="panel">
        <div class="container scaffold-container">


            <div class="area cols-md-6 wow slideInUp" v-for="item of dynamicList">
                <div data-category="backstage" class="scaffold-item-link">

                    <div class="scaffold-item">

                        <template v-for="(img, index) of item.images">
                            <img class="scaffold-thumbnail" v-bind:src="img" v-bind:class="generateImgClass(index, item.images.length)">
                        </template>

                    </div>

                    <div class="scaffold-info">

                        <div class="scaffold-info-title">
                            {{item.name}}
                        </div>

                        <div class="scaffold-info-desc">
                            报废车管家ERP系统是用于报废汽车公司来管理报废流程的后台管理系统，布局方式采用左侧固定，右侧自适应方式，适合大量数据展示和界面操作
                        </div>

                    </div>

                    <div class="scaffold-item-action">

                        <router-link :to="generateUrl(item)" v-bind:class="linkButton"><i class="fa fa fa-eye"></i>详情介绍</router-link>
                        <router-link :to="generateUrl(item)" v-bind:class="linkButton"><i class="fa fa fa-eye"></i>项目地址</router-link>

                    </div>

                </div>
            </div>


        </div>

    </div>

</template>

<script>
    export default {
        name: "Panels",
        props : ["productsList"],
        data (){
            return {
                staticList : this.productsList,
                dynamicList : this.productsList,
                linkButton : "scaffold-item-button"

            }
        },
        methods : {
            generateImgClass :function (index, length) {
                let value = "float-middle";
                switch (length) {
                    case 1:
                        value = "float-middle";
                        break;

                    case 2:
                        if(index == 0){
                            value = "float-up";
                        }else if(index == 1){
                            value = "float-bottom";
                        }
                        break;

                    case 3:
                        if(index == 0){
                            value = "float-left";
                        }else if(index == 1){
                            value = "float-middle";
                        }else if(index == 2){
                            value = "float-right";
                        }
                        break;
                }

                return value;
            },

            generateUrl (item){
                return "/products/details/".concat(item.name);
            },

            changePanel(type){
                if(type === "total"){
                    this.dynamicList = this.staticList;
                    return;
                }
                var newArr = this.staticList.filter(function (currentValue, index, arr) {
                    return currentValue.type === type;
                })
                this.dynamicList = newArr;
            }
        },

        mounted() {
            let vm = this;
            vm.$bus.$on("changeType",(type) => {
                vm.changePanel(type);
            })

            if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
                console.log("new WOW()",new WOW());
                new WOW().init();
            };
        }
    }
</script>

<style scoped>

    .scaffold-container{
        overflow: hidden;
    }

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
        /*align-items: center;*/
        align-items: end;
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
        margin-top: 4px;
        font-size: 16px;
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

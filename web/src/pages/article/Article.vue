<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList" ref="navigation"></navigation>

        </header>

        <main>

            <div class="container" style="margin-top:25px;">

                <div class="area cols-9">

                    <div class="article-container">

                        <panel></panel>

                        <comment></comment>

                    </div>

                </div>

                <div class="area cols-3">

                    <user-panel></user-panel>

                    <topics></topics>

                </div>

            </div>


        </main>

        <footer>

            <!--            <foot></foot>-->

        </footer>

    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");

    const topics = () => import("../community/private/Topic.vue");
    const panel  = () => import("./private/Panel.vue");
    const userPanel  = () => import("./private/User.vue");
    const comment = () => import("./private/Comment.vue");


    export default {
        components:{navigation,panel,topics,userPanel,comment},
        data (){
            return {
                navigationList : [
                    {
                        name : "首页",
                        href : "/"
                    },
                    {
                        name : "产品与服务",
                        href : "/products",
                    },
                    {
                        name : "开发文档",
                        href : "/guide",
                        active : "nav-current"
                    },
                    {
                        name : "联系我们",
                        href : "/contact",
                    },
                    {
                        name : "开发平台",
                        href : "http://erp.bfcgj.com/login.html",
                        target : "_blank"
                    }
                ],
                barList : [],
                author : ""
            }
        },

        methods : {
            login(){
                this.$refs["navigation"].login();
            },
            getTimeDif (timer){
                var date = new Date(timer);
                var newDate = new Date();
                var str = '';

                var dif = newDate.getTime() - date.getTime();
                //计算出相差天数
                var days=Math.floor(dif/(24*3600*1000));

                //计算出小时数
                var leave1=dif%(24*3600*1000); //计算天数后剩余的毫秒数
                var hours=Math.floor(leave1/(3600*1000));
                //计算相差分钟数
                var leave2=leave1%(3600*1000); //计算小时数后剩余的毫秒数
                var minutes=Math.floor(leave2/(60*1000));
                //计算相差秒数
                var leave3=leave2%(60*1000); //计算分钟数后剩余的毫秒数
                var seconds=Math.round(leave3/1000);
                if(seconds == 0 && minutes == 0 && hours == 0 && days == 0){
                    str = '刚刚';
                }else if(minutes == 0 && hours == 0 && days == 0){
                    str = seconds + '秒前';
                }else if(hours == 0 && days == 0){
                    str = minutes + '分钟前';
                }else if(days == 0){
                    str = hours + '小时前';
                }else if(days > 0){
                    str = days + '天前';
                }

                return str;
            },
            getHash (){
                console.log("window",window.location.pathname);
                let path = window.location.pathname.split("/");
                let postId = path.pop();
                return postId;
            },
            initializeUserConfig (){



            },

            setUserConfig (){


            },

            getUserConfig(){


            },

            getUserLogStatus (){
                this.$axios({
                    method : "post",
                    url : "verifyToken"
                }).then(value =>{
                    console.log("value ====-====",value);
                    this.$store.commit("changeLogStatus",value.data.logged);
                }).catch(err => {
                    console.log(err);
                })
            },

        },

        created() {
            this.getUserLogStatus();
        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";

    @import "/lib/editor.md/css/editormd.css";

    .article-container{
        background-color: #fff;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.15);
    }





</style>

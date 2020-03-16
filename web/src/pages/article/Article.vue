<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <div class="container" style="margin-top:25px;">

                <div class="area cols-9">

                    <panel></panel>


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


    export default {
        components:{navigation,panel,topics,userPanel},
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




</style>

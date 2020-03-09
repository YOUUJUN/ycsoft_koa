<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <div class="container">

                <div class="area cols-9">

                    <hot-topic></hot-topic>

                    <panel></panel>

                </div>

                <div class="area cols-3">

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

    const hotTopic = () => import("./private/Hot.vue");
    const panel = () => import("./private/Panel.vue");
    const topics = () => import("./private/Topic.vue");

    export default {
        components:{navigation,hotTopic,panel,topics},
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
                barList : []
            }
        },

        methods : {
            initializeUserConfig (){



            },

            setUserConfig (){


            },

            getUserConfig(){


            }
        },

        created() {
            this.setUserConfig();
        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";




</style>

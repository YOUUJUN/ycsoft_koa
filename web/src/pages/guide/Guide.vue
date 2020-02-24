<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>
            <search-title></search-title>

            <guid-body v-bind:barlist="barList"></guid-body>
        </main>

        <footer>

<!--            <foot></foot>-->

        </footer>
    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    const searchTitle = () => import("./private/Title.vue");
    const guidBody = () => import("./private/Layout.vue");
    const foot = () => import("../../components/Footer.vue");

    export default {
        components : {navigation,searchTitle,guidBody,foot},
        data() {
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
            };
        },
        methods : {
            getDocNavigation (){
                this.$axios({
                    url : "/getDocNavigation",
                    method: 'POST'
                }).then(msg => {
                    this.barList = msg.data;
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        created() {
            this.getDocNavigation();
        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";

    body{
        background-color: #fff;
    }

    header{
        position: sticky;
        top: 0;
        z-index: 50;
    }

</style>

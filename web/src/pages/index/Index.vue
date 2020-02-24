<template>

    <div id="app">

        <header>
            <navigation v-bind:list="navigationList"></navigation>
        </header>

        <main>

            <banner></banner>

            <introduce></introduce>

        </main>

        <footer>

            <foot></foot>

        </footer>


    </div>

</template>

<script>
    const navigation = () => import("../../components/Navigation.vue");
    const banner = () => import("./private/Banner.vue");
    const introduce = () => import("./private/Introduce.vue");
    const foot = () => import("../../components/Footer.vue");
    export default {
        components : {navigation,banner,foot,introduce},
        data () {
            return {
                navigationList : [
                    {
                        name : "首页",
                        href : "/",
                        active : "nav-current"
                    },
                    {
                        name : "产品与服务",
                        href : "/products"
                    },
                    {
                        name : "开发文档",
                        href : "/guide"
                    },
                    {
                        name : "联系我们",
                        href : "/contact"
                    },
                    {
                        name : "开发平台",
                        href : "http://erp.bfcgj.com/login.html",
                        target : "_blank"
                    }
                ]
            };
        },
        created () {
            console.log('component created')
        }
    }


</script>

<style scoped>

    @import "../../assets/css/youjun_base.css";
    @import "../../assets/css/global.css";
    @import "~font-awesome\css\font-awesome.min.css";

</style>
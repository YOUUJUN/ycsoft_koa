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

            <back-top></back-top>

        </footer>

    </div>

</template>

<script>
    const navigation = () => import("../../components/Navigation.vue");
    const banner = () => import("./private/Banner.vue");
    const introduce = () => import("./private/Introduce.vue");
    const foot = () => import("../../components/Footer.vue");

    const backTop = () => import('../../components/BackTop.vue');

    export default {
        components : {navigation,banner,foot,introduce,backTop},
        data () {
            return {
                navigationList : this.$store.state.navigationList,
            };
        },
        methods : {


        },
        created () {
            this.$store.dispatch("getUserLogStatus");
        },
        mounted() {

        }
    }


</script>

<style>
</style>

<style scoped>

    @import "../../assets/css/youjun_base.css";
    @import "../../assets/css/global.css";
    @import "~font-awesome/css/font-awesome.min.css";

</style>

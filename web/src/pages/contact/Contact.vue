<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>
            <banner></banner>
            <panel></panel>
            <slogan></slogan>
        </main>

        <footer>

            <foot></foot>

        </footer>
    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    const banner = () => import("./private/Banner.vue");
    const panel = () => import("./private/Panels.vue");
    const slogan = () => import("./private/Slogan.vue");
    const foot = () => import("../../components/Footer.vue");

    export default {
        components : {navigation,banner,panel,slogan,foot},
        data() {
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
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "../../assets/css/global.css";
    @import "~font-awesome/css/font-awesome.min.css";

    main{
        background-color: #fff;
    }

</style>

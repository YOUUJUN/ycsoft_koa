<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <router-view></router-view>


<!--            <banner></banner>-->

<!--            <crumbs v-bind:list="groupByType()"></crumbs>-->

<!--            <panels></panels>-->



        </main>

        <footer>

            <foot></foot>

        </footer>

    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    const banner = () => import("./private/Banner.vue");
    const crumbs = () => import("./private/Crumbs.vue");
    const panels = () => import("./private/Panels.vue");
    const foot = () => import("../../components/Footer.vue");

    const checker = () => import("../../components/checkBox.vue");
    export default {
        components : {navigation,banner,crumbs,panels,foot},
        data() {
            return {
                navigationList: this.$store.state.navigationList,
            }
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
    @import "~font-awesome\css\font-awesome.min.css";

</style>

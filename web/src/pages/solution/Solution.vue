<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <banner></banner>

            <tabs></tabs>

        </main>

        <footer>

            <foot></foot>


        </footer>

    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    const foot = () => import("../../components/Footer.vue");

    const banner = () => import('./private/Banner');
    const tabs = () => import('./private/Tabs');

    export default {
        components : {navigation, foot, banner, tabs},
        data() {

            return {
                navigationList : this.$store.state.navigationList,

            }

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
    @import "~font-awesome/css/font-awesome.min.css";

</style>

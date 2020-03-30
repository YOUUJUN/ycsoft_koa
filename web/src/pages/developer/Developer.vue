<template>
    <div id="app">

        <header>



        </header>

        <main>


        </main>

        <footer>


        </footer>

    </div>
</template>
<script>
    export default {
        data() {

            return {

            }

        },
        methods : {

        },

        created () {
            this.$store.commit("getUserLogStatus");
        },

        mounted() {
            this.$store.commit("upDateNavigationIndex",this.$common.getHrefHead());
        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";

</style>

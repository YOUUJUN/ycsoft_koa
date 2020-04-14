<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>


        </main>

        <footer>


        </footer>

    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    export default {
        components : {navigation},
        data() {

            return {
                navigationList : this.$store.state.navigationList,
            }

        },
        methods : {
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
            }

        },

        created () {
            this.getUserLogStatus();
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

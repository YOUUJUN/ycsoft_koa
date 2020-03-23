<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <div class="container" style="margin-top:25px;">

                <div class="area cols-9">

                    <panel v-bind:authorInfo = "authorInfo"></panel>

                    <tabs></tabs>

                </div>

                <div class="area cols-3">

                    <user v-bind:authorInfo = "authorInfo"></user>


                </div>

            </div>


        </main>

        <footer>


        </footer>

    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    const panel = () => import("./private/Panel.vue");
    const user = () => import("./private/User.vue");
    const tabs = () => import("./private/Tabs.vue");

    export default {
        components : {navigation,panel,user,tabs},
        data() {
            return {
                navigationList : this.$store.state.navigationList,
                authorInfo : {}
            };
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
            },

            getAuthorInfo (){
                this.$axios({
                    method : "post",
                    url : "/personal/getAuthorinfo",
                    data : {
                        userId : this.$common.getHash()
                    }
                }).then(value =>{
                    console.log("value ====-====",value);
                    this.authorInfo = value.data.data;
                }).catch(err => {
                    console.log(err);
                })
            }
        },

        computed : {

        },

        watch : {

        },

        created (){
            this.getUserLogStatus();
            this.getAuthorInfo();
        },

        mounted() {
            console.log("logged",this.$store.state);
            this.$store.commit("upDateNavigationIndex",this.$common.getHrefHead());
        }
    };
</script>

<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";

</style>


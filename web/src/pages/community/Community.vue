<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <div class="container" style="margin-top:25px;">

                <div class="area cols-9">

                    <hot-topic></hot-topic>

                    <panel v-bind:forTopics="false"></panel>


                </div>

                <div class="area cols-3">

                    <user-panel></user-panel>

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
    const userPanel = () => import("./private/User.vue");

    export default {
        components:{navigation,hotTopic,panel,topics,userPanel},
        data (){
            return {
                navigationList : this.$store.state.navigationList,
                barList : []
            }
        },

        methods : {
            initializeUserConfig (){



            },

            setUserConfig (){


            },

            getUserConfig(){


            },

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

        created() {
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

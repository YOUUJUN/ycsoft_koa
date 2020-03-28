<template>
    <div id="app">
        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <div class="container" style="margin-top:25px;">

                {{getLogStatus}}
                <div class="area cols-9">

                    <panel v-bind:authorInfo = "authorInfo" v-bind:owner="owner" @addFollow="addFollow"></panel>

                    <tabs-panel v-bind:authorInfo = "authorInfo" v-bind:owner="owner" @addFollow="addFollow" ref="tabs"></tabs-panel>

                </div>

                <div class="area cols-3">

                    <user v-bind:authorInfo = "authorInfo" v-bind:owner="owner"></user>

                    <topics></topics>

                </div>

            </div>


        </main>

        <footer>


        </footer>

    </div>
</template>
<script>
    const navigation = () => import("../../components/Navigation.vue");
    const topics = () => import("../community/private/Topic.vue");
    const panel = () => import("./private/Panel.vue");
    const user = () => import("./private/User.vue");
    const tabsPanel = () => import("./private/Tabs.vue");

    export default {
        components : {navigation,tabsPanel,panel,user,topics},
        data() {
            return {
                navigationList : this.$store.state.navigationList,
                authorInfo : {},
                owner : false
            };
        },

        methods : {
            getUserLogStatus (){
                this.$axios({
                    method : "post",
                    url : "verifyToken"
                }).then(value =>{
                    console.log("value.data.logged",value.data.logged);
                    this.$store.commit("changeLogStatus",value.data.logged);
                }).catch(err => {
                    console.error(err);
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
                    this.authorInfo = value.data.data;
                    console.log("authorInfo",this.authorInfo);
                }).catch(err => {
                    console.error(err);
                })
            },

            addFollow(item){
                this.$axios({
                    method : "post",
                    url : "/personal/addFollow",
                    data : {
                        userId : item.id
                    }
                }).then(res => {
                    alert(res.data.data);
                    if(res.data.status == '1'){
                        item.ifFollowed = true;
                    }else if(res.data.status == '2'){
                        item.ifFollowed = false;
                    }
                }).catch(err =>{
                    console.error(err);
                })
            },

            verifyOwner(){
                if(this.logged){
                    this.$axios({
                        method : "post",
                        url : "/personal/verifyOwner",
                        data : {
                            userId : this.$common.getHash()
                        }
                    }).then(res =>{
                        this.owner = res.data.data.ifOwner;
                    }).catch(err =>{
                        console.error(err);
                    })
                }
            }

        },

        computed:{

            getLogStatus (){
                this.logged = this.$store.state.logged;
                let result = this.verifyOwner();
            }

        },

        watch : {

        },

        beforeCreate(){
            console.log("父组件beforeCreate");
        },
        created(){
            console.log("父组件created");
            this.getUserLogStatus();
            console.log("logged,父组件", this.$store.state.logged);
            this.getAuthorInfo();
            this.$store.commit("upDateNavigationIndex",this.$common.getHrefHead());
        },
        beforeMount() {
            console.log("父组件beforeMount");
        },
        mounted() {
            console.log("父组件mounted");
        }
    };
</script>

<style>

    @import "../../assets/css/youjun_base.css";
    @import "~font-awesome\css\font-awesome.min.css";

</style>


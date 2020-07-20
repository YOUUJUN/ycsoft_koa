<template>
    <div id="app">

        <header>

            <navigation v-bind:list="navigationList"></navigation>

        </header>

        <main>

            <div class="container" style="margin-top:25px;">

                <div class="area cols-9">

                    <div class="topic-detail-title">
                        <img src="/images/topic-mid-img.png">
                        <div class="topic-title-container">
                            <h2>{{topicInfo.name}}</h2>
                            <p class="topic-detail-follow">
                                <span class="focus-num">{{topicInfo.num}}</span>人关注该话题
                                <br>

                                <a href="javascript:void(0);" class="btn active" @click="addFocus(topicInfo)" v-if="topicInfo.ifFocused">已关注</a>
                                <a href="javascript:void(0);" class="btn" @click="addFocus(topicInfo)" v-else>关注</a>
                            </p>
                        </div>
                    </div>

                    <panel v-bind:forTopics="true"></panel>

                </div>

                <div class="area cols-3">

                    <user-panel></user-panel>

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
    const panel = () => import("../community/private/Panel.vue");
    const topics = () => import("../community/private/Topic.vue");
    const userPanel = () => import("../community/private/User.vue");

    export default {
        components : {navigation,panel,topics,userPanel},
        data() {
            return {
                topicInfo : {},
                navigationList : this.$store.state.navigationList,
            }
        },

        methods : {

            addFocus(item){
                console.log("item =>",item);
                this.$axios({
                    method : "post",
                    url : "/community/addFocus",
                    data : {
                        topicName : item.name
                    }
                }).then(res => {
                    alert(res.data.data);
                    if(res.data.status == '1'){
                        this.topicInfo.num += 1;
                        item.ifFocused = true;
                    }else if(res.data.status == '2'){
                        item.ifFocused = false;
                        this.topicInfo.num -= 1;
                    }
                }).catch(err =>{
                    console.error(err);
                })
            },

            getTopicInfo (){

                this.$axios({
                    method : "post",
                    url : "/community/getTopicInfo",
                    data : {
                        topicName : this.$common.getHash()
                    }
                }).then(res => {
                    this.topicInfo = res.data.data;
                }).catch(err =>{
                    console.error(err);
                })

            }

        },

        created () {
            this.$store.dispatch("getUserLogStatus");
            this.getTopicInfo();
        },

        mounted() {

        }
    };
</script>
<style>

    @import "../../assets/css/youjun_base.css";
    @import "../../assets/css/component.css";
    @import "~font-awesome\css\font-awesome.min.css";


    /*----------话题分类显示----------*/

    .topic-detail-title{
        position:relative;
        background-color: #fff;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,.15);
        height:85px;
        margin-bottom:25px;
    }

    .topic-detail-title img{
        position:absolute;
        top: 16px;
        left: 20px;
        width:50px;
        height:50px;
    }

    .topic-title-container{
        position:relative;
        height:100%;
        padding-left:90px;
        padding-top: 20px;
        overflow: hidden;
    }

    .topic-title-container h2{
        display: inline;
        font-size: 20px;
        margin:0;
    }

    .topic-detail-follow{
        position: absolute;
        text-align: right;
        right: 18px;
        top: 20px;
    }

    .topic-detail-follow a{
        margin-top:4px;
    }

</style>
